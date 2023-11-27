import React, { useEffect, useRef } from 'react';
export function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }


export function ImageCropper({ imagePath, leftRight, topBottom, newWidth, newHeight, canvasHeight, newCropWidth = false }) {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
  
      const img = new Image();
      img.onload = function () {
        // Set canvas size as needed
        if (newWidth === undefined) {
            newWidth = newHeight / img.height * img.width
        }

        if (canvasHeight === undefined) {
            canvasHeight = newHeight
        }
        canvas.width = newWidth;
        canvas.height = canvasHeight;
  
        const cropLeft = leftRight[0];
        const cropTop = topBottom[0];
        const cropWidth = img.width - leftRight[0] - leftRight[1];
        const cropHeight = img.height - topBottom[0] - topBottom[1];

        if (newCropWidth) {
            newWidth = newHeight / img.height * cropWidth
        }
        ctx.drawImage(
          img,
          cropLeft, cropTop,
          cropWidth, cropHeight,
          0, 0,
          newWidth, newHeight
        );
      };
      img.src = imagePath;
  
    }, [imagePath, leftRight, topBottom, newWidth, newHeight]);
  
    return <canvas ref={canvasRef} />;
  }
  