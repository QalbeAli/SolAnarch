import React from "react";
import "./Loader.css";

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 18, color = "#fff" }) => {
  const loaderStyle: React.CSSProperties = {
    width: size,
    height: size,
    border: `${size / 8}px solid ${color}`,
    borderTop: `${size / 8}px solid transparent`,
  };

  return <div className="loader" style={loaderStyle} />;
};

export default Loader;
