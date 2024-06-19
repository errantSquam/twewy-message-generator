import logo from './resources/images/twewy logo.png';
import UIFrame from './resources/images/UI_Frame_full.png';
import kofi from "./resources/images/kofi.png"
import fatstacks from "./resources/images/fat stacks.png"

import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { importAll, ImageCropper } from './resources/functions/imageManip';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { toPng } from 'html-to-image';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { height, divCoefficient, width } from './resources/functions/magicNum';
import { CharaImage, DialogueBubble, CroppedBackground } from './resources/functions/images';
import Modal from 'react-modal';
import { handleCharacterUpdate, handleDialogueFlip, handleDialogueBubble, handleEnable } from './resources/functions/updateHandlers';


function numZeroPadding(number) {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
}


const chara = importAll(require.context('./resources/images/chara', false, /\.png/))
const bubbles = importAll(require.context('./resources/images/bubbles', false, /\.png/))




const bgNames = {
  "Event_BG_ce001_01": [...Array(13).keys()]
    .map((num) => (`Event_BG_ce001_01_a${numZeroPadding(num + 1)}.jpg`)),
  "Event_BG_ce002_01": [...Array(13).keys()]
    .map((num) => (`Event_BG_ce002_01_a${numZeroPadding(num + 1)}.jpg`)),
  "Event_BG_ce003_01": [...Array(13).keys()]
    .map((num) => (`Event_BG_ce003_01_a${numZeroPadding(num + 1)}.jpg`)),
  "Event_BG_shxxx_01": [...Array(15).keys()]
    .map((num) => (`Event_BG_sh0${numZeroPadding(num + 1)}_01.jpg`)),
  "Event_BG_noxxx_01": [...Array(10).keys()]
    .map((num) => (`Event_BG_no0${numZeroPadding(num + 1)}_01.jpg`)),
  "Event_BG_wexxx_01": [...Array(5).keys()]
    .map((num) => (`Event_BG_we0${numZeroPadding(num + 1)}_01.jpg`)),
  "Event_BG_eaxxx_01": [...Array(3).keys()]
    .map((num) => (`Event_BG_ea0${numZeroPadding(num + 1)}_01.jpg`)),
  "Event_BG_evxxx_01": [...Array(5).keys()]
    .map((num) => (`Event_BG_ev0${numZeroPadding(num + 1)}_01.jpg`)),
  "Event_BG_exxxx_01": [...Array(6).keys()]
    .map((num) => (`Event_BG_ex0${numZeroPadding(num + 1)}_01.jpg`)),
  "Event_BG_ex102_01": ["Event_BG_ex102_01.jpg"],
  "Event_BG_ex106_01": ["Event_BG_ex106_01.jpg"],
  "Event_BG_ex415": ["Event_BG_ex415.jpg"],
}

