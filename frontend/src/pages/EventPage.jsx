import axios from "axios";

export default function EventPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
  
    useEffect(() => {
      axios.get(`http://localhost:8834/api/events/${id}`).then(res => setEvent(res.data));
    }, [id]);
  
    if (!event) return <p>Load...</p>;
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <img src={event.imageUrl} className="rounded-lg mt-4 max-h-[300px]" />
        <p className="mt-4">{event.description}</p>
  
        <button className="btn mt-6">🚀 Присоединиться</button>
  
        <Comments eventId={id} />
        <Chat eventId={id} />
      </div>
    );
  }
  