from PIL import Image
import numpy as np
from collections import Counter

# Load the logo
img = Image.open('public/images/trade_logo.png')

print('=' * 70)
print('COMPREHENSIVE LOGO COLOR ANALYSIS')
print('=' * 70)

# Check image mode and convert if needed
print(f'\nImage Mode: {img.mode}')
print(f'Image Size: {img.size[0]}x{img.size[1]} pixels')

# Convert to RGBA to handle transparency properly
if img.mode != 'RGBA':
    img = img.convert('RGBA')

# Get image data
pixels = np.array(img)
h, w, c = pixels.shape

# Separate RGB and Alpha channels
rgb_pixels = pixels[:, :, :3]
alpha_channel = pixels[:, :, 3] if c == 4 else np.ones((h, w)) * 255

# Get non-transparent pixels (alpha > 128)
non_transparent_mask = alpha_channel > 128
non_transparent_pixels = rgb_pixels[non_transparent_mask]

print(f'\nTotal pixels: {h * w}')
print(f'Non-transparent pixels: {len(non_transparent_pixels)}')
print(f'Transparent/white background pixels: {h * w - len(non_transparent_pixels)}')

# Count unique colors (excluding near-transparent)
unique_colors = {}
for i in range(len(non_transparent_pixels)):
    color = tuple(non_transparent_pixels[i])
    # Skip near-white colors (likely background bleed)
    if not (color[0] > 240 and color[1] > 240 and color[2] > 240):
        if color in unique_colors:
            unique_colors[color] += 1
        else:
            unique_colors[color] = 1

# Sort by frequency
sorted_colors = sorted(unique_colors.items(), key=lambda x: x[1], reverse=True)

print('\n' + '=' * 70)
print('TOP 20 MOST FREQUENT COLORS IN LOGO:')
print('=' * 70)

for i, (color, count) in enumerate(sorted_colors[:20]):
    hex_color = '#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2])
    percentage = (count / len(non_transparent_pixels)) * 100
    print(f'{i+1:2d}. {hex_color.upper()} | RGB({color[0]:3d}, {color[1]:3d}, {color[2]:3d}) | {count:5d} pixels ({percentage:5.2f}%)')

# Analyze color groupings by brightness and hue
print('\n' + '=' * 70)
print('COLOR GROUPING ANALYSIS:')
print('=' * 70)

very_dark = []  # Very dark colors (likely primary brand color)
dark = []       # Dark colors
medium = []     # Medium colors
light = []      # Light colors

for pixel in non_transparent_pixels:
    r, g, b = pixel
    brightness = (r + g + b) / 3
    
    # Skip near-white
    if r > 240 and g > 240 and b > 240:
        continue
    
    if brightness < 50:
        very_dark.append(pixel)
    elif brightness < 100:
        dark.append(pixel)
    elif brightness < 180:
        medium.append(pixel)
    else:
        light.append(pixel)

def analyze_group(pixels, name):
    if len(pixels) == 0:
        return
    
    pixels_array = np.array(pixels)
    avg = np.mean(pixels_array, axis=0)
    median = np.median(pixels_array, axis=0)
    
    # Find most common color in group
    color_counts = Counter([tuple(p) for p in pixels])
    most_common = color_counts.most_common(1)[0]
    
    print(f'\n{name}:')
    print(f'  Count: {len(pixels)} pixels ({len(pixels)/len(non_transparent_pixels)*100:.1f}%)')
    print(f'  Average: #{int(avg[0]):02x}{int(avg[1]):02x}{int(avg[2]):02x} | RGB({int(avg[0])}, {int(avg[1])}, {int(avg[2])})')
    print(f'  Median:  #{int(median[0]):02x}{int(median[1]):02x}{int(median[2]):02x} | RGB({int(median[0])}, {int(median[1])}, {int(median[2])})')
    print(f'  Most common: #{most_common[0][0]:02x}{most_common[0][1]:02x}{most_common[0][2]:02x} | RGB{most_common[0]} ({most_common[1]} pixels)')

analyze_group(very_dark, 'VERY DARK (Primary Brand Color)')
analyze_group(dark, 'DARK')
analyze_group(medium, 'MEDIUM') 
analyze_group(light, 'LIGHT')

# K-means clustering to find dominant colors
print('\n' + '=' * 70)
print('RECOMMENDED COLOR PALETTE (CONSOLIDATED):')
print('=' * 70)

# Simple manual clustering based on analysis
filtered_pixels = [p for p in non_transparent_pixels if not (p[0] > 240 and p[1] > 240 and p[2] > 240)]

if filtered_pixels:
    all_pixels = np.array(filtered_pixels)
    
    # Define color ranges and find averages
    primary_dark = all_pixels[(all_pixels[:, 0] < 50) & (all_pixels[:, 1] < 80) & (all_pixels[:, 2] < 100)]
    secondary_medium = all_pixels[(all_pixels[:, 0] > 60) & (all_pixels[:, 0] < 130) & 
                                   (all_pixels[:, 1] > 90) & (all_pixels[:, 1] < 140)]
    accent_blue = all_pixels[(all_pixels[:, 2] > 120) & (all_pixels[:, 2] < 180) & 
                              (all_pixels[:, 0] > 50) & (all_pixels[:, 0] < 120)]
    light_accent = all_pixels[(all_pixels[:, 0] > 180) & (all_pixels[:, 1] > 180) & (all_pixels[:, 2] > 180)]
    
    palette = []
    
    if len(primary_dark) > 0:
        avg = np.mean(primary_dark, axis=0)
        palette.append(('Primary Dark Blue', avg, len(primary_dark)))
    
    if len(secondary_medium) > 0:
        avg = np.mean(secondary_medium, axis=0)
        palette.append(('Secondary Gray-Blue', avg, len(secondary_medium)))
    
    if len(accent_blue) > 0:
        avg = np.mean(accent_blue, axis=0)
        palette.append(('Accent Blue', avg, len(accent_blue)))
    
    if len(light_accent) > 0:
        avg = np.mean(light_accent, axis=0)
        palette.append(('Light Accent', avg, len(light_accent)))
    
    for i, (name, color, count) in enumerate(palette, 1):
        hex_color = '#{:02x}{:02x}{:02x}'.format(int(color[0]), int(color[1]), int(color[2]))
        pct = (count / len(all_pixels)) * 100
        print(f'{i}. {name:25s} {hex_color.upper()} | RGB({int(color[0]):3d}, {int(color[1]):3d}, {int(color[2]):3d}) | {pct:5.1f}%')

print('\n' + '=' * 70)
