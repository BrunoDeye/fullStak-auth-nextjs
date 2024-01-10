"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import lottie from "lottie-web";
import { unmountComponentAtNode } from "react-dom";

export type IconNames = "userIcon" | "warrantyIcon" | "keyIcon"

type Props = {

    children?: ReactNode;
    className?: string;
    animationName: string; 
    icon: IconNames;
    size?: number;
}

const UserIcon = ({
  children = "",
  className = "",
  animationName,
  icon = "userIcon",
  size = 40,
}: Props) => {
  const container = useRef(null);

  useEffect(() => {
    // console.log("TRIGGER1")
    if (container.current){
      // console.log("BUILD")
      lottie.loadAnimation({
        container: container.current,
        name: animationName,
        renderer: "svg",
        loop: true,
        autoplay: false,
        animationData: require(`./${icon}.json`),

      });}

   return () =>{ 
    lottie.destroy(); 
    // if (container.current){
    //   UserIcon.apply
    // }
  }
  }, []);

  return (
    <div
      className={`${className || ""} flex items-center gap-2`}
      // onMouseEnter={() => lottie.play(animationName)}
      // onMouseLeave={() => lottie.stop(animationName)}
    >
      <div style={{ height: size, minHeight: size, minWidth: size, maxWidth:size }} id={icon} ref={container} />
      {children}
    </div>
  );
};

export default UserIcon;
