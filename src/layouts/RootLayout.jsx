import { Header } from "../components";

const RootLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default RootLayout;
