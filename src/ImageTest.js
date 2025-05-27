import React from "react";

const ImageTest = () => {
  const fileId = "1mVEJU8KndQ_Wv_aE-W3YOku2cUP-dmgV";
  const driveThumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}`;

  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: "#73fcd6" }}>
      <h1>Google Drive Thumbnail Test</h1>
      <img
        src={driveThumbnailUrl}
        alt="Test"
        style={{ width: "300px", border: "2px solid #73fcd6" }}
      />
    </div>
  );
};

export default ImageTest;
