import Image from "next/image";
import React from "react";

const DataModal = ({
  showModal,
  eventData,
  closeModal,
}: {
  showModal: any;
  eventData: any;
  closeModal: any;
}) => {
  console.log(showModal);

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div
            className=" w-full h-3/4 rounded-lg shadow-lg flex flex-col justify-evenly items-center event-modal mx-5 p-5 md:w-1/2"
            //   style={{overflowY: "scroll"}}
          >
            <div className="w-full h-10 flex flex-row justify-between items-center p">
              <div className="w-24 h-24 relative">
                <Image
                  className="event_logo"
                  src={`${eventData.poster_image}.png`}
                  alt={eventData.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h1 className="text-lg font-extrabold text-white py-3 text-left md:text-4xl">
                {eventData.name}
              </h1>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                onClick={() => {
                  closeModal();
                }}
              >
                Close
              </button>
            </div>
            <div className="w-full h-96 flex " style={{ overflowY: "scroll" }}>
              <p
                className="text-base text-white py-2 text-left px-6"
                dangerouslySetInnerHTML={{
                  __html: eventData.rules_regulations,
                }}
              ></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataModal;
