import { Button } from "react-daisyui";

const AddTrackerForm = ({
  handleSubmit,
  user,
  currentLocation,
  formData,
  setFormData,
  isLoading,
  setShowPopup,
}) => {
  return (
    <>
      <form
        onSubmit={(e) =>
          handleSubmit(e, user?.sub, currentLocation.lat, currentLocation.long)
        }
        className="w-full max-w-lg rounded-lg shadow-lg bg-white p-6"
      >
        <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title for area"
          required
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border bg-white border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:border-teal-500"
        />
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-gray-700 font-bold mb-2"
          >
            Rating
          </label>
          <select
            name="rating"
            id="rating"
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
            className="w-full border bg-white border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:border-teal-500"
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Description"
          className="w-full border bg-white border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-teal-500"
        ></textarea>
        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">
            Photo
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, photo: e.target.files[0] })
            }
            className="border border-gray-300 bg-white px-4 py-2 rounded-md w-full focus:outline-none focus:border-teal-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            className="btn btn-sm w-full bg-accent text-white border-0"
            disabled={isLoading}
          >
            Add Tracker
          </Button>
          <Button
            onClick={() => setShowPopup(false)}
            type="cancel"
            className="btn btn-sm w-full border bg-transparent text-gray-500"
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddTrackerForm;
