import React from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Home.css';
import { useStoreContext } from '../../state/GlobalState';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { SET_CURRENT_USER, SET_CHALLENGES } from '../../state/actions';

import userAPI from '../../utils/userAPI'

function Home() {

  const [state, dispatch] = useStoreContext();
  const [loggedInUser, setLoggedInUser] = useState<ICurrentUser>({});

  useEffect(() => {
    userAPI.getUser(state.currentUser._id)
      .then(res => setLoggedInUser(res.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!state.currentUser._id) {
      const storedState = loadFromLocalStorage()
      dispatch({
        type: SET_CURRENT_USER,
        currentUser: storedState.currentUser
      });
      dispatch({
        type: SET_CHALLENGES,
        challenges: storedState.challenges
      })
    } else saveToLocalStorage(state);
  }, [])


  return (
    <div className="home-container">
      <h1>{state.currentUser.username} DETAILS</h1>
      <div className="card-container">
        <div className="card-holder">
          <h2>PLANT POWER</h2>
          <DetailCard>
            <ul>
              <li>TOTAL HP: {loggedInUser.currenthealth}</li>
              <li>OFFENSE: {loggedInUser.currentoffense}</li>
              <li>DEFENSE: {loggedInUser.currentdefense}</li>
            </ul>
          </DetailCard>

        </div>
        <div className="user-data-holder">
          <UserData level={loggedInUser.level} character_image={loggedInUser.character_image} />
        </div>
        <div className="card-holder">
          <h2>CHALLENGES</h2>
          <DetailCard>
            <ul>
              <li>RECORD: {loggedInUser.win} / {loggedInUser.loss}</li>
              <li>ACTIVE: {loggedInUser.currentChallenge}</li>
              <li><Link to="/community">+ NEW CHALLENGE +</Link></li>
            </ul>
          </DetailCard>
        </div>
      </div>
    </div>
  )

};

export default withAuthenticationRequired(Home, {
  onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});