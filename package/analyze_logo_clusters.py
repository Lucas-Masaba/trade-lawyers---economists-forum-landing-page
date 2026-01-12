from PIL import Image
import numpy as np

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

# Filter out white/near-white pixels
non_white_pixels = []
for pixel in pixels_reshaped:
    if not (pixel[0] > 240 and pixel[1] > 240 and pixel[2] > 240):
        non_white_pixels.append(pixel)

non_white_pixels = np.array(non_white_pixels)

# Group similar colors into buckets
def rgb_to_hex(r, g, b):
    return '#{:02x}{:02x}{:02x}'.format(int(r), int(g), int(b))

# Calculate average colors in ranges
dark_blue_pixels = []
medium_gray_pixels = []
light_pixels = []
other_pixels = []

for pixel in non_white_pixels:
    r, g, b = pixel
    # Dark blue range (very dark colors)
    if r < 50 and g < 80 and b < 100:
        dark_blue_pixels.append(pixel)
    # Medium gray/blue range
    elif 80 < r < 130 and 90 < g < 140 and 100 < b < 150:
        medium_gray_pixels.append(pixel)
    # Light colors but not white
    elif r > 200 or g > 200 or b > 200:
        light_pixels.append(pixel)
    else:
        other_pixels.append(pixel)

print('Logo Color Analysis')
print('=' * 70)

if dark_blue_pixels:
    dark_avg = np.mean(dark_blue_pixels, axis=0)
    print(f'\n1. DARK BLUE (Primary Dark Color)')
    print(f'   Average: {rgb_to_hex(*dark_avg)}')
    print(f'   RGB: ({int(dark_avg[0])}, {int(dark_avg[1])}, {int(dark_avg[2])})')
    print(f'   Pixels: {len(dark_blue_pixels)} ({len(dark_blue_pixels)/len(non_white_pixels)*100:.1f}%)')

if medium_gray_pixels:
    medium_avg = np.mean(medium_gray_pixels, axis=0)
    print(f'\n2. MEDIUM GRAY-BLUE (Secondary Color)')
    print(f'   Average: {rgb_to_hex(*medium_avg)}')
    print(f'   RGB: ({int(medium_avg[0])}, {int(medium_avg[1])}, {int(medium_avg[2])})')
    print(f'   Pixels: {len(medium_gray_pixels)} ({len(medium_gray_pixels)/len(non_white_pixels)*100:.1f}%)')

if light_pixels:
    light_avg = np.mean(light_pixels, axis=0)
    print(f'\n3. LIGHT COLOR (Accent/Light)')
    print(f'   Average: {rgb_to_hex(*light_avg)}')
    print(f'   RGB: ({int(light_avg[0])}, {int(light_avg[1])}, {int(light_avg[2])})')
    print(f'   Pixels: {len(light_pixels)} ({len(light_pixels)/len(non_white_pixels)*100:.1f}%)')

if other_pixels:
    other_avg = np.mean(other_pixels, axis=0)
    print(f'\n4. OTHER COLORS')
    print(f'   Average: {rgb_to_hex(*other_avg)}')
    print(f'   RGB: ({int(other_avg[0])}, {int(other_avg[1])}, {int(other_avg[2])})')
    print(f'   Pixels: {len(other_pixels)} ({len(other_pixels)/len(non_white_pixels)*100:.1f}%)')

# Find the most dominant single color
unique_colors = {}
for pixel in non_white_pixels:
    color = tuple(pixel)
    if color in unique_colors:
        unique_colors[color] += 1
    else:
        unique_colors[color] = 1

sorted_colors = sorted(unique_colors.items(), key=lambda x: x[1], reverse=True)

print('\n' + '=' * 70)
print('Top 5 Most Used Individual Colors:')
for i, (color, count) in enumerate(sorted_colors[:5]):
    hex_color = '#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2])
    percentage = (count / len(non_white_pixels)) * 100
    print(f'{i+1}. {hex_color} - RGB{color} ({percentage:.2f}%)')

print('\n' + '=' * 70)
print(f'Total non-white pixels analyzed: {len(non_white_pixels)}')