const charaData = {

  "neku": {

    xOffset: {
      "back": "-space-x-20",
      "front": {
        "left": "-ml-0",
        "right": "-mr-0"
      }
    },
    expressions: 13,
    offsetOverride: {
      1: {
        "front": {
          "left": "-ml-0",
          "right": "-mr-0"
        },
        "back": "-space-x-32"
      },
      7: {
        "front": {
          "left": "-ml-24",
          "right": "-mr-24"
        },
        "back": "-space-x-32"
      }
    }
  },
  "shiki": {
    expressions: 18
  },
  "joshua": {
    expressions: 23,
    xOffset: {
      "back": "-space-x-32",
      "front": {
        "left": "-ml-0",
        "right": "-mr-0"
      }
    },
  },
  "rhyme": {
    expressions: 5,
    height: 0.7733333
  },
  "beat": {
    expressions: 16,

  },
  "beat (rhyme)": {
    expressions: 10,

  },
  "hanekoma": {
    expressions: 7,

  },
  "kariya": {
    xOffset: {
      "front": {
        "left": "-ml-24",
        "right": "-mr-24"
      },
      "back": "-space-x-48",
    },
    expressions: 10,
    height: 0.95,
    offsetOverride: {
      5: {
        "front": {
          "left": "-ml-0",
          "right": "-mr-0"
        },
        "back": "-space-x-20"
      }
    }
  },
  "uzuki": {
    xOffset: {
      "front": {
        "left": "-ml-24",
        "right": "-mr-24"
      },
      "back": "-space-x-48",
    },
    expressions: 12,
    height: 0.90
  },
  "sho": {
    xOffset: {
      "back": "-space-x-32",
      "front": {
        "left": "-ml-0",
        "right": "-mr-0"
      },
    },
    expressions: 9,
    height: 0.95,
    offsetOverride: {
      2: {
        "front": {
          "left": "-ml-24",
          "right": "-mr-24"
        },
        "back": "-space-x-48",
      },
      5: {
        "front": {
          "left": "-ml-24",
          "right": "-mr-24"
        },
        "back": "-space-x-48",
      },
      6: {
        "front": {
          "left": "-ml-24",
          "right": "-mr-24"
        },
        "back": "-space-x-48",
      },

    }
  },
  "sho (corrupted)": {
    xOffset: {
      "back": "-space-x-32",
      "front": {
        "left": "-ml-0",
        "right": "-mr-0"
      },
    },
    expressions: 6,
    height: 0.95,

  },

  "higashizawa": {
    expressions: 5,
    height: 1,
    xOffset: {
      "back": "-space-x-80",
      "front": {
        "left": "-ml-32",
        "right": "-mr-32"
      },
    },
  },
  "kitanji": {
    expressions: 8,
    height: 0.9

  },
  "konishi": {
    expressions: 8,
    height: 0.9
  },
  "mina": {
    expressions: 8,


  },
  "triple seven": {
    expressions: 6,
  },
  "triple seven (reaper)": {
    expressions: 7,
    xOffset: {
      "back": "-space-x-24",
      "front": {
        "left": "-ml-12",
        "right": "-mr-12"
      },
    }
  },  
  "support reaper": {
    expressions: 1,
  },
  "review reaper": {
    expressions: 1,
    xOffset: {
      "back": "-space-x-24",
      "front": {
        "left": "-ml-12",
        "right": "-mr-12"
      },
    }
  },  
  "purple reaper": {
    expressions: 1,
    xOffset: {
      "back": "-space-x-24",
      "front": {
        "left": "-ml-12",
        "right": "-mr-12"
      },
    }
  },
  "composer": {
    expressions: 1,
  },
  "eiji": {
    expressions: 7,
  },
  "futoshi": {
    expressions: 7,
  },
  "yammer": {
    expressions: 4,
  },
  "shooter": {
    expressions: 7,
    xOffset: {
      "back": "-space-x-24",
      "front": {
        "left": "-ml-12",
        "right": "-mr-12"
      },
    },

  },
  "pin prof": {
    expressions: 3,
    height: 0.9
  },
  "vice wizard of slam": {
    expressions: 3,
    height: 0.9
  },
  "wizard of slam": {
    expressions: 6,
    height: 0.9
  },
  "sota": {
    expressions: 6,
  },
  "ken": {
    expressions: 7,
  },
  "makoto": {
    expressions: 7,
  },
  "makoto w2": {
    expressions: 6,
  },  
  "nao": {
    expressions: 6,
  },
  "shrimp": {
    expressions: 7,
  },
  "coco": {
    expressions: 22,
    height: 0.7

  },
  "ordell": {
    expressions: 1,
    height: 0.95,
    xOffset: {
      "front": {
        "left": "-ml-32",
        "right": "-mr-32"
      },
      "back": "-space-x-48",
    },
  },
  "chuji": {
    expressions: 1,
    xOffset: {
      "back": "-space-x-32",
      "front": {
        "left": "-ml-0",
        "right": "-mr-0"
      }
    },
  },
  "erian": {
    expressions: 1,
    xOffset: {
      "back": "-space-x-32",
      "front": {
        "left": "-ml-4",
        "right": "-mr-4"
      }
    },
  },
}



