import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fcsajddwdywtcxkkvvvd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjc2FqZGR3ZHl3dGN4a2t2dnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwMzg3NjMsImV4cCI6MjA0ODYxNDc2M30.U2ggl9uskuQodpc-wnFBoG0qFt8nFJdc9JpZibLGxyQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { detectSessionInUrl: false },
});

export const getImage = (fullPath: string) => {
  const { data } = supabase.storage.from("Images").getPublicUrl(fullPath);
  return data?.publicUrl || null;
};

export const removeImage = async (
  path: string,
  bucket = "Images"
): Promise<boolean> => {
  try {
    if (!path) {
      throw new Error("No path provided for the image to be removed.");
    }

    // Delete the file from Supabase storage
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      console.error("Error removing image from Supabase:", error.message);
      return false;
    }

    console.log(`Image successfully removed: ${path}`);
    return true;
  } catch (error) {
    //@ts-ignore
    console.error("Error in removeImage:", error.message);
    return false;
  }
};
