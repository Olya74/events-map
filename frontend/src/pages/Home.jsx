import axios from 'axios';
import {useEffect, useState} from 'react'
import Map from '../components/map/Map';
import EventCard from '../components/eventCard/EventCard';
import CreateEventModal from '../components/eventModal/CreateEventModal';
import FilterBar from '../components/filter/FilterBar';







function Home() {
    const [events, setEvents] = useState([]);
    const [showModal,setShowModal] = useState(false);
    const [filters, setFilters] = useState({ category: "", date: "" });

    useEffect(() => {
        try{
axios.get('http://localhost:8834/api/events')
.then((response) => {
    setEvents(response.data);
})
        }catch(err){
            console.log(err);
        }
    }),[];

    useEffect(() => {
      axios.get("http://localhost:8834/api/events", { params: filters }).then(res => setEvents(res.data));
    }, [filters]);
    
   
  return (
    <div className="p-4">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Локальные события рядом</h1>
      <button onClick={() => setShowModal(true)} className="btn">
        ➕ Создать событие
      </button>
    </div>
    <Map events={events} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {events.length>0 && events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
    {showModal && <CreateEventModal onClose={() => setShowModal(false)} />}
    <FilterBar onFilter={setFilters} />
  </div>
  )
}

export default Home
