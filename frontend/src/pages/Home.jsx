import axios from 'axios';
import {useEffect, useState} from 'react'

function Home() {
    const [events, setEvents] = useState([]);
    const [showModal,setShowModal] = useState(false);

    useEffect(() => {
        try{
axios.get('http://localhost:8834/api/events')
.then((response) => {
    setEvents(response.data);
})
        }catch(err){
            console.log(err);
        }
    }),[events];

   
  return (
    <div>
      Hallo
    </div>
  )
}

export default Home
