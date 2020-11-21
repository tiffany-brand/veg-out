import * as React from 'react'
// import { TestButton } from './TestButton';
// import { TestButton2 } from './TestButton2';
import TestButtonClass from './TestButtonClass';

export function TestButtonParent() {

  const clickTest = () =>  {
      console.log("clicked me");
  }
  
  return (
    <div style={{ height: "100%", display: "flex" }}>
        <div style={{ height: "40px", width: "40px" }} onClick={clickTest}>
            <TestButtonClass />
        </div>
    </div>
  )
}