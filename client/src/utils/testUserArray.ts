import userAPI from '../utils/userAPI';
import React from 'react';
import User from '../interfaces/ICurrentUser';
import {useStoreContext} from '../state/GlobalState';

export default function userArray(){

  const [state, dispatch] = useStoreContext();

  let tempArray: User[]=[];
  let APIarray: User[]=[]
  userAPI.getUsers().then(res=> {
    tempArray=res.data;
    console.log(tempArray);
  }).catch(err => console.log(err));



  tempArray.forEach(item=>{
    if (item.username !== state.currentUser.username){
      APIarray.push(item);
    }
  })


}

/*export const communityList = [
  {
    name: "Marcus",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    name: "Paula",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    name: "Gwendoline",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    name: "Jerome",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  }
]

export const suggestedOpponents = [
  {
    name: "Bruce",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    name: "Marylyn",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    name: "Donna",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    name: "Roger",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  }
]

export const userList = [
  {
    userName: "Marcus",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    userName: "Paula",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    userName: "Gwendoline",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    userName: "Jerome",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    userName: "Bruce",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    userName: "Marylyn",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    nauserNameme: "Donna",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    userName: "Roger",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  }
]
*/


