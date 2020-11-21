import userAPI from '../utils/userAPI';
import React from 'react';
import User from '../interfaces/ICurrentUser';
import {useStoreContext} from '../state/GlobalState';

export default function UserArray(){

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

  return APIarray;


}