import { useState, useRef, useEffect } from "react";
import "../styles/auth.css";
import Logo from "../components/Logo";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function FoodPartnerAddListing() {
  const [fileName, setFileName] = useState("No file chosen");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const fileRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const file = fileRef.current?.files[0];

    if (!file) {
      alert("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("video", file);

    try {
      setUploading(true);
      setProgress(0);
      setStatusMessage("Uploading...");

      const res = await axios.post(
        "http://localhost:3000/api/food/",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (
              !progressEvent.lengthComputable &&
              progressEvent.total == null
            ) {
              // some browsers may not provide total size
              return;
            }
            const total =
              progressEvent.total || progressEvent.nativeEvent?.total || 0;
            const percent = total
              ? Math.round((progressEvent.loaded * 100) / total)
              : 0;
            setProgress(percent);
          },
        }
      );

      setProgress(100);
      setStatusMessage("Listing added successfully");

      // small delay so user sees success
      setTimeout(() => {
        setUploading(false);
        navigate("/foodmato");
      }, 800);
    } catch (error) {
      setUploading(false);
      setStatusMessage("");
      alert(
        "Error uploading file: " +
          (error?.response?.data?.message || error.message)
      );
    }
  };

  function onFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setFileName(f.name);
      const url = URL.createObjectURL(f);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } else {
      clearFile();
    }
  }

  function clearFile() {
    setFileName("No file chosen");
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && f.type.startsWith("video/")) {
      setFileName(f.name);
      const url = URL.createObjectURL(f);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      if (fileRef.current) fileRef.current.files = e.dataTransfer.files;
    }
  }

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <main className="auth-root">
      <div style={{ position: "absolute", left: 20, top: 20 }}>
        <Logo size={28} />
      </div>
      {uploading ? (
        <div className="upload-overlay" role="status" aria-live="polite">
          <div className="upload-card">
            <div className="upload-title">
              {statusMessage || "Uploading..."}
            </div>
            <div className="upload-progress">
              <div className="upload-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="upload-percent">{progress}%</div>
          </div>
        </div>
      ) : null}
      <form
        className="card auth-card"
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Add new food listing"
      >
        <h2 className="title">Add new food listing</h2>
        <p className="muted">
          Create a short listing for customers to discover.
        </p>

        <div className="grid">
          <label className="field">
            <span>Title</span>
            <input
              type="text"
              name="title"
              {...register("title", { required: true })}
              placeholder="Ex: Butter Chicken"
            />
          </label>

          <div className="field">
            <span>Video</span>
            <div
              className={`file-drop ${dragActive ? "dragover" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileRef}
                id="videoFile"
                type="file"
                name="video"
                accept="video/*"
                onChange={onFileChange}
              />

              {previewUrl ? (
                <div className="file-preview">
                  <video
                    src={previewUrl}
                    playsInline
                    muted
                    loop
                    controls={false}
                  />
                </div>
              ) : (
                <div className="file-empty">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 3v4M8 3v4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 11l5 4 5-4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="file-empty-text">
                    Drag & drop a short video here, or
                  </div>
                  <label htmlFor="videoFile" className="file-choose">
                    Choose file
                  </label>
                </div>
              )}
            </div>

            <div className="file-meta">
              <div className="file-name">{fileName}</div>
              <div className="file-actions">
                {previewUrl ? (
                  <button type="button" className="btn" onClick={clearFile}>
                    Remove
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <label className="field" style={{ marginTop: 10 }}>
          <span>Description</span>
          <textarea
            {...register("description", { required: true })}
            name="description"
            placeholder="Short tasty description"
            rows={4}
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text)",
            }}
          />
        </label>

        <div className="actions">
          <input type="submit" className="btn primary" value={"Upload"} />
        </div>
      </form>
    </main>
  );
}
