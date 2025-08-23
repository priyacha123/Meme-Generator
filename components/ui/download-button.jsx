"use client";
import { buttons } from "../../lib/constants";
import { ButtonsCard } from "../aceternity/buttons";

export function TailwindcssButtons({ href, topText, bottomText }) {
  const handleDownload = async () => {
    try {
      // Load the base image
      const img = new Image();
      img.crossOrigin = "anonymous"; // important for CORS
      img.src = href;

      img.onload = () => {
        // Create canvas with same size as image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0);

        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.textAlign = "center";
        ctx.font = `${canvas.width / 10}px Impact`;
        ctx.lineWidth = 5;

        if (topText) {
          ctx.fillText(topText.toUpperCase(), canvas.width / 2, 80);
          ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 80);
        }

        if (bottomText) {
          ctx.fillText(
            bottomText.toUpperCase(),
            canvas.width / 2,
            canvas.height - 40
          );
          ctx.strokeText(
            bottomText.toUpperCase(),
            canvas.width / 2,
            canvas.height - 40
          );
        }

        // Convert canvas to image and download
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "meme.jpg";
        link.click();
      };
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="pb-40 px-4 w-full">
      <div className="mt-5">
        {buttons.map((button, idx) => (
          <ButtonsCard key={idx}>
            {href ? (
              <button onClick={handleDownload} className="p-[3px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                  Download Meme
                </div>
              </button>
            ) : (
              button.component
            )}
          </ButtonsCard>
        ))}
      </div>
    </div>
  );
}

