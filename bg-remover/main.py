from PIL import Image
import numpy as np

def remove_bg(input_path, output_path, threshold=240):
    # Load image and convert to RGBA (adds alpha channel)
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)

    # Split channels
    r, g, b, a = data.T

    # Create mask for "light background"
    bg_mask = (r > threshold) & (g > threshold) & (b > threshold)

    # Set those pixels transparent
    data[..., :-1][bg_mask.T] = (255, 255, 255)  # optional
    data[..., -1][bg_mask.T] = 0  # alpha = 0 (transparent)

    # Save result
    Image.fromarray(data).save(output_path)
    print(f"Saved to {output_path}")


# Usage
remove_bg("images/logo.jpeg", "images/logo-light-output.png", threshold=80)