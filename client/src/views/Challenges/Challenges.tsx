import React from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Challenges.css';
import challengesAPI from '../../utils/challengesAPI';
import { useStoreContext } from "../../state/GlobalState";
import { SET_CHALLENGES } from "../../state/actions";
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

export default function Challenges() {

  const classes = useStyles();

  const [state, dispatch] = useStoreContext();
  let opponent: string = "";

  function getChal() {
    if (state.challenges.date_started === "" && state.currentUser.currentChallenge != undefined) {

      let tempId = state.currentUser.currentChallenge;
      let chalID = tempId.toString();

      challengesAPI.getChallenge(chalID).then(res => {
        dispatch({
          type: SET_CHALLENGES,
          challenges: {
            ...state.challenges,
            ...res.data
          }
        });
        console.log(state.challenges)
      }).catch(err => console.log(err));
    }
    else { console.log("else fired" + state.currentUser) }

  }

  function getOpponent() {
    if (state.challenges.player_one._id == state.currentUser._id) {
        opponent = state.challenges.player_two.username;
    } else {
      opponent = state.challenges.player_one.username;
    }
  }

  if (state.currentUser.challenged === false) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>CHALLENGES</h1>
        </Grid>
        <Grid item xs={4} className="card-holder">
          <h2>PENDING CHALLENGES</h2>
          <DetailCard>
            <p>No pending challenges</p>
          </DetailCard>
        </Grid>
        <Grid item xs={4} className="user-data-holder">
          <UserData level={state.currentUser.level} character_name={state.currentUser.character_name} />
        </Grid>
        <Grid item xs={4} className="card-holder">
          <h2>CURRENT CHALLENGES</h2>
          <DetailCard>
            <p>No current challenges</p>
          </DetailCard>
        </Grid>
      </Grid>
    ) } else {
    getChal();
  }
    
  getOpponent();

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} className="card-holder">
        <h2>PENDING CHALLENGES</h2>
        <DetailCard>
          <p>No pending challenges</p>
        </DetailCard>
      </Grid>
      <Grid item xs={4} className="user-data-holder">
        <UserData level={state.currentUser.level} character_name={state.currentUser.character_name} />
      </Grid>
      <Grid item xs={4} className="card-holder">
        <h2>CURRENT CHALLENGES</h2>
        <DetailCard>
          <p>Versus: {opponent}</p>
          <p>Ends: {state.challenges.date_ending}</p>
        </DetailCard>
      </Grid>
    </Grid>
  )
};