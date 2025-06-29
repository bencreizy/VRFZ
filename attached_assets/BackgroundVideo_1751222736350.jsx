import React from "react";
import "./BackgroundVideo.css";

const BackgroundVideo = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted playsInline>
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay" />
    </div>
  );
};

export default BackgroundVideo;
