from PIL import Image
import numpy as np

def make_foreground_dark(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)

    # Alpha channel
    alpha = data[:, :, 3]

    # Where pixel is NOT transparent
    fg_mask = alpha > 0

    # Set foreground to black
    data[fg_mask] = [0, 0, 0, 255]

    # Keep background transparent
    data[~fg_mask] = [0, 0, 0, 0]

    Image.fromarray(data).save(output_path)
    print(f"Saved to {output_path}")


# Usage
make_foreground_dark("images/logo-light-output.png", "images/logo-dark-output.png")