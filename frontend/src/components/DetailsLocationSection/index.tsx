import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Activity } from "../../types/activityType";
import "leaflet/dist/leaflet.css";
import { forwardRef } from "react";

const DetailsLocationSection = forwardRef<
  HTMLDivElement,
  { activity: Activity }
>(({ activity }, ref) => {
  const latitude = activity.location.latitude;
  const longitude = activity.location.longitude;
  return (
    <div
    ref={ref}
    className="max-w-[1200px] mx-auto py-6">
      <h1 className="font-bold text-3xl mb-7">Venue Location</h1>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "400px", width: "100%", borderRadius: "18px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>{activity.title}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
});

export default DetailsLocationSection;
