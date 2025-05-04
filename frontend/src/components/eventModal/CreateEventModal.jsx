import axios from "axios";
import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function CreateEventModal({ position, onClose ,onUpload}) {
  const { user } = useAuthStore();
  const [images, setImages] = useState([]);
  const [successMsg, setSuccessMsg] = useState({
    message: "",
    result:null
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [filesInput, setFilesInput] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "sports",
    location: { lat: "", lng: "" },
    adress: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const src = e.target.src;
      setFilesInput((prev)=>[...prev, src]);
     
  };

const handlePreview = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    const filePreviews = fileArray.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        }
      });
    });
    Promise.all(filePreviews).then((urls) => {
      setImages(urls);
    }
    );
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if(user){
      formData.append("userId", user.id);
    }
    filesInput.forEach((file) => {
      formData.append("files",file);
    });
    for (let key in form) {
       if (key === "location") {
        formData.append("lat", position.lat);
        formData.append("lng", position.lng);
      } else {
        formData.append(key, form[key]);
      }
  }
    try {
      const res = await axios.post(
        `${BACKEND_URL}/events`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSuccessMsg({
        message: "Event created successfully",
        result:res.data
      });
      onUpload();

    } catch (err) {
      setErrorMsg(err.response?.data?.message || "An error occurred");
      setSuccessMsg({
        message: "",
        result:null
      });
    }
    onClose();
  };

  return (

    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white  p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Create Event</h2>
        <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1008 }}>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-lg"
                  onClick={handleFile}
                />
              ))}
            </div>
          )}
        </div>
        <form method="post" onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            type="text"
            placeholder="Название"
            onChange={handleChange}
            className="input w-full"
          />
          <textarea
            name="description"
            placeholder="Описание"
            onChange={handleChange}
            className="input w-full"
          />
          <input
            name="date"
            type="date"
            onChange={handleChange}
            className="input w-full"
          />
          <hr />
          <label>
            Select activity category:
            <select
              name="category"
              className="input w-full"
              onChange={handleChange}
            >
              <option value="sports">Sports</option>
              <option value="music">Music</option>
              <option value="art">Art</option>
              <option value="technology">Technology</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label htmlFor="adress">
            <input
              name="adress"
              type="text"
              placeholder="Адрес"
              onChange={handleChange}
              className="input w-full"
            />
          </label>
          <hr />
          <input type="file" name="files" onChange={handlePreview} multiple className="input w-full"/>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="btn bg-blue-500 text-white">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
