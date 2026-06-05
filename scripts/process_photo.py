#!/usr/bin/env python3
"""Background-removal + framing for a solid-blue-background ID photo.
Solid studio-blue background is chroma-keyed (brightness + blue-excess rule that
spares the dark-navy suit), feathered, and despilled. Outputs a transparent
cutout and a circular avatar for the portfolio site."""
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

SRC = "foto formal.png"
img = Image.open(SRC).convert("RGB")
a = np.asarray(img).astype(np.float32)
R, G, B = a[..., 0], a[..., 1], a[..., 2]

# Background = bright AND blue-dominant. Navy suit has B < ~110 so the B>125
# gate excludes it; skin/hair/shirt/tie all fail the blue-excess gate.
blue_excess = B - np.maximum(R, G)
bg = (B > 125) & (blue_excess > 30)
print("raw bg coverage %:", round(float(bg.mean()) * 100, 1))

# Feather the mask edges.
mask = Image.fromarray((bg.astype(np.float32) * 255).astype("uint8"))
mask = mask.filter(ImageFilter.GaussianBlur(2.2))
bgf = np.asarray(mask).astype(np.float32) / 255.0
alpha = np.clip(1.0 - bgf, 0.0, 1.0)

# Despill: on semi-transparent edge pixels where blue spills, pull B down to max(R,G).
edge = (alpha > 0.04) & (alpha < 0.96)
spill = B > np.maximum(R, G)
fix = edge & spill
B2 = B.copy()
B2[fix] = np.maximum(R, G)[fix]

rgba = np.dstack([R, G, B2, alpha * 255.0]).astype("uint8")
cut = Image.fromarray(rgba, "RGBA")
cut.save("foto-cutout.png")
print("saved foto-cutout.png", cut.size)

# Circular avatar centered on the face (upper-center of the frame).
w, h = cut.size
side = min(w, h)
cx = w // 2
cy = int(h * 0.34)
half = int(side * 0.54)
box = (cx - half, cy - half, cx + half, cy + half)
SZ = 900
crop = cut.crop(box).resize((SZ, SZ), Image.LANCZOS)

circle = Image.new("L", (SZ, SZ), 0)
ImageDraw.Draw(circle).ellipse((0, 0, SZ, SZ), fill=255)
circle = circle.filter(ImageFilter.GaussianBlur(1.0))
ca = crop.split()[3]
final_alpha = Image.composite(ca, Image.new("L", (SZ, SZ), 0), circle)
crop.putalpha(final_alpha)
crop.save("foto-circle.png")
print("saved foto-circle.png", crop.size)
