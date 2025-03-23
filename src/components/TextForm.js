import React, { useState } from 'react';


export default function TextForm(props) {
    const handleUpClick = () => {
        //  console.log("Uppercase was clicked" + text);
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Convert to uppercase !","success");
    }
    const handleLoClick = () => {
        //  console.log("Lowercase was clicked" + text);
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Convert to lowercase !","success");

    }
    const handleRemoveSpecial = () => {
        let newText = "";
        for (let i = 0; i < text.length; i++) {
          if (
            (text[i] >= "0" && text[i] <= "9") ||
            (text[i] >= "a" && text[i] <= "z") ||
            (text[i] >= "A" && text[i] <= "Z") ||
            text[i] === " "
          ) {
            newText += text[i];
          }
        }
        setText(newText)
        props.showAlert("Special Characters are Renoved!","success");
        };
        const handleRemoveNumber = () => {
            let newText = "";
            for (let i = 0; i < text.length; i++) {
              if ((text[i] >= "0" && text[i] <= "9") === 0) {
                newText += text[i];
              }
            }
            setText(newText)
            props.showAlert("Numbers are Removed!","success");
            };
    const handleSpeak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Asked to speak !","success");

      }
      const handleCapitalizeAfterFullStop = () => {
        let newText = text
          .split(".") // Split by full stop
          .map(segment =>
            segment.trim().charAt(0).toUpperCase() + segment.trim().slice(1)
          ) // Capitalize first letter of each segment
          .join(". "); // Rejoin with full stop and space
        setText(newText);
        props.showAlert("Convert to standard form !","success");

      };
      
    const handleExtraspaces =()=>{
        let newText=text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Remove extra spaces !","success");

    }
    const handleOnchange = (event) => {
        // console.log("On change");
        setText(event.target.value);
    }
    const [text, setText] = useState('Enter Text here');
    return (
        <>
            <div className="container"style={{color : props.mode==='dark'?'white':'#042743'}}>
                <h1>{props.heading}</h1>

                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnchange} style={{backgroundColor: props.mode==='light'?'white':'grey',color:props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8"></textarea>
                </div>
                <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                
                <button className="btn btn-primary mx-1 my-1" onClick={handleCapitalizeAfterFullStop} >Standard form</button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleExtraspaces} >Remove Extra spaces</button>
                <button className="btn btn-primary mx-1 my-1 " onClick={handleRemoveSpecial} >Remove Special character</button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleRemoveNumber} >Remove Numbers</button>
                <button className="btn btn-primary mx-1 my-1 " onClick={handleSpeak} >Speak</button>
            </div>
            <div className="container my-3"style={{color:props.mode==='dark'?'white':'#042743'}}>
                <h3>Your Text Summary</h3>
                <p>{text.split(/\s+/).filter((element)=>{return element.length !==0}).length}words and {text.length} characters</p>
            </div>
        </>
    )
}
