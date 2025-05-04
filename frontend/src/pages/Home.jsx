import axios from "axios";
import { useEffect, useState } from "react";
import Map from "../components/map/Map";
import "leaflet/dist/leaflet.css";
import EventCard from "../components/eventCard/EventCard";
import CreateEventModal from "../components/eventModal/CreateEventModal";
import FilterBar from "../components/filter/FilterBar";
import EventsList from "../components/events/EventsList";
import useAuthStore from "../store/useAuthStore.jsx";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {
  const { user, loading, fetchUser, logout ,isRegistered} = useAuthStore();
  const [position, setPosition] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({ category: "", date: "" });
  const [refresh, setRefresh] = useState(false);
 



  const onUpload = () => {
    setRefresh(!refresh);
  };

  // useEffect(() => {
  //   try {
  //     axios.get(`${BACKEND_URL}/events`).then((response) => {
  //       setEvents(response.data);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${BACKEND_URL}/events`, { params: filters })
  //     .then((res) => setEvents(res.data));
  // }, [filters]);

  return (
    <div className="p-6">
      <h1 className="text-center text-2xl p-2 font-bold">
        Локальные события рядом
      </h1>
      <Map events={events} position={position} setPosition={setPosition} />
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setShowModal(true)} className="btn">
          ➕ Создать событие
        </button>
      </div>
      <div className="form-fields">
        {position && (
          <>
            GPS: {position.lat}, {position.lng}
          </>
        )}
        <br />
      </div>
      <EventsList />
      {/* <Map events={events} position={position} setPosition={setPosition} /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {events.length > 0 &&
          events.map((event) => <EventCard key={event._id} event={event} />)}
      </div>
      {showModal && (
        <CreateEventModal
          onUpload={onUpload}
          position={position}
          onClose={() => setShowModal(false)}
        />
      )}
      <FilterBar onFilter={setFilters} />
    </div>
  );
}

export default Home;
