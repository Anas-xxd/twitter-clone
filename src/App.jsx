import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import SideBar from "./components/SideBar.jsx";
import { useEffect, useState } from "react";

export default function App() {
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSidebar = () => setShowSideBar((prev) => !prev);

  useEffect(() => {
    if (showSideBar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showSideBar]);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Main />
      <Footer />
      <SideBar showSideBar={showSideBar} toggleSidebar={toggleSidebar} />
    </>
  );
}
