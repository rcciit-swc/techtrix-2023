import Image from "next/image";
import Link from "next/link";
import RCCImage from "@/public/images/RCC.svg";
import CloseButton from "@/public/images/CloseButton.svg";
import { useEffect, useState } from "react";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  function sidebar() {
    setSidebarOpen(!sidebarOpen);
  }
  useEffect(() => {
    if (sidebarOpen) {
        document.getElementById("sidebarContainer").style.display = "block";
    } else {
        document.getElementById("sidebarContainer").style.display = "none";
    }
  }, [sidebarOpen]);
  return (
    <div className=" bg-[#2F2F2F] absolute w-full flex justify-between m-4">
      <Image className=" w-64 mt-4 ml-1" src={RCCImage} alt="RCC" />
      <div className=" flex justify-around items-center nav-items">
        <Link href="/home">
          <span className="text-white text-lg mr-4">Home</span>
        </Link>
        <span className="text-white text-lg mr-4">|</span>
        <Link href="/about">
          <span className="text-white text-lg mr-4">About Us</span>
        </Link>
        <span className="text-white text-lg mr-4">|</span>
        <Link href="/events">
          <span className="text-white text-lg mr-4">Events</span>
        </Link>
        <span className="text-white text-lg mr-4">|</span>
        <Link href="/teams">
          <span className="text-white text-lg mr-4">Teams</span>
        </Link>
        <span className="text-white text-lg mr-4">|</span>
        <Link href="/contact">
          <span className="text-white text-lg mr-4">Contacts</span>
        </Link>
        <span className="text-white text-lg mr-4">|</span>
        <Link href="/login">
          <span className="text-white text-lg mr-4">Login</span>
        </Link>
      </div>
      <div className="hamburger pt-3 flex items-center">
        <svg
          viewBox="0 0 100 80"
          width="35"
          height="35"
          fill="white"
          className=" cursor-pointer"
          onClick={sidebar}
        >
          <rect width="80" height="10"></rect>
          <rect y="20" width="80" height="10"></rect>
          <rect y="40" width="80" height="10"></rect>
        </svg>
      </div>
      <div
        className="fixed top-0 right-0 bottom-0 w-[270px] bg-[#2F2F2F] sidebar"
        id="sidebarContainer"
      >
          <Image
            className="absolute top-8 right-6"
            src={CloseButton}
            alt="Close"
            onClick={sidebar}
          />
          <div className="flex flex-col mt-16 ml-6">
            <Link href="/home">
              <div className="text-white text-lg m-4">Home</div>
            </Link>
            <div className=" w-52 ml-4 h-[1px] bg-[#fff]"></div>
            <Link href="/about">
              <div className="text-white text-lg m-4">About Us</div>
            </Link>
            <div className=" w-52 ml-4 h-[1px] bg-[#fff]"></div>
            <Link href="/events">
              <div className="text-white text-lg m-4">Events</div>
            </Link>
            <div className=" w-52 ml-4 h-[1px] bg-[#fff]"></div>
            <Link href="/teams">
              <div className="text-white text-lg m-4">Teams</div>
            </Link>
            <div className=" w-52 ml-4 h-[1px] bg-[#fff]"></div>
            <Link href="/contact">
              <div className="text-white text-lg m-4">Contacts</div>
            </Link>
            <div className=" w-52 ml-4 h-[1px] bg-[#fff]"></div>
            <Link href="/login">
              <div className="text-white text-lg m-4">Login</div>
            </Link>
            <div className=" w-52 ml-4 h-[1px] bg-[#fff]"></div>
          </div>
      </div>
    </div>
  );
}

export default Header;
