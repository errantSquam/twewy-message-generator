
export const handleCharacterUpdate = (charaData, charaType, newValue, dialogueSettings, setDialogueSettings) => {
    {
  
      if (!Object.keys(charaData).includes(newValue.toLowerCase())) {
        return
      }
      var tempDialogueSettings = { ...dialogueSettings }
      tempDialogueSettings[charaType].name = newValue.toLowerCase()
      tempDialogueSettings[charaType].expression = 1
      setDialogueSettings(tempDialogueSettings)
  
  
    }
  }
  
export const handleDialogueFlip = (dialogueType, newValue, dialogueSettings, setDialogueSettings) => {
    {
      var tempDialogueSettings = { ...dialogueSettings }
      tempDialogueSettings[dialogueType].flip = newValue
      setDialogueSettings(tempDialogueSettings)
  
  
    }
  }
export const handleDialogueBubble = (dialogueType, newValue, dialogueSettings, setDialogueSettings) => {
    {
      var tempDialogueSettings = { ...dialogueSettings }
      tempDialogueSettings[dialogueType].type = newValue
      setDialogueSettings(tempDialogueSettings)
  
  
    }
  }
  
  
export const handleEnable = (charaType, newValue, dialogueSettings, setDialogueSettings) => {
    {
      var tempDialogueSettings = { ...dialogueSettings }
      tempDialogueSettings[charaType].enabled = newValue
      setDialogueSettings(tempDialogueSettings)
  
  
    }
  }