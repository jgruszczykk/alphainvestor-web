from PIL import Image
import numpy as np

def invert_colors(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)

    # Split channels
    rgb = data[:, :, :3]
    alpha = data[:, :, 3]

    # Only invert visible pixels (alpha > 0)
    mask = alpha > 0
    rgb[mask] = 255 - rgb[mask]

    # Recombine
    data[:, :, :3] = rgb

    Image.fromarray(data).save(output_path)
    print(f"Saved to {output_path}")


# Usage
invert_colors("images/logo-dark-output.png", "images/logo-light-output.png")