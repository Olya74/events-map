import axios from "axios";
import { useState } from "react";


export default function CreateEventModal({ onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    image: null,
    location: { lat: "", lng: "" },
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = e => {
    setForm(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) {
      if (key === "location") {
        formData.append("lat", form.location.lat);
        formData.append("lng", form.location.lng);
      } else {
        formData.append(key, form[key]);
      }
    }

    await axios.post("http://localhost:8834/api/events", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Создать событие</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="title" type="text" placeholder="Название" onChange={handleChange} className="input w-full" />
          <textarea name="description" placeholder="Описание" onChange={handleChange} className="input w-full" />
          <input name="date" type="date" onChange={handleChange} className="input w-full" />
          <input name="category" type="text" placeholder="Категория" onChange={handleChange} className="input w-full" />
          <input name="lat" type="number" placeholder="Широта" onChange={e => setForm(prev => ({ ...prev, location: { ...prev.location, lat: e.target.value } }))} className="input w-full" />
          <input name="lng" type="number" placeholder="Долгота" onChange={e => setForm(prev => ({ ...prev, location: { ...prev.location, lng: e.target.value } }))} className="input w-full" />
          <input type="file" onChange={handleFile} className="input w-full" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn bg-gray-300">Отмена</button>
            <button type="submit" className="btn bg-blue-500 text-white">Создать</button>
          </div>
        </form>
      </div>
    </div>
  );
}