const CharaEdit = ({ title, charaType, dialogueSettings, setDialogueSettings }) => {
  return <>
    <div className="text-md">
      <input type="checkbox"

        checked={dialogueSettings[charaType].enabled}
        onChange={(e) => {
          handleEnable(charaType, e.target.checked,
            dialogueSettings, setDialogueSettings)
        }}
      />
      <b> {title} </b>

    </div>
    {
      dialogueSettings[charaType].enabled &&
      <div className="flex flex-row">
        <CreatableSelect
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          menuPlacement="top"
          className="text-black self-start text-md w-56 capitalize overflow-visible"
          value={{ value: dialogueSettings[charaType].name, label: dialogueSettings[charaType].name }}
          options={Object.keys(charaData).filter(key => (key !== "ordell" && key !== "chuji" && key != "erian"))
            .map((key) => ({ value: key, label: <div className="capitalize">{key}</div> }))}
          onChange={(e) => {

            handleCharacterUpdate(charaData, charaType, e.value, dialogueSettings, setDialogueSettings)

          }}
        />
        <Select
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          menuPlacement="top"
          className="text-black self-start text-md w-56"
          value={{ value: dialogueSettings[charaType].expression, label: `Face ${dialogueSettings[charaType].expression}` }}
          options={[...Array(
            charaData[dialogueSettings[charaType].name].expressions
          ).keys()].map((key) => ({ value: key + 1, label: `Face ${key + 1}` }))}
          onChange={(e) => {
            var tempDialogueSettings = { ...dialogueSettings }
            tempDialogueSettings[charaType].expression = e.value
            setDialogueSettings(tempDialogueSettings)


          }}
        />
      </div>
    }
  </>
}



const TwewyCanvas = ({ BG, dialogueSettings, isCapture = false }) => {

  const getOffset = (offsetType, charaType, direction = "left") => {

    if (dialogueSettings[charaType].enabled === false) {
      if (charaType == "CLeftFore") {
        if ((dialogueSettings["CRightFore"].enabled || dialogueSettings["CRightBack"].enabled)
          && !dialogueSettings["CLeftBack"].enabled) {
          if (dialogueSettings["CRightFore"].enabled) {
            charaType = "CRightFore"
          } else {
            charaType = "CRightBack"
          }
        }
      }
      else if (offsetType == "front") {
        return direction === "left" ? "-ml-0" : "-mr-0"
      } else {
        return "-space-x-20"
      }
    }

    if (charaData[dialogueSettings[charaType].name].xOffset === undefined) {
      if (offsetType == "front") {

        return direction === "left" ? "-ml-0" : "-mr-0"
      } else {
        return "-space-x-20"
      }
    }

    var newOffset = charaData[dialogueSettings[charaType].name].xOffset[offsetType]

    if (charaData[dialogueSettings[charaType].name].offsetOverride !== undefined) {

      if (Object.keys(charaData[dialogueSettings[charaType].name].offsetOverride)
        .includes(dialogueSettings[charaType].expression.toString())) {
        newOffset = charaData[dialogueSettings[charaType].name].offsetOverride[dialogueSettings[charaType].expression][offsetType]
      }
    }

    if (offsetType == "front") {
      newOffset = newOffset[direction]
    }
    return newOffset
  }

  const getEnabledRight = () => {
    if (dialogueSettings["CRightFore"].enabled) {
      return "CRightFore"
    } else {
      return "CRightBack"
    }
  }

  return <div className="bg-black" key={dialogueSettings} >

    <div className="absolute" style={{
      minWidth: `${width}px`, width: `${width}px`,
      maxHeight: height,
    }}>
      <div className="flex flex-col justify-center -space-y-10 mt-4">


        <DialogueBubble
          imagePath={bubbles[`${dialogueSettings["Dialogue1"].type}.png`]}
          text={dialogueSettings["Dialogue1"].text}
          flip={dialogueSettings["Dialogue1"].flip}
          invisible={!dialogueSettings["Dialogue1"].enabled}
        />

        {dialogueSettings["Dialogue2"].enabled &&

          <DialogueBubble
            imagePath={bubbles[`${dialogueSettings["Dialogue2"].type}.png`]}
            text={dialogueSettings["Dialogue2"].text}
            flip={dialogueSettings["Dialogue2"].flip}
            top={true}
          />
        }
      </div>
    </div>

    <div className="absolute overflow-hidden" style={{
      minWidth: `${width}px`, width: `${width}px`
    }}>
      <div className={"flex flex-row justify-between -mx-4"} >

        {/*note: try changing to absolute instead of -space-x-20*/}
        <div className={`flex flex-row self-center ${getOffset("front", "CLeftFore", "left")} ${getOffset("back", "CLeftBack")}`}>

          {dialogueSettings["CLeftFore"].enabled ?
            <CharaImage imagePath={chara[`${dialogueSettings["CLeftFore"].name}${dialogueSettings.CLeftFore.expression}.png`]}
              heightCoefficient={charaData[dialogueSettings["CLeftFore"].name].height}
              flip={true}
              top={true} /> :

            ((dialogueSettings["CRightFore"].enabled || dialogueSettings["CRightBack"].enabled)
              && !dialogueSettings["CLeftBack"].enabled) &&
            <CharaImage imagePath={chara[`${dialogueSettings[getEnabledRight()].name}${dialogueSettings.CLeftFore.expression}.png`]}
              heightCoefficient={charaData[dialogueSettings[getEnabledRight()].name].height}
              flip={true}
              top={true}
              invisible={true} />

          }

          {dialogueSettings["CLeftBack"].enabled &&
            <CharaImage imagePath={chara[`${dialogueSettings["CLeftBack"].name}${dialogueSettings.CLeftBack.expression}.png`]}
              heightCoefficient={charaData[dialogueSettings["CLeftBack"].name].height}
              flip={true}
            />
          }
        </div>
        <div className={`flex flex-row self-center ${getOffset("front", "CRightFore", "right")} ${getOffset("back", "CRightBack")} `}>
          {
            dialogueSettings["CRightBack"].enabled &&

            <CharaImage imagePath={chara[`${dialogueSettings["CRightBack"].name}${dialogueSettings.CRightBack.expression}.png`]}
              heightCoefficient={charaData[dialogueSettings["CRightBack"].name].height}
              flip={false}
            />
          }
          {dialogueSettings["CRightFore"].enabled &&

            <CharaImage imagePath={chara[`${dialogueSettings["CRightFore"].name}${dialogueSettings.CRightFore.expression}.png`]}
              heightCoefficient={charaData[dialogueSettings["CRightFore"].name].height}
              flip={false}
              top={true} />
          }
        </div>

      </div>
    </div>

    <CroppedBackground BG={BG} />
  </div>
}


