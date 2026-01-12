from PIL import Image
import numpy as np
from collections import Counter

# Load the logo
img = Image.open('public/images/trade_logo.png')

# Convert to RGB if needed
if img.mode == 'RGBA':
    # Create a white background
    background = Image.new('RGB', img.size, (255, 255, 255))
    background.paste(img, mask=img.split()[3] if len(img.split()) == 4 else None)
    img = background
elif img.mode != 'RGB':
    img = img.convert('RGB')

# Get image data
pixels = np.array(img)
h, w, c = pixels.shape

# Reshape to list of RGB values
pixels_reshaped = pixels.reshape(-1, 3)

# Count unique colors
unique_colors = {}
for pixel in pixels_reshaped:
    color = tuple(pixel)
    # Skip white/near-white pixels (background)
    if not (color[0] > 250 and color[1] > 250 and color[2] > 250):
        if color in unique_colors:
            unique_colors[color] += 1
        else:
            unique_colors[color] = 1

# Sort by frequency
sorted_colors = sorted(unique_colors.items(), key=lambda x: x[1], reverse=True)

# Print top 10 colors
print('Top colors in the logo (RGB):')
print('=' * 60)
for i, (color, count) in enumerate(sorted_colors[:10]):
    hex_color = '#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2])
    percentage = (count / len(pixels_reshaped)) * 100
    print(f'{i+1}. RGB{color} → {hex_color} ({percentage:.2f}%)')

print('\n' + '=' * 60)
print('Image dimensions:', img.size)
print('Total pixels:', len(pixels_reshaped))
print('Unique colors (excluding white):', len(unique_colors))
