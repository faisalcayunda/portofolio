#!/usr/bin/env python3
"""High-quality background removal for the solid-blue studio ID photo.

Improvements over a plain chroma key:
  - distance-based SOFT matte from the sampled background colour (anti-aliased
    edges instead of a hard threshold + blur halo)
  - hole fill + speck removal (drops the bg sparkle/watermark, fills any suit gap)
  - edge EROSION to cut the contaminated 1-2px fringe ring
  - colour DECONTAMINATION (un-multiply the blue out of semi-transparent edge
    pixels) so there is no blue/white halo left around the silhouette
  - processed at full resolution then LANCZOS-downscaled (supersampling AA)

Outputs public/headshot-cutout.webp (the file the site uses).
"""
import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageOps

SRC = "foto formal.png"
OUT = "public/headshot-cutout.webp"
TARGET_W = 1000          # output width; aspect kept ~0.81 (matches current framing)
ASPECT = 0.809

img = Image.open(SRC).convert("RGB")
a = np.asarray(img).astype(np.float32)
H, W = a.shape[:2]
R, G, B = a[..., 0], a[..., 1], a[..., 2]

# --- sample background colour from regions that are certainly background ---
patches = np.concatenate([
    a[0:80, 0:80].reshape(-1, 3),
    a[0:80, W - 80:W].reshape(-1, 3),
    a[H // 2 - 40:H // 2 + 40, 0:50].reshape(-1, 3),
    a[H // 2 - 40:H // 2 + 40, W - 50:W].reshape(-1, 3),
])
bg = np.median(patches, axis=0)
dist = np.sqrt(((a - bg) ** 2).sum(axis=2))

# bg noise → ramp thresholds
bg_noise = np.sqrt(((patches - bg) ** 2).sum(axis=1))
lo = float(np.percentile(bg_noise, 99)) + 10.0
hi = lo + 48.0
print(f"bg={bg.round(1).tolist()} lo={lo:.1f} hi={hi:.1f} "
      f"dist p50={np.percentile(dist,50):.0f} p95={np.percentile(dist,95):.0f}")

alpha = np.clip((dist - lo) / (hi - lo), 0.0, 1.0)

# --- fill interior holes (any suit/face region wrongly keyed) ---
core = Image.fromarray(((alpha > 0.5) * 255).astype("uint8"))
inv = ImageOps.invert(core)                      # background = 255
ImageDraw.floodfill(inv, (0, 0), 128)            # mark outer background
ImageDraw.floodfill(inv, (W - 1, 0), 128)
holes = np.asarray(inv) == 255                   # interior bg not reached = holes
alpha[holes] = 1.0

# --- drop specks not connected to the subject (bg sparkle/watermark) ---
core = Image.fromarray(((alpha > 0.5) * 255).astype("uint8"))
ImageDraw.floodfill(core, (W // 2, int(H * 0.62)), 200, thresh=10)
keep = np.asarray(core) == 200
specks = (alpha > 0.5) & (~keep)
alpha[specks] = 0.0

# --- erode 1px then feather: removes the contaminated fringe ring + AA ---
am = Image.fromarray((alpha * 255).astype("uint8"))
am = am.filter(ImageFilter.MinFilter(3))
am = am.filter(ImageFilter.GaussianBlur(1.1))
alpha = np.asarray(am).astype(np.float32) / 255.0

# --- colour decontamination: F = (obs - (1-a)*bg) / a  on edge pixels ---
eps = 1e-3
af = alpha[..., None]
F = (a - (1.0 - af) * bg) / np.maximum(af, eps)
edge = (alpha > 0.02) & (alpha < 0.985)
out_rgb = a.copy()
out_rgb[edge] = np.clip(F[edge], 0, 255)

rgba = np.dstack([out_rgb, alpha * 255.0]).astype("uint8")
cut = Image.fromarray(rgba, "RGBA")

# --- crop to a head-and-upper-chest portrait centred on the subject ---
ys, xs = np.where(alpha > 0.4)
top = ys.min()
# shoulder span measured a little below the head
chest_y = min(H - 1, top + int((H - top) * 0.55))
row = np.where(alpha[chest_y] > 0.4)[0]
if row.size:
    left_s, right_s = row.min(), row.max()
else:
    left_s, right_s = xs.min(), xs.max()
cx = (left_s + right_s) // 2
body_w = right_s - left_s
crop_w = int(body_w * 0.98)
crop_h = int(crop_w / ASPECT)
crop_top = max(0, top - int(crop_h * 0.07))
crop_left = max(0, cx - crop_w // 2)
crop_right = min(W, crop_left + crop_w)
crop_bottom = min(H, crop_top + crop_h)
cut = cut.crop((crop_left, crop_top, crop_right, crop_bottom))
print(f"crop=({crop_left},{crop_top},{crop_right},{crop_bottom}) -> {cut.size}")

# --- downscale (supersampling anti-aliases the matte) ---
tw = TARGET_W
th = int(tw / cut.size[0] * cut.size[1])
cut = cut.resize((tw, th), Image.LANCZOS)
cut.save(OUT, "WEBP", quality=90, method=6)
print(f"saved {OUT} {cut.size}")