const AccordionCategory = ({ title, children }) => {
  return <AccordionItem allowZeroExpanded={true}>
    <AccordionItemHeading >
      <AccordionItemButton >
        <div className="text-center py-2 pb-3 uppercase text-md"
          style={{
            userSelect: "none",
            textShadow: "-1px -1px 1px #363636",
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 2%, rgba(180,180,180,1) 3%, rgba(115,115,115,1) 41%, rgba(99,99,99,1) 46%, rgba(111,111,111,1) 60%, rgba(141,141,141,1) 86%, rgba(176,176,176,1) 100%)",

            boxShadow: "inset -3px -3px #363636, inset 2px 2px white"
          }}>
          <b>{title}</b>
        </div>
      </AccordionItemButton>
    </AccordionItemHeading>
    <AccordionItemPanel>
      <div className="bg-slate-900 px-2 py-3 border-2 border-slate-500 overflow-y-auto"
        style={{ maxHeight: height / 2 }}>
        {children}
      </div>
    </AccordionItemPanel>
  </AccordionItem>
}


const isMoreThanTwo = (dialogueSettings) => {
  var temp = 0
  if (dialogueSettings["CLeftFore"].enabled) {
    temp += 1
  }
  if (dialogueSettings["CRightFore"].enabled) {
    temp += 1
  }
  if (dialogueSettings["CLeftBack"].enabled) {
    temp += 1
  }
  if (dialogueSettings["CRightBack"].enabled) {
    temp += 1
  }
  return temp > 2
}


