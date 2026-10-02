import { useRef } from "react";
import { Camera, UploadCloud } from "lucide-react";

const UploadBox = ({ onFileSelect, disabled = false }) => {
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10MB.");
      return;
    }

    onFileSelect(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (disabled) return;

    const file = event.dataTransfer.files?.[0];

    handleFile(file);
  };

  return (
    <div
      className={`upload-box ${disabled ? "upload-disabled" : ""}`}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        hidden
        disabled={disabled}
        onChange={(event) =>
          handleFile(event.target.files?.[0])
        }
      />

      <div className="upload-icon">
        <UploadCloud size={30} />
      </div>

      <h3>Upload Product Photo</h3>

      <p>
        Click to upload or drag & drop
      </p>

      <small>
        JPG, PNG up to 10MB
      </small>

      <div className="camera-hint">
        <Camera size={16} />
        Take a clear product photo
      </div>
    </div>
  );
};

export default UploadBox;