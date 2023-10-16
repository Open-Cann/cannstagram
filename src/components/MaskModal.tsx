import React, { useState } from "react";
import InlineSVG from "react-inlinesvg";
import "./MaskModal.css"; // Import your CSS file for modal styles

interface MaskModalProps {
    isOpen: boolean;
    onApply: (url: string) => void;
    onRemoveMask: () => void;
    onClose: () => void;
  }
  
  const MaskModal: React.FC<MaskModalProps> = ({ isOpen, onApply, onRemoveMask, onClose }) => {
    const [customOverlayUrl, setCustomOverlayUrl] = useState("");
    const [error, setError] = useState<string | null>(null);
  
    const handleOverlaySubmit = () => {
      // Validate the URL if needed
      if (customOverlayUrl) {
        const proxyUrl = "http://localhost:3001/proxy-image?url="; // Replace this with your proxy server URL
        const imageUrl = proxyUrl + encodeURIComponent(customOverlayUrl);
        
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          onApply(imageUrl);
          setError(null);
          onClose(); // Close the modal after applying the custom overlay
        };
        img.onerror = () => {
          setError("Not a valid image");
        };
      }
    };

  const handleCancel = () => {
    setCustomOverlayUrl(""); // Clear the input field
    setError(null); // Clear the error message
    onClose(); // Close the modal without applying changes
  };

  if (!isOpen) {
    return null; // Render nothing if modal is not open
  }

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-header">
          <h2 className="text-xl font-semibold">Add Custom Mask</h2>
          <button className="close-btn" onClick={handleCancel}>
            <InlineSVG src="/images/close-icon.svg" />
          </button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter Image URL"
            value={customOverlayUrl}
            onChange={(e) => setCustomOverlayUrl(e.target.value)}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary mr-2" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-primary mr-2" onClick={handleOverlaySubmit}>
            Apply
          </button>
          {customOverlayUrl && (
            <button className="btn btn-danger" onClick={onRemoveMask}>
              Remove Mask
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaskModal;