const DialogueOption = ({ title, dialogueType, dialogueSettings, setDialogueSettings }) => {
  const customControlStyles = base => ({
    ...base,
    height: 25,
    minHeight: 25,
    minwidth:25,
})
  return <>
    <div className="flex flex-col">
      <b> {title} </b>
      <div className = "flex flex-row space-x-1 items-center">
        <div>
        <input type="checkbox"
          onChange={(e) => {
            handleDialogueFlip(dialogueType, e.target.checked,
              dialogueSettings, setDialogueSettings)
          }}
        /> Flip
        </div> 
        <div>
        <input type="checkbox"
          checked={dialogueSettings[dialogueType].enabled}
          onChange={(e) => {
            handleEnable(dialogueType, e.target.checked,
              dialogueSettings, setDialogueSettings)
          }}
        /> Enable
        </div>
        
        <div className = "flex flex-row space-x-1 text-xs items-center pl-2">
        {["default", "thought", "wiggly", "loud"].map( key => (
        <div key = {key} className = {dialogueSettings[dialogueType].type === key && "bg-blue-500 px-0.5 py-0.5" }
        style = {{cursor: "pointer"}}>
        <img src = {bubbles[`${key}.png`]} style = {{width: 15, height: 15}}
        onClick = {() => {handleDialogueBubble(dialogueType, key, dialogueSettings, setDialogueSettings)}}
        />
        </div>))
        }
        </div>
      </div>
    </div>
    <textarea name={dialogueType}
      className="text-black px-1 py-1"
      value={dialogueSettings[dialogueType].text}
      onChange={(e) => {

        var tempDialogueSettings = { ...dialogueSettings }
        tempDialogueSettings[dialogueType].text = e.target.value
        setDialogueSettings(tempDialogueSettings)

      }} /></>
}

