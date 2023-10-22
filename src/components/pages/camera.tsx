import React, { useState, useEffect, useRef, useMemo } from "react";
import { Mint } from "@/components/Mint";
import { FooterButton } from "@/components/footer";
import Webcam from "react-webcam";
import { useCamera } from "@/hooks/useCamera";
import InlineSVG from "react-inlinesvg";
import OverlayMask from "../OverlayMask";
import MaskModal from "@/components/MaskModal";
import fetch from "node-fetch";

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
  } = useCamera();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customOverlayUrl, setCustomOverlayUrl] = useState<string | null>(null);

  const handleOverlaySubmit = (url: string) => {
    setCustomOverlayUrl(url);
    setIsModalOpen(false); // Close the modal after submission
  };  

  const [imageIndex, setImageIndex] = useState<number | null>(null); // Initialize with null
  //const proxyUrl = "http://localhost:3001/proxy-image?url=";
  const images = [
    //`${proxyUrl}https://example.com/image1.jpg`,
    //`${proxyUrl}https://example.com/image2.jpg`,
    "https://i.ibb.co/x2KvnKd/cannabisgenome-e-Noun-removebg-preview.png",
    "https://i.ibb.co/sR34j87/OIP-removebg-preview.png",
    "https://i.ibb.co/k3xNnMh/shitzu.png",
    "https://i.ibb.co/JQRT9N5/fiatisabubble.png",
    "https://i.ibb.co/3vd5dYS/Open-Cann-Icon-2023.png"
  ];

  const [countdown, setCountdown] = useState(20); // Initial countdown value in seconds
  const [countdownIntervalId, setCountdownIntervalId] = useState<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<number>(20); // Use ref to store countdown value
  const [showOverlay, setShowOverlay] = useState(false);
  const [cameraImage, setCameraImage] = useState<string | null>(null); // State to hold composite image

  const handleOverlayStart = () => {
    setShowOverlay(true);
  };

  const handleOverlayComplete = () => {
    setShowOverlay(false);
  };

  const compositeImages = async (cameraImageUrl: string, overlayImageUrl: string): Promise<void> => {
    try {
      const response = await fetch(`/api/proxy-image?url=${encodeURIComponent(overlayImageUrl)}`);
      if (response.ok) {
        const overlayImageBlob = await response.blob();
        const overlayImageUrlObject = URL.createObjectURL(overlayImageBlob);
  
        const cameraImg = new Image();
        cameraImg.onload = () => {
          const overlayImg = new Image();
          overlayImg.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = cameraImg.width;
            canvas.height = cameraImg.height;
            const context = canvas.getContext("2d");
  
            // Draw camera image
            context?.drawImage(cameraImg, 0, 0, canvas.width, canvas.height);
  
            // Draw overlay image
            context?.drawImage(overlayImg, 0, 0, canvas.width, canvas.height);
  
            // Set the composite image to state
            setCameraImage(canvas.toDataURL("image/png"));
          };
          overlayImg.src = overlayImageUrlObject;
        };
        cameraImg.src = cameraImageUrl;
      } else {
        console.error("Failed to fetch overlay image");
      }
    } catch (error) {
      console.error("Error fetching overlay image", error);
    }
  };  

  const handleCapture = () => {
    const cameraImageUrl = webcamRef.current.getScreenshot();
    const overlayImageUrl = images[imageIndex];
    compositeImages(cameraImageUrl, overlayImageUrl);
  };

  const overlayMask = () => {
    //const [imageIndex, setImageIndex] = useState(0);
    //const [countdown, setCountdown] = useState(20);

    // Clear existing countdown interval (if any)
    if (countdownIntervalId) {
      clearInterval(countdownIntervalId);
    }

    const currentImageIndex = imageIndex !== null ? imageIndex : 0;
    const currentImage = document.getElementById("image-overlay");
    let nextImageIndex;

    if (currentImage) {
      currentImage.remove();
    }

    console.log(currentImageIndex, imageIndex, nextImageIndex);

    // If imageIndex is null or at the end of the array, set it to 0
    // Otherwise, increment it to display the next image
    if (imageIndex === null || imageIndex === images.length - 1) {
      nextImageIndex = 0;
    } else {
      nextImageIndex = imageIndex + 1;
    }

    countdownRef.current = 20; // Reset the countdown timer to 20 seconds

    console.log(currentImageIndex, imageIndex, nextImageIndex);

    // Start countdown timer
    setCountdown(20); // Reset the countdown timer to 20 seconds
  
    // If nextImageIndex is 0, do not display overlay and set imageIndex to null
    if (nextImageIndex === 0 && imageIndex === images.length - 1) {
      setImageIndex(null);
    } else {
      // Otherwise, display the overlay with the corresponding image
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
    }
  
    // Start countdown interval
    const intervalId = setInterval(() => {
      countdownRef.current -= 1;
      setCountdown(countdownRef.current);

      if (countdownRef.current <= 0) {
        // Clear the interval when countdown reaches 0
        clearInterval(intervalId);
        const currentImage = document.getElementById("image-overlay");
        if (currentImage) {
          currentImage.remove();
          setImageIndex(null);
        }
      }
    }, 1000);

    // Store the intervalId in state for cleanup
    setCountdownIntervalId(intervalId);
  };

  // Cleanup countdown interval when component unmounts or when imageIndex changes
  useEffect(() => {
    return () => {
      if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
      }
    };
  }, [countdownIntervalId, imageIndex]);

  if (picture) {
    return <Mint currentPhoto={picture} backStep={tryAgain} />;
  }

  if (cameraImage) {
    // If the composite image is available, show the Mint component
    return <Mint currentPhoto={cameraImage} backStep={tryAgain} />;
  }

  const imageToDisplay = useMemo(() => {
    return images[imageIndex];
  }, [imageIndex, images]); // Add imageIndex and images to the dependency array


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

        <div className="flex-col items-center justify-center mt-1 bg-gray-700 p-4 rounded">
          <h2 className="align-center flex font-semibold mb-2 text-mainText text-center">
            <span className="w-full text-white">🎭 Use a Mask 🎭</span>
          </h2>

          <div className="flex items-center justify-center mt-1">
            <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={() => setIsModalOpen(true)}>Custom</button>
            <button className="ml-2 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={overlayMask}>
              Show Next
            </button>
          </div>
        </div>

      {/* Modal for adding custom overlay */}
      <MaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onApply={handleOverlaySubmit} onRemoveMask={() => setCustomOverlayUrl(null)}>
        {/* Content inside your MaskModal */}
        <input
          type="text"
          value={customOverlayUrl || ""}
          onChange={(e) => setCustomOverlayUrl(e.target.value)}
          placeholder="Enter Image URL"
        />
        <button onClick={() => handleOverlaySubmit(customOverlayUrl)}>Apply</button>
      </MaskModal>
  
      {/* Button to remove custom overlay */}
      {customOverlayUrl && (
        <button onClick={() => setCustomOverlayUrl(null)}>Remove Mask</button>
      )}
  
        {!picture && (
          <footer className="fixed bottom-0 left-0 flex w-full items-end justify-center bg-primary h-16">
            <FooterButton onClick={handleCapture} />
          </footer>
        )}
        {showOverlay && (
          <OverlayMask
            images={images}
            onStart={handleOverlayStart}
            onComplete={handleOverlayComplete}
          />
        )}
          <div>
          {imageIndex !== null && <p className="align-center flex font-semibold mb-4 text-mainText text-center text-white ml-4 right-2 top-10 absolute">{`Time: ${countdown}`}</p>}
          </div>
        </div>
        
      </main>
    </>
  );
}