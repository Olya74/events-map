import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";


// function LocationMarker({position,setPosition}) {
//   useMapEvents({
//     click(e) {
//       setPosition(e.latlng);
//     },
//   });
//   return position ? <Marker position={position}> : null;
// }
  
export default function Map({ events }) {
  return (
    <MapContainer center={[55.75, 37.62]} zoom={12} className="h-[400px] w-full rounded-xl shadow">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {events && events.map(event => (
        <Marker key={event._id} position={[event.location.lat, event.location.lng]}>
          <Popup>
            <strong>{event.title}</strong><br />
            {event.date}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}