import { useState } from "react";
import Image from 'next/image'

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="w-full bg-transparent shadow"
    style={{
      background:
        "linear-gradient(146deg, rgba(16,16,16,0.8800770308123249) 39%, rgba(0,0,0,0.9164915966386554) 88%)",
    }}
    >
      <div className="justify-between px-4 mx-auto lg:max-wfull md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="javascript:void(0)">
                <img
                src="https://i.imgur.com/cEHsdDm.png"
                alt="rcciit"
                width={250}
                height={100}

                />
            </a>
            <div className="md:hidden">
              <div
                className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
                onClick={() => setNavbar(!navbar)}
              >
                <span
                  className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
                    navbar? "rotate-45 translate-y-3.5" : ""
                  }`}
                />
                <span
                  className={`h-1 w-full bg-white rounded-lg transition-all duration-300 ease-in-out ${
                    navbar? "w-0 translate-x-14" : "w-full"
                  }`}
                />
                <span
                  className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
                    navbar? "-rotate-45 -translate-y-3.5" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-white hover:text-blue-600">
                <a href="javascript:void(0)">Home</a>
              </li>
              <li className="text-white hover:text-blue-600">
                <a href="javascript:void(0)">Blog</a>
              </li>
              <li className="text-white hover:text-blue-600">
                <a href="javascript:void(0)">About US</a>
              </li>
              <li className="text-white hover:text-blue-600">
                <a href="javascript:void(0)">Contact US</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
