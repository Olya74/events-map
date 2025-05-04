import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore.jsx";
import "./image-gallery.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function ImageGallery() {
  const [media, setMedia] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const resp = await axios.get("http://localhost:8834/api/media");
      console.log("gallery", resp.data.media);
      setMedia(resp.data.media);
    } catch (error) {
      console.log(error);
      setMedia([]);
    }
  };
  const deleteMedia = async (id) => {
    try {
      await axios.delete(`http://localhost:8834/api/events/${id}`);
      setMedia((prevMedia) => prevMedia.filter((item) => item._id !== id));
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="image-gallery">
      {media.length > 0 &&
        media.map((med) => {
          return (
            <div key={med._id}>
              <h2>{med.title}</h2>
              <p>{med.description}</p>
              {med.media.length > 0 ? (
                med.media.map((item) => {
                  return (
                    <div key={item._id} className="media-item">
                      <img
                        key={item._id}
                        src={`http://localhost:8834/${item.url}`}
                        alt="media"
                        style={{ width: 160, height: 160 }}
                      />
                      <button onClick={() => deleteMedia(med._id)}>
                        Delete
                      </button>
                      <br />
                      <button onClick={fetchMedia}>Refresh</button>
                    </div>
                  );
                })
              ) : (
                <img src={`${BACKEND_URL / med.url}`} alt="med.url" />
              )}
            </div>
          );
        })}
    </div>
  );
}
