import os
from PIL import Image

def convert_to_webp(directory="assets"):
    # Ensure the directory exists
    if not os.path.exists(directory):
        print(f"Directory '{directory}' not found.")
        return

    # Look through every file in the assets folder
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.avif')):
            filepath = os.path.join(directory, filename)
            
            # Create the new filename with .webp extension
            webp_filename = os.path.splitext(filename)[0] + ".webp"
            webp_filepath = os.path.join(directory, webp_filename)

            # Skip if the webp version already exists
            if os.path.exists(webp_filepath):
                continue

            try:
                # Open the image, convert to standard RGB (to handle transparent PNGs), and save as WebP
                img = Image.open(filepath)
                img.convert("RGB").save(webp_filepath, "webp", quality=80)
                print(f"Successfully converted: {filename} -> {webp_filename}")
            except Exception as e:
                print(f"Error converting {filename}: {e}")

if __name__ == "__main__":
    print("Starting WebP conversion...")
    convert_to_webp()
    print("Done! You can now safely delete the old .jpg and .png files if you want to save space.")