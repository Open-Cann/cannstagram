import React, { useState, useEffect } from "react";
import { Mint } from "@/components/Mint";
import { FooterButton } from "@/components/footer";
import Webcam from "react-webcam";
import { useCamera } from "@/hooks/useCamera";
import InlineSVG from "react-inlinesvg";

export default function CameraPage() {
  const {
    picture,
    tryAgain,
    cameraLoaded,
    toggleCamera,
    permissionGranted,
    webcamRef,
    facingMode,
    setCameraLoaded,
    capture,
  } = useCamera();

  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const images = [
    "https://i.ibb.co/3vd5dYS/Open-Cann-Icon-2023.png",
    "https://i.ibb.co/x2KvnKd/cannabisgenome-e-Noun-removebg-preview.png",
    "https://i.ibb.co/sR34j87/OIP-removebg-preview.png"
  ];

  const [countdown, setCountdown] = useState(20); // Initial countdown value in seconds
  const [countdownIntervalId, setCountdownIntervalId] = useState<NodeJS.Timeout | null>(null);

  const overlayMask = () => {
    const currentImageIndex = imageIndex !== null ? imageIndex : -1;
    const nextImageIndex = (currentImageIndex + 1) % images.length;
  
    const currentImage = document.getElementById("image-overlay");
    if (currentImage) {
      currentImage.remove();
    }
  
    const img = document.createElement("img");
    img.src = images[nextImageIndex];
    img.style.position = "absolute";
    img.width = 290;
    img.height = 290;
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)";
    img.style.zIndex = "9999";
    img.id = "image-overlay";
    document.body.appendChild(img);
  
    setImageIndex(nextImageIndex);
    setCountdown(20); // Reset the countdown timer to 20 seconds
  
    // Clear the previous interval before starting a new one
    if (countdownIntervalId) {
      clearInterval(countdownIntervalId);
    }
  
    const intervalId = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          clearInterval(intervalId); // Clear the interval when countdown reaches 0
          const currentImage = document.getElementById("image-overlay");
          if (currentImage) {
            currentImage.remove();
            setImageIndex(null);
          }
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000); // Set the interval to 1000 milliseconds (1 second)
  
    // Store the interval ID for cleanup
    setCountdownIntervalId(intervalId);
  };
  
  
  

  // Cleanup countdown interval when component unmounts
  useEffect(() => {
    return () => {
      if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
      }
    };
  }, [countdownIntervalId]);

  if (picture) {
    return <Mint currentPhoto={picture} backStep={tryAgain} />;
  }

  return (
    <>
      <main className="h-camera overflow-hidden w-screen flex items-center justify-center">
        <div className="h-1/2 relative m-camera">
          {!!cameraLoaded && (
            <h2 className="align-center flex font-semibold mb-4 text-mainText text-center">
              <span className="w-full">Let&apos;s Take a Picture </span>
              <div className="h-8 w-8 right-0 absolute" onClick={toggleCamera}>
                <InlineSVG
                  src="/images/cameraswitch.svg"
                  className="fill-current text-mainText"
                />
              </div>
            </h2>
          )}

          {permissionGranted && !picture && (
            <Webcam
              ref={webcamRef}
              className="flex h-full w-full "
              screenshotFormat="image/webp"
              forceScreenshotSourceSize
              screenshotQuality={1}
              videoConstraints={{
                height: 1024,
                width: 1024,
                aspectRatio: 1,
                facingMode: facingMode,
              }}
              onPlaying={() => {
                setCameraLoaded(true);
              }}
            />
          )}

          {/* Button container with absolute positioning */}
          <div className="fixed bottom-100 left-0 w-full flex justify-center p-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={overlayMask}
          >
            Add Overlay
          </button>
          {imageIndex !== null && <p className="text-black ml-4">{`Overlay will disappear in ${countdown} seconds`}</p>}
        </div>
        </div>
      </main>

      {!picture && (
        <footer className="fixed bottom-0 left-0 flex w-full items-end justify-center bg-primary h-16">
          <FooterButton onClick={capture} />
        </footer>
      )}
    </>
  );
}
