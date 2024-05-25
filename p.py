import base64

def encode_image_to_base64(image_path):
    """
    Encodes an image to a base64 string and adds the appropriate MIME type prefix.
    Args:
    image_path (str): Path to the image file.

    Returns:
    str: Base64 encoded image string with MIME type prefix.
    """
    # Determine the file extension to set the correct MIME type
    mime_type = "jpeg"  # Default to JPEG
    if image_path.lower().endswith(".png"):
        mime_type = "png"
    elif image_path.lower().endswith(".gif"):
        mime_type = "gif"

    # Read and encode the image
    with open(image_path, "rb") as image_file:
        base64_image = base64.b64encode(image_file.read()).decode('utf-8')

    # Return the base64 string with the appropriate prefix
    return f"data:image/{mime_type};base64,{base64_image}"

# Example usage:
image_path = "uploaded_images/photo_2024-05-25_12-31-54.jpg"
encoded_image = encode_image_to_base64(image_path)
print(encoded_image)

