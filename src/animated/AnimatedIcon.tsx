"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import lottie from "lottie-web";

type Props = {

    children?: ReactNode;
    className?: string;
    icon: "userIcon" | "warrantyIcon";
}

const UserIcon = ({
  children = "",
  className = "",
  icon = "userIcon",
}: Props) => {
  const container = useRef(null);

  useEffect(() => {
    if (container.current)
      lottie.loadAnimation({
        container: container.current,
        name: icon,
        renderer: "svg",
        loop: true,
        autoplay: false,
        animationData: require(`./${icon}.json`),
        rendererSettings: {
          preserveAspectRatio: "xMidYMid meet",
        },
      });

    return () => {
      lottie.destroy();
    };
  }, []);

  return (
    <div
      className={`${className || ""} flex items-center gap-2`}
      onMouseEnter={() => lottie.play(icon)}
      onMouseLeave={() => lottie.stop(icon)}
    >
      <div style={{ height: 40, minHeight: 40, minWidth: 40, maxWidth:40 }} id={icon} ref={container} />
      {children}
    </div>
  );
};

export default UserIcon;
