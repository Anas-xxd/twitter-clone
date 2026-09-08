import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import SideBar from "./components/SideBar.jsx";
import { useState } from "react";

export default function App() {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <>
      <Header setShowSideBar={setShowSideBar} />
      <Main />
      <Footer />
      <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
    </>
  );
}
