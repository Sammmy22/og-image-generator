"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Helmet } from "react-helmet";
import * as htmlToImage from "html-to-image";

export default function ImageDisplay() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve data from session storage
    const storedTitle = sessionStorage.getItem("title");
    const storedcontent = sessionStorage.getItem("content");
    const storedImage = sessionStorage.getItem("image");

    // Set state with retrieved data
    setTitle(storedTitle || "");
    setContent(storedcontent || "");
    setImage(storedImage);
  }, []);

  const downloadImage = () => {
    const node = document.getElementById("capture"); // Ensure the element has the ID 'capture'
    if (node) {
      htmlToImage
        .toPng(node)
        .then(function (dataUrl) {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "image.png"; // Specify the download filename
          link.click();
        })
        .catch(function (error) {
          console.error("Error generating image:", error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-16 display-font">
      <Helmet>
        <title>{title || "Default Title"}</title>
        <meta property="og:title" content={title || "Default Title"} />
        <meta
          property="og:content"
          content={content || "Default content for the content."}
        />
        <meta property="og:image" content={image || "/default-image.jpg"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/display" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Additional meta tags */}
      </Helmet>
      <div
        id="capture"
        className="bg-gradient-to-tr from-zinc-700 to-gray-900 rounded-lg shadow-md overflow-hidden w-[1200px] h-[630px] flex flex-col mb-4"
      >
        <div className="p-4">
          <div className="w-full flex justify-between items-center mb-4">
            <h5 className="text-xl text-white font-bold mb-2">{title}</h5>
            <Image src="/logo.png" width={50} height={50} alt="Logo" />
          </div>
          <p className="text-white mb-4">{content}</p>
        </div>
        <div className="flex justify-center items-center flex-grow">
          <div className="rounded-lg overflow-hidden w-[1150px] h-[400px]">
            {image && (
              <Image
                src={image}
                width={1150}
                height={400}
                alt="Uploaded image"
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={downloadImage}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Download Image
      </button>
    </div>
  );
}
