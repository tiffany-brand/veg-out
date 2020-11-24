import React from 'react';
// import React, { useState, useEffect } from 'react';
import BunnyFrameOne from "./BunnyFrames/BunnyFrameOne";
import BunnyFrameTwo from "./BunnyFrames/BunnyFrameTwo";
import BunnyFrameThree from "./BunnyFrames/BunnyFrameThree";
import BunnyFrameFour from "./BunnyFrames/BunnyFrameFour";

export default function Bunny() {

    let ths = true;
    let testText;
    if (ths === true) {
      testText = <BunnyFrameOne />;
    }
    return (
      <>{testText}</>
    );
  }

//   const Bunny: React.FC<{}> = () => {
  
//     // let animationArrays = [<BunnyFrameOne />, <BunnyFrameTwo />, <BunnyFrameThree />, <BunnyFrameFour />];

//     // const [seconds, setSeconds] = useState(0);
//     const [frameList, setFrameList] = useState([]);

//     useEffect(() => {
//       const interval = setInterval(() => {
//         setSeconds(seconds => seconds + 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     }, []);

//     return (
//       <>
//         {seconds}
//       </>
//     );
//   }

// export default Bunny;