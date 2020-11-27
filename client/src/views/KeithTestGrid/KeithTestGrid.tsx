import React, { useState, useEffect } from "react";
import './KeithTestGrid.css'


import IVeggies from "../../interfaces/IVeggies";

// Importing APIs
import veggieAPI from '../../utils/veggiesAPI';

const conditionallySort = <T,>(arr: T[], condition: boolean) => (
  condition ? arr : [...arr].sort(() => .5 - Math.random())
);

const SortedList: React.FC = () => {

  const [availablePlants, setAvailablePlants] = useState<IVeggies[]>([])

  const [sourceArray, setSourceArray] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    veggieAPI.getVeggies()
      .then((res) => {
        setAvailablePlants(res.data);
        console.log(res.data);

      }
      )
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSourceArray(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]);
  //   }, 350);
  // }, []);

  return (
    // <div className="component-style">
    //   <Grid item xs={12} container justify="space-around">
    //     <Grid item xs={8} sm={4}>
    //       <div className="veggie-box">Left Box</div>
    //     </Grid>
    //     <Grid item xs={8} sm={4}>
    //       <div className="veggie-box">Right Box</div>
    //     </Grid>
    //   </Grid>
    // </div>
    // <>
    //   <div className="component-style">
    //     <Grid item xs={6} container justify="space-around">
    //       <Grid item xs={8} sm={4}>
    //         <div className="veggie-box">Left Box</div>
    //       </Grid>
    //       <Grid item xs={8} sm={4}>
    //         <div className="veggie-box">Right Box</div>
    //       </Grid>
    //     </Grid>
    //   </div>
    // </>
  //   <>
  //     <Grid container justify="space-around" spacing={3} className="component-style">
  //       <Grid className="zero-out zero-out-top"  item xs={12} md={6}>
  //         <div className="dark-box">
  //           <h2 className="box-header">Your Stats</h2>
  //         </div>
  //       </Grid>
  //       <Grid className="zero-out zero-out-bottom" item xs={12} md={6}>
  //         <div className="dark-box">
  //           <h2 className="box-header">Log Veggies</h2>
  //         </div>
  //       </Grid>
  //     </Grid>
  //   </>
  // );

// }
    <div className="test-div">
      <input onChange={(e) => setInput(e.currentTarget.value)} value={input} placeholder="search" />
      {availablePlants.length
        ? <ul>
          {conditionallySort(availablePlants, !!input)
            .reduce<React.ReactElement[]>((acc, curr, idx) => {
              if (curr.plantName.includes(input) && acc.length < 5) {
                acc.push(<li key={idx}>{curr.plantName}</li>)
              }
              return acc;
            }, [])
          }
        </ul>
        : <div>Loading...</div>
      }
    </div>
  )
}
export default SortedList;
