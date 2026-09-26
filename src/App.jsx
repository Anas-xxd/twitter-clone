import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { useEffect, useState } from "react";
import DesktopSidebar from "./components/Sidebar/DesktopSidebar.jsx";

export default function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showSidebar]);

  return (
    <div className="app-layout">
      <aside className="left-column">
        <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <DesktopSidebar />
      </aside>

      <div className="middle-column">
        <Header toggleSidebar={toggleSidebar} />

        <Main />
      </div>

      <aside className="right-column"></aside>

      <Footer />
    </div>
  );
}
