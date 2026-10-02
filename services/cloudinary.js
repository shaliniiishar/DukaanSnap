const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (file) => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary is not configured. Check your .env file."
    );
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Cloudinary upload failed.");
  }

  const data = await response.json();

  return {
    secureUrl: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
  };
};

export const getOptimizedImageUrl = (
  publicId,
  width = 900,
  height = 900
) => {
  if (!CLOUD_NAME || !publicId) {
    return "";
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/e_background_removal/e_auto_enhance/c_fill,g_auto,w_${width},h_${height}/f_auto,q_auto/${publicId}`;
};
export const getStyleEnhancedImageUrl = (
  publicId,
  style = "clean",
  width = 900,
  height = 900
) => {
  if (!CLOUD_NAME || !publicId) {
    return "";
  }

  let transformation = "";

  if (style === "clean") {
    transformation =
      `e_auto_enhance/c_fill,g_auto,w_${width},h_${height}/f_auto,q_auto`;
  }

  if (style === "pinterest") {
    transformation =
      `e_auto_enhance/e_brightness:8/e_saturation:8/c_fill,g_auto,w_${width},h_${height}/f_auto,q_auto`;
  }

  if (style === "premium") {
    transformation =
      `e_auto_enhance/e_contrast:8/e_sharpen:30/c_fill,g_auto,w_${width},h_${height}/f_auto,q_auto`;
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
};