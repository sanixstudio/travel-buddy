import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function NavbarWithDropdown() {
  const { showTrackers, toggleTracker } = useContext(AppContext);
  const { user, isLoading, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      <div className="navbar bg-base-100 py-4">
        <div className="flex-1 flex">
          <a
            href="/"
            className="px-4 flex items-center gap-2 rounded-md text-md sm:text-xl md:text-2xl tracking-widest	"
          >
            <img src="/images/site_logo.png" alt="" className="max-w-[46px]" />
            <span className="text-accent font-semibold uppercase">
              Travel Tracker
            </span>
          </a>
        </div>
        <div className="flex-1 justify-end sm:justify-start">
          <button
            className="btn btn-accent"
            onClick={() => {
              if (!user) loginWithRedirect();
              else toggleTracker();
            }}
          >
            {showTrackers ? <FiEyeOff size={22} /> : <FiEye size={22} />}
            <span className="ml-3">
              {showTrackers ? "Hide Trackers" : "Show Trackers"}
            </span>
          </button>
        </div>
        <div className="flex-none gap-6">
          {/* TODO:// Implement search feature  */}
          {/* <div className="hidden md:block form-control">
            <input
              type="text"
              placeholder="Search"
              className="input border border-accent w-24 md:w-auto"
            />
          </div> */}
          {!isLoading && user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.picture} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <span className="p-2 font-bold">{user.name}</span>
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="hidden sm:block btn btn-accent"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}
