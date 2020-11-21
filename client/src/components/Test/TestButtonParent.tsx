import * as React from 'react'
import { TestButton } from './TestButton'

export function TestButtonParent() {

  const clickTest = () =>  {
      console.log("clicked me");
  }
  
  return (
    <div style={{ height: "100%", display: "flex" }}>
        <div style={{ height: "40px", width: "40px" }} onMouseOver={clickTest}>
            <TestButton />
        </div>
    </div>
  )
}