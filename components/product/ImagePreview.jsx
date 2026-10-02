import { X } from "lucide-react";

const ImagePreview = ({ image, onRemove }) => {
  if (!image) {
    return null;
  }

  return (
    <div className="image-preview">
      <img src={image} alt="Product preview" />

      <button
        type="button"
        className="remove-image"
        onClick={onRemove}
        aria-label="Remove image"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default ImagePreview;