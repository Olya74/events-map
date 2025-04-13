export default function Profile() {
    const [myEvents, setMyEvents] = useState([]);
    const [joinedEvents, setJoinedEvents] = useState([]);
  
    useEffect(() => {
        try{
            axios.get('http://localhost:8834/api/users/me')
            .then((response) => {
              console.log(response.data);
               // setMyEvents(response.data.myEvents);
               // setJoinedEvents(response.data.joinedEvents);
            }) 
        }catch(err){
            console.log(err);
        }
    }, []);
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Мои события</h2>
        {/* {myEvents.map(event => <EventCard event={event} />)}
  
        <h2 className="text-xl font-bold mt-6 mb-4">Я участвую</h2>
        {joinedEvents.map(event => <EventCard event={event} />)} */}
      </div>
    );
  }
  