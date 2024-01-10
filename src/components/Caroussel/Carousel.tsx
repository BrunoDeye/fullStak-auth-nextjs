import React, { useState } from "react";

import CarouselItem from "./CarouselItem";
import CarouselIndicator from "./CarouselIndicator";

import { IoIosArrowBack } from "react-icons/io";
import { Image } from "@nextui-org/react";

export interface CarouselProps {
  width?: number;
  height?: number;
  items: {
    title: string;
    subtitle: string;
    type: string;
    image: string;
  }[];
}

export default function Carousel({ width, height, items }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  function handleNextItemBtn() {
    setActiveIndex((prev) => {
      return prev + 1 < items.length ? prev + 1 : prev;
    });
  }

  function handlePrevItemBtn() {
    setActiveIndex((prev) => {
      return prev - 1 >= 0 ? prev - 1 : prev;
    });
  }

  return (
    <div className="carousel-container">
      {activeIndex > 0 && (
        <button
          className="carousel-btn-switch-card-left carousel-btn-switch-card"
          onClick={handlePrevItemBtn}
        >
          <IoIosArrowBack />
        </button>
      )}
      {items?.map((item, index) => (
        <CarouselItem imgSrc={item.image} key={index} index={index} activeIndex={activeIndex}>
          <div className="ml-10 mt-5 mb-3 mr-auto">
            <h4>{item.title}</h4>
            <p className="">{item.subtitle}</p>
          </div>

          
        </CarouselItem>
      ))}
      {activeIndex < items.length - 1 && (
        <button
          className="carousel-btn-switch-card-right carousel-btn-switch-card"
          onClick={handleNextItemBtn}
        >
          <IoIosArrowBack
            style={{
              transform: "rotate(180deg)",
            }}
          />
        </button>
      )}

      <CarouselIndicator
        activeIndex={activeIndex}
        length={items.length}
        onSetActiveIndex={(activeIndex) => {
          setActiveIndex(activeIndex);
        }}
        maxIndicatorVisible={items.length}
      />
    </div>
  );
}
