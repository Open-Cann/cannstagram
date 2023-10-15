import React, { useEffect, useState } from "react";

const OverlayMask = ({ images, onStart, onComplete }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    onStart(); // Notify parent component that overlay mask has started

    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(intervalId);
          onComplete(); // Notify parent component that overlay mask is complete
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [onStart, onComplete]);

  return (
    <div className="overlay-mask">
      <img
        src={images[imageIndex]}
        alt={`Overlay ${imageIndex + 1}`}
        className="overlay-image"
      />
      <p className="overlay-countdown">{`Time: ${countdown}`}</p>
    </div>
  );
};

export default OverlayMask;
