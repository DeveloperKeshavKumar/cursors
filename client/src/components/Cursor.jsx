import React from "react";
import { usePerfectCursor } from "../hooks/usePerfectCursor";

export default function Cursor({ name, point, color = "red" }) {
  const rCursor = React.useRef(null);

  const animateCursor = React.useCallback(
    (point) => {
      const elm = rCursor.current;
      if (!elm) return;
      elm.style.setProperty(
        "transform",
        `translate(${point[0]}px, ${point[1]}px)`
      );
    },
    []
  );

  const onPointMove = usePerfectCursor(animateCursor);

  React.useLayoutEffect(() => onPointMove(point), [onPointMove, point]);

  return (
    <svg
      ref={rCursor}
      style={{
        position: "absolute",
        top: -15,
        left: -15,
        width: 50,
        height: 50,
        zIndex: 2,
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 40"
      fill="none"
    >
      <path
        fill={color}
        stroke="#000"
        strokeWidth="1"
        d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"
      />
      <text
        x="50%"
        y="100%"
        alignmentBaseline="middle"
        textAnchor="middle"
        fontSize="16"
        fill="#000"
        stroke="none"
      >
        {name}
      </text>
    </svg>
  );
}
