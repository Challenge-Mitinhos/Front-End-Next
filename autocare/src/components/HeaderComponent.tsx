// components/HeaderComponent.tsx
import React from "react";

type HeaderComponentProps = {
  name?: string;
  strong?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  fontSize?: string;
  style?: React.CSSProperties;
};

export default function HeaderComponent({
  name,
  strong,
  icon,
  onClick,
  fontSize,
  style,
}: HeaderComponentProps) {
  return (
    <div
      onClick={onClick}
      style={style}
      className="flex flex-col items-center"
    >
      <div className="flex justify-center items-center">{icon}</div>
      <p
        className={[
          strong
            ? "font-bold text-[#01A1FD] hover:text-[#63c6ff]"
            : "font-medium var(--foreground) hover:text-gray-300",
          "transition-colors duration-150 ease-in-out"
        ].join(" ")}
        style={{ fontSize: fontSize || (strong ? "3vh" : "2.2vh") }}
      >
        {name}
      </p>
    </div>
  );
}
