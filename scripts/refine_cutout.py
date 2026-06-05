#!/usr/bin/env python3
"""Defringe an ALREADY-cut-out RGBA portrait (no original needed).

Removes the light/blue halo baked into the existing cutout's edge by:
  1. color extension — grow the solid subject colours outward over the
     semi-transparent halo band, so edge pixels stop being light-coloured
  2. alpha erosion — shave the contaminated outer 1-2px ring
  3. gentle feather — clean anti-aliased edge

Reads & writes public/headshot-cutout.webp (a .bak copy is made first).
"""
import shutil
import numpy as np
from PIL import Image, ImageFilter

PATH = "public/headshot-cutout.webp"
shutil.copyfile(PATH, "/tmp/pdfgen/headshot-cutout.bak.webp")

im = Image.open(PATH).convert("RGBA")
arr = np.asarray(im).astype(np.float32)
rgb = arr[..., :3].copy()
alpha = arr[..., 3] / 255.0
H, W = alpha.shape
print(f"in {im.size}  edge px (0<a<1): {int(((alpha>0.02)&(alpha<0.98)).sum())}")

# --- 1. color extension: bleed solid colours into the halo band ---
known = alpha > 0.85
color = rgb * known[..., None]
SHIFTS = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]
for _ in range(10):
    unk = ~known
    if not unk.any():
        break
    ssum = np.zeros_like(color)
    cnt = np.zeros((H, W), np.float32)
    for dy, dx in SHIFTS:
        rc = np.roll(np.roll(color, dy, 0), dx, 1)
        rk = np.roll(np.roll(known, dy, 0), dx, 1).astype(np.float32)
        ssum += rc * rk[..., None]
        cnt += rk
    fill = unk & (cnt > 0)
    color[fill] = ssum[fill] / cnt[fill][..., None]
    known = known | fill

# --- 2. erode alpha ~2px to cut the contaminated ring, then 3. feather ---
am = Image.fromarray((alpha * 255).astype("uint8"))
am = am.filter(ImageFilter.MinFilter(5))        # erode ~2px
am = am.filter(ImageFilter.GaussianBlur(0.9))   # feather
alpha2 = np.asarray(am).astype(np.float32) / 255.0

# --- 4. remove bright specks sitting in dark surroundings (leftover edge light) ---
# A bright pixel whose neighbourhood is mostly dark suit is a stray; the white
# shirt is spared because its neighbourhood is also bright.
def blurL(x, r):  # box blur via 'L' (uint8) mode, which PIL supports
    return np.asarray(Image.fromarray(np.clip(x, 0, 255).astype("uint8"), "L")
                      .filter(ImageFilter.BoxBlur(r)), dtype=np.float32)

lum = 0.299 * color[..., 0] + 0.587 * color[..., 1] + 0.114 * color[..., 2]
opaque = alpha2 > 0.4
opw = blurL(opaque.astype(np.float32) * 255, 22) / 255.0
local_lum = blurL(lum * opaque, 22) / np.maximum(opw, 1e-3)
darkb = opaque & (lum < 95)
darkw = blurL(darkb.astype(np.float32) * 255, 22) / 255.0
darkcol = np.dstack([blurL(color[..., c] * darkb, 22) for c in range(3)]) / np.maximum(darkw, 1e-3)[..., None]
# light pixel sitting in dark surroundings = stray (shirt spared: its surroundings are bright)
# safe global pass: outright-bright pixels in dark surroundings (won't touch suit)
mark = (lum > 130) & (local_lum < 85) & (darkw > 0.05)
op_speck = mark & opaque
edge_speck = mark & (alpha2 > 0.02) & (~opaque)
print(f"global specks recolored: {int(op_speck.sum())}  cut: {int(edge_speck.sum())}")
for c in range(3):
    color[..., c][op_speck] = darkcol[..., c][op_speck]
alpha2[edge_speck] = 0.0

# surgical removal of the known blue-spill spot at the lower-left suit edge.
# Bounded to a small box that is ENTIRELY navy suit (no shirt/skin/face nearby),
# so an aggressive relative threshold here is safe.
bx0, by0, bx1, by1 = 124, 878, 162, 920
near = color[by0 - 18:by1 + 18, bx0 - 18:bx1 + 18]
na = alpha2[by0 - 18:by1 + 18, bx0 - 18:bx1 + 18]
nl = 0.299 * near[..., 0] + 0.587 * near[..., 1] + 0.114 * near[..., 2]
sm = (na > 0.6) & (nl < 82)
if sm.sum() > 20:
    suitcol = np.median(near[sm], axis=0)
    suitlum = float(np.median(nl[sm]))
    reg = color[by0:by1, bx0:bx1]
    ra = alpha2[by0:by1, bx0:bx1]
    rl = 0.299 * reg[..., 0] + 0.587 * reg[..., 1] + 0.114 * reg[..., 2]
    bad = (ra > 0.3) & (rl > suitlum + 16)
    for c in range(3):
        reg[..., c][bad] = suitcol[c]
    badedge = (ra > 0.02) & (ra <= 0.3) & (rl > suitlum + 16)
    alpha2[by0:by1, bx0:bx1][badedge] = 0.0
    print(f"surgical spot fixed: {int(bad.sum())} recolored, {int(badedge.sum())} cut "
          f"(suit ~{suitlum:.0f})")

out = np.dstack([np.clip(color, 0, 255), alpha2 * 255.0]).astype("uint8")
Image.fromarray(out, "RGBA").save(PATH, "WEBP", quality=92, method=6)
print(f"saved {PATH}  edge px now: {int(((alpha2>0.02)&(alpha2<0.98)).sum())}")
