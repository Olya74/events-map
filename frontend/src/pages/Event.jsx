import {useState,useEffect} from 'react'

function Event() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      axios.get("http://localhost:8834/api/events").then((response) => {
        setEvents(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }),
    [events];

  return <div>Hallo</div>;
}

export default Event
