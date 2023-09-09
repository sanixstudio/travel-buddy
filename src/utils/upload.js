import supabase from "../config/supabase";

const generateKey = (filename) => {
  const timestamp = new Date().getTime();
  return `${timestamp}_${filename}`;
};

const uploadImageAndGetUrl = async (file) => {
  try {
    const key = generateKey(file.name);
    const { error } = await supabase.storage.from("images").upload(key, file);

    if (error) {
      console.error("Error uploading image:", error.message);
      return null;
    }

    const publicURL = supabase.storage.from("images").getPublicUrl(key);

    return publicURL;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }
};

export default uploadImageAndGetUrl;
