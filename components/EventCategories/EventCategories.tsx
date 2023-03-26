import Image from "next/image";
import React from "react";
import Button from "../Button";
import EventCard from "./EventCard";

const EventCategories = ({ eventCategories }: { eventCategories: any[] }) => {
  return (
    <section
      className="flex flex-row flex-wrap w-full h-full items-center justify-evenly py-10"
      style={{
        // background:
        //   "linear-gradient(146deg, rgba(16,16,16,0.8800770308123249) 39%, rgba(0,0,0,0.9164915966386554) 88%)",
      }}
    >
      <div className="flex flex-col flex-wrap items-center justify-evenly h-full xl:gap-20">
        <EventCard
          Event_categories={eventCategories[0]} />
        <EventCard
          Event_categories={eventCategories[1]} />
      </div>
      <div className="flex flex-col flex-wrap items-center justify-center h-full">
        <EventCard
          Event_categories={eventCategories[2]} />
      </div>
      <div className="flex flex-col flex-wrap items-center justify-evenly h-full xl:gap-56">
        <EventCard
          Event_categories={eventCategories[3]} />
        <EventCard
          Event_categories={eventCategories[4]} />
      </div>
    </section>
  );
};

export default EventCategories;
