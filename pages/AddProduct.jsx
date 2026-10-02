import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, Cloud, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import UploadBox from "../components/product/UploadBox";
import ImagePreview from "../components/product/ImagePreview";
import ProductForm from "../components/product/ProductForm";
import LoadingState from "../components/common/LoadingState";
import {
  uploadToCloudinary,
  getOptimizedImageUrl,
  getStyleEnhancedImageUrl,
} from "../services/cloudinary";

import { addProduct } from "../utils/storage";

const AddProduct = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [cloudinaryData, setCloudinaryData] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
const [uploadComplete, setUploadComplete] = useState(false);
const [enhanced, setEnhanced] = useState(false);

const [enhancementStyle, setEnhancementStyle] = useState("clean");
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const handleFileSelect = async (selectedFile) => {
  setFile(selectedFile);

  const localUrl = URL.createObjectURL(selectedFile);

  setImagePreview(localUrl);
  setOriginalImage(localUrl);
  setEnhanced(false);
  setUploadComplete(false);

  setUploading(true);

  try {
    const result = await uploadToCloudinary(selectedFile);

    setCloudinaryData(result);
    setImagePreview(result.secureUrl);
    setOriginalImage(result.secureUrl);
    setUploadComplete(true);
  } catch (error) {
    console.error(error);

    alert(error.message);

    setFile(null);
    setImagePreview("");
    setOriginalImage("");
    setCloudinaryData(null);
  } finally {
    setUploading(false);
  }
};

 const handleEnhance = async () => {
  if (!cloudinaryData?.publicId) {
    alert("Please upload a product image first.");
    return;
  }

  setEnhancing(true);

  try {
    const enhancedUrl = getOptimizedImageUrl(
      cloudinaryData.publicId,
      900,
      900
    );


    
    // Give Cloudinary time to generate the AI transformation
    let imageReady = false;

    for (let attempt = 0; attempt < 8; attempt++) {
      try {
        const response = await fetch(enhancedUrl, {
          method: "HEAD",
        });

        if (response.ok) {
          imageReady = true;
          break;
        }
      } catch (error) {
        console.log("Waiting for Cloudinary processing...");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (!imageReady) {
      throw new Error(
        "Cloudinary is still processing the image. Please try Enhance again in a few seconds."
      );
    }

    setImagePreview(enhancedUrl);
    setEnhanced(true);
  } catch (error) {
    console.error(error);
    alert(error.message || "Unable to enhance the image.");
  } finally {
    setEnhancing(false);
  }
};

const removeImage = () => {
  setFile(null);
  setImagePreview("");
  setOriginalImage("");
  setCloudinaryData(null);
  setUploadComplete(false);
  setEnhanced(false);
  setEnhancementStyle("clean");
};

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!cloudinaryData) {
      alert("Please upload a product image first.");
      return;
    }

    const product = addProduct({
      name: form.name,
      price: form.price,
      category: form.category,
      description: form.description,

      // Save the enhanced Cloudinary URL when available
      imageUrl: enhanced
        ? getOptimizedImageUrl(
            cloudinaryData.publicId,
            900,
            900
          )
        : cloudinaryData.secureUrl,

      publicId: cloudinaryData.publicId,
    });

    navigate("/preview", {
      state: {
        product,
      },
    });
  };

  return (
    <div className="page narrow-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={18} />
        Back
      </Link>

      <div className="page-heading">
        <span className="eyebrow">
          STEP 1 & 2
        </span>

        <h1>Add Product</h1>

        <p>
          Upload a product photo and let Cloudinary
          prepare it for your digital shop.
        </p>
      </div>

      <section className="add-product-layout">
        <div className="upload-section card">
          <div className="card-title">
            <div>
              <h2>Product Photo</h2>
              <p>
                A clear photo works best.
              </p>
            </div>

            <Cloud size={24} />
          </div>

          {!imagePreview && (
            <UploadBox
              onFileSelect={handleFileSelect}
              disabled={uploading}
            />
          )}

          {imagePreview && (
            <ImagePreview
              image={imagePreview}
              onRemove={removeImage}
            />
          )}

          {uploading && (
            <div className="cloudinary-processing">
              <LoadingState message="Uploading your product image to Cloudinary..." />

              <div className="processing-steps">
                <div className="processing-step">
                  <CheckCircle2 size={17} />
                  Uploading to Cloudinary
                </div>

                <div className="processing-step">
                  <CheckCircle2 size={17} />
                  Image received
                </div>

                <div className="processing-step">
                  <CheckCircle2 size={17} />
                  Ready to enhance
                </div>
              </div>
            </div>
          )}

          {uploadComplete && !uploading && !enhanced && (
            <>
              <div className="success-message">
                <CheckCircle2 size={18} />
                Image uploaded to Cloudinary.
              </div>

<div className="enhancement-studio">
  <div className="enhancement-heading">
    <Sparkles size={20} />
    <div>
      <h3>AI Enhancement Studio</h3>
      <p>Choose a look for your product.</p>
    </div>
  </div>

  <div className="enhancement-options">
    <button
      type="button"
      className={`enhancement-option ${
        enhancementStyle === "clean" ? "active" : ""
      }`}
      onClick={() => setEnhancementStyle("clean")}
    >
      <span>🛍️</span>
      <strong>Clean Catalog</strong>
      <small>Shop-ready</small>
    </button>

    <button
      type="button"
      className={`enhancement-option ${
        enhancementStyle === "pinterest" ? "active" : ""
      }`}
      onClick={() => setEnhancementStyle("pinterest")}
    >
      <span>📌</span>
      <strong>Pinterest Soft</strong>
      <small>Soft & aesthetic</small>
    </button>

    <button
      type="button"
      className={`enhancement-option ${
        enhancementStyle === "premium" ? "active" : ""
      }`}
      onClick={() => setEnhancementStyle("premium")}
    >
      <span>✨</span>
      <strong>Premium Studio</strong>
      <small>Clean & polished</small>
    </button>
  </div>
</div>
              <button
                type="button"
                className="button button-primary"
                onClick={handleEnhance}
                disabled={enhancing}
                style={{
                  width: "100%",
                  marginTop: "16px",
                }}
              >
                <Sparkles size={18} />

                {enhancing
                  ? "Enhancing with Cloudinary..."
                  : "Enhance with Cloudinary"}
              </button>
            </>
          )}

          {enhanced && !enhancing && (
            <div className="success-message">
              <CheckCircle2 size={18} />
              Image enhanced and optimized by Cloudinary.
            </div>
          )}

          {enhanced && (
            <div className="processing-steps">
              <div className="processing-step">
                <CheckCircle2 size={17} />
                Smart crop & resize
              </div>

              <div className="processing-step">
                <CheckCircle2 size={17} />
                Automatic image quality
              </div>

              <div className="processing-step">
                <CheckCircle2 size={17} />
                Automatic format delivery
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-title">
            <div>
              <h2>Product Details</h2>

              <p>
                Great! Now add your product information.
              </p>
            </div>
          </div>

          <ProductForm
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={false}
            buttonText="Create Product"
          />
        </div>
      </section>
    </div>
  );
};

export default AddProduct;