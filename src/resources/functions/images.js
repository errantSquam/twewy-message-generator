import React, { useEffect, useState, useRef } from 'react';
import { importAll, ImageCropper } from './imageManip';
import Select from 'react-select';
import { toPng } from 'html-to-image';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { height, divCoefficient, width } from './magicNum';



export const CharaImage = ({ imagePath, xOffset, heightCoefficient, flip = false, top = false, invisible = false }) => {
    if (heightCoefficient === undefined) {
      heightCoefficient = 0.85
    }
    if (xOffset === undefined) {
        xOffset = 0
      }
    return <div className="self-center" style={{
      marginTop: height * (1 - heightCoefficient) + 1,
      zIndex: top ? 5 : 4,
      transform: flip ? `rotateY(180deg)` : ``,
      opacity: invisible ? "0" : "1"
      // translate(${xOffset}px)
    }}>
      <ImageCropper
        imagePath={imagePath}
        leftRight={[0, 0]}
        topBottom={[0, 0]}
        newHeight={height * heightCoefficient}
        newCropWidth = {true}
      />
    </div>
  }


export const DialogueBubble = ({ imagePath, text, flip = false, top = false, invisible = false }) => {
    return <div className="flex items-center justify-center" style={{ zIndex: top ? 6 : 3 }}>
  
      <div className="absolute items-center text-center text-black"
        style={{
          WebkitTextStrokeWidth: "0.5px", zIndex: 20, whiteSpace: "pre-line",
          fontSize: "20px"
        }} >
        {invisible ? "" : text}
      </div>
      <div style={{ transform: flip ? "rotateY(180deg)" : "" , 
      filter: flip ? "drop-shadow(-0.4rem 0.4rem black)" : "drop-shadow(0.4rem 0.4rem black)", 
      opacity: invisible ? "0" : "1"
      }}>
        <ImageCropper
          imagePath={imagePath}
          leftRight={[0, 0]}
          topBottom={[0, 0]}
          newHeight={height / 2.3}
        />
      </div>
    </div>
  }


export const CroppedBackground = ({ BG }) => {
    const bgs = importAll(require.context('../images/bg', false, /\.jpg/))
  
    return <ImageCropper
      key={BG}
      imagePath={bgs[BG]}
      leftRight={[0, 760]}
      topBottom={[0, 0]}
      newWidth={width}
      newHeight={height}
    />
  }
  