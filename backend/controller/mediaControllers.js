import cloudinary from '../config/cloudinary.js';
import Media from '../models/Media.js';
import Event from '../models/Event.js';

const uploadMedia = async (req, res) => {
  try {
    const file = req.file;

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: file.mimetype.startsWith("video") ? "video" : "image",
    });

    const media = await Media.create({
      public_id: result.public_id,
      url: result.secure_url,
      type: file.mimetype.startsWith("video") ? "video" : "image",
    });

    await media.save();

    res.status(201).json({ media });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMediaEvent = async (req, res) => {
  try {
   
    const media = await Event.find();
    res.status(200).json({ media });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.status(200).json({ media });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Media.findById(id);
    if (!media) return res.status(404).json({ message: "Media not found" });

    const cloudinaryResp = await cloudinary.uploader.destroy(media.public_id, {
      resource_type: media.type === "video" ? "video" : "image",
    });

    if (cloudinaryResp.result !== "ok")
      return res
        .status(500)
        .json({ message: "Failed to delete media from Cloudinary" });

    await media.deleteOne();
    res.status(200).json({ message: "Media deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { uploadMedia, getMedia, deleteMedia ,getMediaEvent};