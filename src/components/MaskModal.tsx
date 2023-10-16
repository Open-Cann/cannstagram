import React, { useState } from "react";
import InlineSVG from "react-inlinesvg";
import "./MaskModal.css"; // Import your CSS file for modal styles

const MaskModal = ({ isOpen, onApply, onRemoveMask, onClose }) => {
  const [customOverlayUrl, setCustomOverlayUrl] = useState("");
  const [error, setError] = useState(null);

  const handleOverlaySubmit = () => {
    // Validate the URL if needed
    if (customOverlayUrl) {
      const img = new Image();
      img.src = customOverlayUrl;
      img.onload = () => {
        onApply(customOverlayUrl);
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
