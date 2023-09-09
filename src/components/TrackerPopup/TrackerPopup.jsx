import { Popup } from "react-map-gl";
import {
  AiFillStar,
  AiOutlineCaretDown,
  AiOutlineCaretUp,
} from "react-icons/ai";
import { useState } from "react";

const TrackerPopup = ({ tracker }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const getRatings = (number) => {
    const stars = [];
    for (let i = 1; i <= number; i++) {
      stars.push(<AiFillStar color="orange" key={i} />);
    }
    return stars;
  };

  const ratings = getRatings(tracker.rating);

  return (
    <>
      <Popup
        key={tracker.id}
        latitude={tracker.lat}
        longitude={tracker.long}
        closeOnMove={false}
        closeButton={false}
        closeOnClick={false}
        focusAfterOpen={true}
        className="bg-accent shadow-md w-[300px]"
      >
        <div className="p-2 flex flex-col gap-2">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleCollapse()}
          >
            <h3 className="text-lg font-semibold text-gray-600">
              {tracker.title}
            </h3>
            <span>
              {isCollapsed ? (
                <AiOutlineCaretDown size={22} />
              ) : (
                <AiOutlineCaretUp size={22} />
              )}
            </span>
          </div>
          {!isCollapsed ? (
            <div className="flex flex-col gap-3">
              <div>Ratings: {<div className="flex">{ratings}</div>}</div>
              <p className="text-xs leading-5">
                Description: {tracker.description}
              </p>
              <div className="flex justify-center items-center">
                <img
                  src={tracker.photo}
                  alt={tracker.title}
                  className="max-h-[200px] w-full object-contain bg-slate-100 p-2"
                />
              </div>
            </div>
          ) : null}
        </div>
      </Popup>
    </>
  );
};

export default TrackerPopup;
