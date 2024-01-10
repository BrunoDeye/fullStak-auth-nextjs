import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export interface CardProps {
  index: number;
  activeIndex: number;
  children?: React.ReactNode;
  imgSrc: string;
}

export default function CarouselItem({
  index,
  activeIndex,
  children,
  imgSrc,
}: CardProps) {
  const [scaled, setScaled] = useState<Boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const offset = (index - activeIndex) / 4;
  const direction = Math.sign(index - activeIndex);
  const absOffset = Math.abs(offset);

  const cssTransformProperties = `
        rotateY(calc(${offset} * 55deg))
        scaleY(calc(1 +  ${absOffset}  * -0.5))
        translateX(calc( ${direction} * -3.5rem))
        translateZ(calc( ${absOffset} * -35rem))
       `;

  const cssOpacity = `${Math.abs(index - activeIndex) >= 3 ? "0" : "1"}`;

  const cssDisplay = `${Math.abs(index - activeIndex) >= 3 ? "none" : "block"}`;

  const cssPointerEvents: "none" | "all" = `${
    index !== activeIndex ? "none" : "all"
  }`;

  return (
    <div
      className="carousel-item"
      style={{
        transform: cssTransformProperties,
        opacity: cssOpacity,
        display: cssDisplay,
        pointerEvents: cssPointerEvents,
      }}
      onClick={onOpen}
    >
      <Card className="min-h-[110px] justify-center items-center mx-auto my-auto sm:min-h-[140px] md:min-h-[200px]">
        {" "}
        {children}
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="rounded-none"
          src={imgSrc}
          alt="teste"
        />
      </Card>
      <Modal
        size={"full"}
        isOpen={isOpen}
        onClose={onClose}
        classNames={{ closeButton: "z-50" }}

        // scrollBehavior="inside"
      >
        <ModalContent
          onClick={() => setScaled(!scaled)}
          className="flex justify-center items-center"
        >
          <ModalBody>

         
          <div
            style={{
              cursor: `${
                scaled && index === activeIndex ? "zoom-out" : "zoom-in"
              }`,

              overflow: "scroll",
              minHeight: "100vh",
              maxHeight: "100vh",
              minWidth: `${scaled && index === activeIndex ? "100vw" : "80vw"}`,
              maxWidth: `${scaled && index === activeIndex ? "100vw" : "80vw"}`,
              // margin: "auto",
            }}
            // className={`${scaled && index === activeIndex ? "zoom-in-[3.5]" : ""}`}
            className={` mx-auto w-full h-full  rounded-none`}
          >
            {children}
            <div className="flex items-center justify-center h-full">

            
              <Image
                width={0}
                height={0}
                unoptimized={true}
                quality={100}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  overflow: "scroll",
                  // minWidth: `${scaled && index === activeIndex ? "90vw" : "80vw"}`,
                  // maxWidth: `${scaled && index === activeIndex ? "90vw" : "80vw"}`,
                  // margin: "auto",
                }}
                className={`${
                  scaled && index === activeIndex ? "scale-100" : ""
                } mx-auto my-auto rounded-none`}
                src={imgSrc}
                alt="teste"
              /></div>
          </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
