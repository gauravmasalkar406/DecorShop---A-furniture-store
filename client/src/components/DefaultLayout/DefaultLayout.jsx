import { Navbar, Footer } from "../index.js";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
