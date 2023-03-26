import Image from 'next/image';
import React from 'react'
import Button from '../Button';

interface Event_categories {
    id: number;
    name: string   /* primary key */;
    picture?: string;
  };

const EventCard = ({Event_categories}:any) => {

    const {id, name, picture} = Event_categories;

  return (
    <div className="flex flex-col items-center justify-center text-white"
    key={id}
    >
          <Image
          className='event_logo'
            src={`${picture}.png`}
            alt={name}
            width={300}
            height={300}
          />
          <h2
          className='font-bold font-mono'
          style={{
            letterSpacing: "1px",
            fontSize: "35px",
            textShadow: "2px 5px 0px rgba(118,99,99,1)"
            
          }}
          >{name}</h2>
          <Button text="Register Now" />
        </div>
  )
}

export default EventCard