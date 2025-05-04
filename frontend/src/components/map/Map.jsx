import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker({position,setPosition}) {
  useMapEvents({
    click(e) {
      console.log(e);
      setPosition(()=>e.latlng);
    },
  });
  return position ? <Marker position={position} /> : null;
}
 
export default function Map({ position, setPosition, events }) {
   
  return (
    <MapContainer
      center={[52.520008, 13.404954]}
      zoom={16}
      className="h-[400px] w-full rounded-xl shadow"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} setPosition={setPosition} />
      {events &&
        events.map((event) => (
          <Marker
            key={event._id}
            position={[event.location.lat, event.location.lng]}
          >
            <Popup>
              <strong>{event.title}</strong>
              <br />
              {event.date}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}