import React from "react";
import { useState } from "react";
import { Check, Copy, Share2, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import Button from "../common/Button";
import { getShopLink } from "../../utils/helpers";

const ShareModal = ({ open, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!open) {
    return null;
  }

  const shopLink = getShopLink();

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shopLink);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      alert("Could not copy the link.");
    }
  };

  const shareShop = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "My DukaanSnap Shop",
        text: "Check out my digital product catalog.",
        url: shopLink,
      });
    } else {
      copyLink();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="share-modal">
        <button
          className="modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="share-icon">
          <Share2 size={24} />
        </div>

        <h2>Your shop is ready!</h2>

        <p>
          Share your digital catalog with your customers.
        </p>

        <div className="qr-wrapper">
          <QRCodeSVG
            value={shopLink}
            size={170}
            level="M"
          />
        </div>

        <div className="share-link">
          <span>{shopLink}</span>

          <button onClick={copyLink}>
            {copied ? (
              <Check size={18} />
            ) : (
              <Copy size={18} />
            )}
          </button>
        </div>

        <div className="share-actions">
          <Button
            variant="secondary"
            onClick={copyLink}
            fullWidth
          >
            <Copy size={17} />
            {copied ? "Copied!" : "Copy Link"}
          </Button>

          <Button
            onClick={shareShop}
            fullWidth
          >
            <Share2 size={17} />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;