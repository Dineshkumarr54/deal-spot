import axios from 'axios';

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_preset"); // ✅ replace with your preset
  formData.append("cloud_name", "dv05k4slk"); // ✅ replace with your cloud name

  const res = await fetch("https://api.cloudinary.com/v1_1/dv05k4slk/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.secure_url;
};