function App() {
  const [currBG, setCurrBG] = useState(Object.keys(bgNames)[0])
  const [currSubBG, setCurrSubBG] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const imageRef = useRef(null)
  const [dialogueSettings, setDialogueSettings] = useState({
    "Dialogue1": {
      enabled: true,
      text: "rhyme army",
      type: "default",
      flip: false
    },
    "Dialogue2": {
      enabled: true,
      text: "rhyme army",
      type: "default",
      flip: false
    },

    "CLeftFore": {
      enabled: true,
      name: "rhyme",
      expression: 1
    },
    "CLeftBack": {
      enabled: false,
      name: "rhyme",
      expression: 1
    },
    "CRightFore": {
      enabled: true,
      name: "rhyme",
      expression: 1
    },
    "CRightBack": {
      enabled: false,
      name: "rhyme",
      expression: 1
    },

  })

  const htmlToImageConvert = () => {
    toPng(imageRef.current, { cacheBust: false, skipAutoScale: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "TWEWY_Screencap.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    < >

      <Modal
        isOpen={modalOpen}
        contentLabel="Fat Stacks"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',

          },
          overlay: {
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }
        }}
        onRequestClose={() => setModalOpen(false)}
        shouldCloseOnOverlayClick={true}
      >
        <div className=" flex items-center">
          <img src={fatstacks} />
        </div>
      </Modal>

      <body className="bg-slate-800 text-white min-h-screen overflow-auto flex flex-col flex-nowrap m-0 p-0"
        style={{ height: "100%" }}>

        <div className="text-white font-newCez" style={{ height: height }}>

          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center space-x-10">
              <img src={logo} alt="TWEWY Logo" className="h-24" />
              <div>
                <b> Message Generator</b>
                <div className="text-xs flex flex-row items-center" >
                  <p>by&nbsp;
                    <a href="https://ko-fi.com/errantsquam" target="_blank"
                      onClick={() => (setModalOpen(true))}
                    ><b className="text-yellow-100">Errant</b>&nbsp;

                      <img src={kofi} width="15" height="15" style={{ display: "inline" }} /></a>
                    <i className="text-slate-500"></i></p> </div>
              </div>
            </div>
            <div className = "flex text-center items-center my-2 bg-slate-700">
              &nbsp;Sorry for the domain change! I had to update my Github username. Please consider donating to support :)&nbsp;
            </div>
            <div className="flex flex-row space-x-3" style={{ height: height }} >

              <div className = "relative">
                <div style={{ minWidth: `${width}px`, width: `${width}px` }} />

                <div className="absolute">
                  <div ref={imageRef} >
                    <TwewyCanvas BG={bgNames[currBG][currSubBG]} isCapture={true}
                      dialogueSettings={dialogueSettings} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-72 space-y-2"

              >
                <Accordion allowZeroExpanded={true}>
                  <div className="flex flex-col space-y-2">
                    <AccordionCategory title="Background">
                      <div className="text-md">
                        <b> Background </b>
                        <Select
                          menuPortalTarget={document.body}
                          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                          className="text-black self-start text-md"
                          value={{ value: currBG, label: currBG }}
                          options={Object.keys(bgNames).map((key) => ({ value: key, label: key }))}
                          onChange={(e) => { setCurrBG(e.value); setCurrSubBG(0) }}
                        />
                        {
                          bgNames[currBG].length > 1 &&
                          <>
                            <b> Background Subtype </b>
                            <Select
                              menuPortalTarget={document.body}
                              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                              className="text-black self-start text-md"
                              value={{ value: currSubBG, label: currSubBG + 1 }}
                              options={([...Array(bgNames[currBG].length).keys()]).map((key) => ({ value: key, label: key + 1 }))}
                              onChange={(e) => { setCurrSubBG(e.value) }}
                            />
                          </>
                        }
                        {/*<input type="checkbox"
                              onChange={(e) => {
                                handleDialogueFlip("Dialogue1", e.target.checked,
                                  dialogueSettings, setDialogueSettings)
                              }}
                            /> Dark Overlay*/}
                      </div>
                    </AccordionCategory>

                    <AccordionCategory title="Dialogue">
                      <div className="flex flex-col text-md space-y-1">


                        <DialogueOption
                          title="Dialogue Bubble (Back)"
                          dialogueType="Dialogue1"
                          dialogueSettings={dialogueSettings}
                          setDialogueSettings={setDialogueSettings}
                        />
                        <DialogueOption
                          title="Dialogue Bubble (Front)"
                          dialogueType="Dialogue2"
                          dialogueSettings={dialogueSettings}
                          setDialogueSettings={setDialogueSettings}
                        />
                      </div>

                    </AccordionCategory>

                    <AccordionCategory title="Character Settings">
                      <div className="flex flex-col space-y-2">
                        {
                          isMoreThanTwo(dialogueSettings) &&
                          <div className="text-xs">Note: Having more than two characters
                            may result in strange alignment issues.</div>
                        }
                        <CharaEdit title="Character (L) (Front)"
                          charaType="CLeftFore"
                          dialogueSettings={dialogueSettings}
                          setDialogueSettings={setDialogueSettings} />
                        <CharaEdit title="Character (L) (Back)"
                          charaType="CLeftBack"
                          dialogueSettings={dialogueSettings}
                          setDialogueSettings={setDialogueSettings} />
                        <CharaEdit title="Character (R) (Front)"
                          charaType="CRightFore"
                          dialogueSettings={dialogueSettings}
                          setDialogueSettings={setDialogueSettings} />
                        <CharaEdit title="Character (R) (Back)"
                          charaType="CRightBack"
                          dialogueSettings={dialogueSettings}
                          setDialogueSettings={setDialogueSettings} />
                      </div>
                    </AccordionCategory>
                  </div>
                </Accordion>
                <button
                  className="text-center py-2 pb-3 uppercase text-md"
                  style={{
                    userSelect: "none",
                    textShadow: "-1px -1px 1px #660202",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 2%, rgba(255,90,90,1) 3%, rgba(166,39,39,1) 41%, rgba(139,9,9,1) 46%, rgba(174,25,25,1) 60%, rgba(220,60,60,1) 86%, rgba(255,78,78,1) 100%)",
                    boxShadow: "inset -3px -3px #660202, inset 2px 2px white"
                  }}
                  onClick={() => htmlToImageConvert()}
                > <b>Save!</b> </button>
              </div>
            </div>
            <div className="text-xs text-slate-400 w-full text-center py-10">
              <i>Have feedback? <a href="https://github.com/eLTehh/twewy-message-generator/issues" target="_blank" className="text-white"> Send it here.</a>
                &nbsp;Want to support me? <a href="https://ko-fi.com/elteh" target="_blank"
                  onClick={() => (setModalOpen(true))}
                  className='text-white'>Click here.</a></i>
              <br /> <br />
              <i>Thank you to Livi (AnonymusAxolotl) for helping me crop the character portraits.</i>
              <br /> <br />
              <i>The World Ends With You belongs to Square Enix.</i>

            </div>

          </div>

        </div>


      </body>
    </>
  );
}

export default App;
