import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import { mapBoxKey } from "../../utils/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../config/supabase";
import { AppContext } from "../../context/appContext";
import TrackerPopup from "../TrackerPopup/TrackerPopup";
import uploadImageAndGetUrl from "../../utils/upload";
import AddTrackerForm from "../AddTrackerForm/AddTrackerForm";
import { useAuth0 } from "@auth0/auth0-react";

const MapBox = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { showTrackers } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    long: 0,
  });

  const [formData, setFormData] = useState({
    title: "",
    rating: null,
    description: "",
    photo: null,
  });

  const [state] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 13,
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("trackers").select();
      const result =
        data && data.filter((tracker) => tracker?.sub === user?.sub);
      setData(result);
    }

    fetchData();
  }, [user, isSuccess]);

  const handleSubmit = async (e, sub, lat, long) => {
    e.preventDefault();
    const { title, rating, description } = formData;

    try {
      setIsLoading(true);
      const imgLink = await uploadImageAndGetUrl(formData.photo);
      const imageUrl = imgLink.data.publicUrl;

      const trackerData = {
        title,
        rating,
        description,
        sub,
        lat,
        long,
        photo: imageUrl,
      };

      const { error } = await supabase.from("trackers").insert(trackerData);
      if (error) {
        toast.error("Operation failed, try again");
        setIsLoading(false);
      } else {
        toast.success("Successfully Added");
        setIsLoading(false);
      }
    } catch (err) {
      toast.error("Operation failed, try again");
      setIsLoading(false);
    }

    setShowPopup(false);
    navigate(0);
  };

  return (
    <>
      <ToastContainer />
      <Map
        reuseMaps
        initialViewState={state}
        style={{
          width: "100vw",
          height: "100vh",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={mapBoxKey}
        onClick={(e) => {
          setShowPopup(!showPopup);
          setCurrentLocation({
            ...currentLocation,
            long: e.lngLat.lng,
            lat: e.lngLat.lat,
          });
        }}
      >
        {showPopup && (
          <Popup
            latitude={currentLocation.lat}
            longitude={currentLocation.long}
            anchor="top"
            closeButton={false}
            className="flex overflow-hidden form-wrap"
          >
            <AddTrackerForm
              user={user}
              currentLocation={currentLocation}
              isLoading={isLoading}
              handleSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              setShowPopup={setShowPopup}
            />
          </Popup>
        )}
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />
        <Marker
          color="red"
          draggable
          latitude={currentLocation.lat}
          longitude={currentLocation.long}
        />
        {showTrackers &&
          data?.map((tracker) => (
            <TrackerPopup key={tracker.id} tracker={tracker} />
          ))}
      </Map>
    </>
  );
};

export default MapBox;
