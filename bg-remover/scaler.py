from PIL import Image, ImageFilter

def scale_and_smooth(input_path, output_path, scale=2.0, blur_radius=1.0, threshold=128):
    # Load as grayscale (since it's black/white)
    img = Image.open(input_path).convert("L")

    # Scale with high-quality resampling
    new_size = (int(img.width * scale), int(img.height * scale))
    img = img.resize(new_size, Image.LANCZOS)

    # Slight blur to smooth jagged edges
    img = img.filter(ImageFilter.GaussianBlur(radius=blur_radius))

    # Re-binarize (back to pure black/white)
    img = img.point(lambda x: 255 if x > threshold else 0, mode='1')

    img.save(output_path)
    print(f"Saved to {output_path}")


# Usage
scale_and_smooth(
    "images/logo-dark-output.png",
    "images/logo-scaled-smooth.png",
    scale=3.0,        # how much bigger
    blur_radius=1.2,  # edge softness
    threshold=140     # edge sharpness
)