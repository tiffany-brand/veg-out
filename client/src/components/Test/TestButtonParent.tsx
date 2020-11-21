import * as React from 'react'
// import { TestButton } from './TestButton';
// import { TestButton2 } from './TestButton2';
import TestButtonClass from './TestButtonClass';
import "./TestButtonParent.css";

// can affect css by style tag inside div 
// can affect css by linking style sheet & providing class names (preferred)

export function TestButtonParent() {

  // const clickTest = () =>  {
  //     console.log("clicked me");
  // }

  const imageWidth = "1000px";
  
  return (
    <div style={{ height: "100%", display: "flex" }}>
        <div 
        style={{ width: imageWidth }} 
        className="caterpillar-component">
            <TestButtonClass />
        </div>
    </div>
  )
}