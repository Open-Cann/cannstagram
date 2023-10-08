import React from "react";
import { useState } from "react";
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

  const [imageIndex, setImageIndex] = useState(null); // State to keep track of the current image index
  const images = [
    "https://i.ibb.co/3vd5dYS/Open-Cann-Icon-2023.png",
    "https://i.ibb.co/x2KvnKd/cannabisgenome-e-Noun-removebg-preview.png",
    "https://i.ibb.co/sR34j87/OIP-removebg-preview.png"
    // Add more image filenames to the array as needed
  ]; 
  const overlayMask = () => {
    // Get the current image index from state
  const currentImageIndex = imageIndex !== null ? imageIndex : -1;
  const nextImageIndex = (currentImageIndex + 1) % images.length;

  // Remove the currently displayed image
  const currentImage = document.getElementById("image-overlay");
  if (currentImage) {
    currentImage.remove();
  }

  // If nextImageIndex is within the array bounds, display the next image overlay
  if (nextImageIndex < images.length) {
    const img = document.createElement("img");
    img.src = images[nextImageIndex];
    img.style.position = "absolute";
    img.width = 290; // Set the desired width
    img.height = 290; // Set the desired height
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)";
    img.style.zIndex = "9999";
    img.id = "image-overlay"; // Set an ID for easy removal
    document.body.appendChild(img);

    // Update the image index in state
    setImageIndex(nextImageIndex as unknown);

    // Remove the image after 10 seconds (10000 milliseconds)
    setTimeout(() => {
      // Check if img element exists before removing it
      const currentImage = document.getElementById("image-overlay");
      if (currentImage) {
        currentImage.remove();
        setImageIndex(null); // Reset the image index
      }
    }, 10000);
  }
};

  if (picture) {
    return <Mint currentPhoto={picture} backStep={tryAgain} />;
  }

  return (
    <>
      <main className="h-camera overflow-hidden	 w-screen flex items-center justify-center">
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
          {/* 
            {pageLoaded && !permissionGranted && (
            <button onClick={requestCameraPermission}>Try Again</button>
          )} */}

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
