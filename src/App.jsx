import { useAuth0 } from "@auth0/auth0-react";
import TheMap from "./components/TheMap/TheMap";
import RootLayout from "./layouts/RootLayout";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function App() {
  const { user, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) loginWithRedirect();
    }, 1000);
    return () => clearTimeout(timer);
  }, [loginWithRedirect, user]);

  return (
    <div className="flex flex-col justify-center items-center overflow-hidden max-h-screen">
      <RootLayout>
        <TheMap />
      </RootLayout>
    </div>
  );
}

export default App;
