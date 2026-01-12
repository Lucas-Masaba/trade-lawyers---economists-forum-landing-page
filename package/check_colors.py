from PIL import Image
import numpy as np
from collections import Counter

# Load the logo
img = Image.open('public/images/trade_logo.png')

print('=' * 70)
print('LOGO COLOR VERIFICATION')
print('=' * 70)

# Convert to RGB
if img.mode == 'RGBA':
    background = Image.new('RGB', img.size, (255, 255, 255))
    background.paste(img, mask=img.split()[3])
    img = background
elif img.mode != 'RGB':
    img = img.convert('RGB')

pixels = np.array(img)
h, w, c = pixels.shape
pixels_flat = pixels.reshape(-1, 3)

print(f'\nImage Size: {w}x{h} pixels')
print(f'Total pixels: {len(pixels_flat):,}')

# Filter out white background
non_white = []
for p in pixels_flat:
    if not (p[0] > 240 and p[1] > 240 and p[2] > 240):
        non_white.append(tuple(p))

print(f'Non-white pixels: {len(non_white):,}')

# Count colors
color_counts = Counter(non_white)
sorted_colors = color_counts.most_common(30)

print('\n' + '=' * 70)
print('TOP 30 COLORS:')
print('=' * 70)

for i, (color, count) in enumerate(sorted_colors, 1):
    hex_color = '#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2])
    pct = (count / len(non_white)) * 100
    print(f'{i:2d}. {hex_color.upper()} | RGB({color[0]:3d}, {color[1]:3d}, {color[2]:3d}) | {count:5d} ({pct:5.2f}%)')

# Group analysis
very_dark = [c for c in non_white if sum(c)/3 < 50]
dark = [c for c in non_white if 50 <= sum(c)/3 < 100]
medium = [c for c in non_white if 100 <= sum(c)/3 < 180]
light = [c for c in non_white if 180 <= sum(c)/3 < 240]

print('\n' + '=' * 70)
print('COLOR DISTRIBUTION:')
print('=' * 70)

def avg_color(pixels):
    if not pixels:
        return None
    arr = np.array(pixels, dtype=np.float64)
    avg = np.mean(arr, axis=0)
    return (int(avg[0]), int(avg[1]), int(avg[2]))

groups = [
    ('Very Dark (0-50 brightness)', very_dark),
    ('Dark (50-100 brightness)', dark),
    ('Medium (100-180 brightness)', medium),
    ('Light (180-240 brightness)', light)
]

for name, group in groups:
    if group:
        avg = avg_color(group)
        hex_avg = '#{:02x}{:02x}{:02x}'.format(*avg)
        pct = len(group) / len(non_white) * 100
        print(f'\n{name}:')
        print(f'  Pixels: {len(group):,} ({pct:.1f}%)')
        print(f'  Average: {hex_avg.upper()} | RGB{avg}')

# Recommended palette
print('\n' + '=' * 70)
print('RECOMMENDED COLOR PALETTE:')
print('=' * 70)

# Primary dark blue (most common in very dark range)
primary_colors = [c for c in non_white if c[0] < 30 and c[1] < 60 and c[2] < 75]
if primary_colors:
    primary = avg_color(primary_colors)
    hex_p = '#{:02x}{:02x}{:02x}'.format(*primary)
    print(f'\n1. PRIMARY (Dark Blue):      {hex_p.upper()} | RGB{primary}')
    print(f'   Usage: {len(primary_colors):,} pixels ({len(primary_colors)/len(non_white)*100:.1f}%)')

# Secondary gray-blue
secondary_colors = [c for c in non_white if 95 <= c[0] <= 105 and 105 <= c[1] <= 115 and 115 <= c[2] <= 125]
if secondary_colors:
    secondary = avg_color(secondary_colors)
    hex_s = '#{:02x}{:02x}{:02x}'.format(*secondary)
    print(f'\n2. SECONDARY (Gray-Blue):    {hex_s.upper()} | RGB{secondary}')
    print(f'   Usage: {len(secondary_colors):,} pixels ({len(secondary_colors)/len(non_white)*100:.1f}%)')

# Medium blue accent
accent_colors = [c for c in non_white if 60 <= c[0] <= 90 and 100 <= c[1] <= 140 and 130 <= c[2] <= 160]
if accent_colors:
    accent = avg_color(accent_colors)
    hex_a = '#{:02x}{:02x}{:02x}'.format(*accent)
    print(f'\n3. ACCENT (Medium Blue):     {hex_a.upper()} | RGB{accent}')
    print(f'   Usage: {len(accent_colors):,} pixels ({len(accent_colors)/len(non_white)*100:.1f}%)')

# Light accent
light_colors = [c for c in non_white if c[0] > 200 and c[1] > 200 and c[2] > 200]
if light_colors:
    light_c = avg_color(light_colors)
    hex_l = '#{:02x}{:02x}{:02x}'.format(*light_c)
    print(f'\n4. LIGHT ACCENT:             {hex_l.upper()} | RGB{light_c}')
    print(f'   Usage: {len(light_colors):,} pixels ({len(light_colors)/len(non_white)*100:.1f}%)')

print('\n' + '=' * 70)
