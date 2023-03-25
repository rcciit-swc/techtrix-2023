import Image from "next/image";
import React from "react";

const EventCategories = ({ eventCategories }: { eventCategories: any[] }) => {
  return (
    <div>
      {eventCategories.map((eventCategory, index) => {
        return (
          <div key={`event__category__${index}`}>
            <Image
              src={`${eventCategory.picture}.png`}
              alt={eventCategory.name}
              width={200}
              height={200}
            />
            <span>{eventCategory.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default EventCategories;
