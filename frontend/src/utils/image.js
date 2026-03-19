export function bytesToBase64Image(image) {
  const imageData = image?.data?.data || image?.data;

  if (!imageData) {
    return null;
  }

  const uint8Array =
    imageData instanceof Uint8Array ? imageData : new Uint8Array(imageData);
  let binary = "";

  uint8Array.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  const contentType = image?.contentType || "image/jpeg";

  return `data:${contentType};base64,${window.btoa(binary)}`;
}
