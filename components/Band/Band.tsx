import React from "react";
import Marquee from "react-fast-marquee";
import { OutlineText } from "./OutlineText";
import { Text } from "./Text";

interface BandProps {
  text: string;
  number: number;
  bgColor: string;
  textColor: string;
  angle: string;
  outlineColor: string;
  dir: any;
}

function Band({
  text,
  number,
  bgColor,
  textColor,
  angle,
  outlineColor,
  dir,
}: BandProps) {
  const genrateText = (text: string, number: number) => {
    let textArray: string[] = [];
    for (let i = 0; i < number; i++) {
      textArray.push(text);
    }
    return textArray;
  };

  return (
    <div
      style={{
        // background:
        //   "linear-gradient(146deg, rgba(16,16,16,0.8800770308123249) 39%, rgba(0,0,0,0.9164915966386554) 88%)",
      }}
    >
      <div
        className={`bg-${bgColor}`}
        style={{
          display: "flex",
          alignItems: "center",
          color: `${textColor}`,
          fontSize: "5rem",
          width: "99.9%",
          transform: `rotate(${angle})`,
        }}
      >
        <Marquee gradient={false} speed={100} direction={dir}>
          {genrateText(text, number).map((text) => (
            <>
              <OutlineText
                textOutline={`${outlineColor}`}
                // key={`band_text_${index}`}
              >
                {text}
              </OutlineText>
              <Text
                color={`${textColor}`}
                // key={`band_text_${index}`}
              >
                {text}
              </Text>
            </>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default Band;
