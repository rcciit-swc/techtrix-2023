import Image from "next/image";
import Link from "next/link";
import RCCImage from "@/public/images/RCC.svg";

function Header() {
  return (
    <div className=" bg-[#2F2F2F] flex justify-between m-4">
      <Image className=" w-64 mt-4 ml-1" src={RCCImage} alt="RCC" />
      <div className=" flex justify-around items-center">
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
    </div>
  );
}

export default Header;
