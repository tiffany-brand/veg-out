import React, { useEffect, useState } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import ICurrentUser from '../../interfaces/ICurrentUser'
import userAPI from '../../utils/userAPI'
import { Link } from 'react-router-dom';
import './Community.css';

import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    center: {
      align: 'center',
    }
  }),
);

export default function Community() {

  const classes = useStyles();

  const [searchArray, setSearchArray] = useState<ICurrentUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allUsers, setAllUsers] = useState<ICurrentUser[]>([])

  //As user types populate search results
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activeSearch = event.target.value.toLowerCase()
    const currentSearch = allUsers.filter((el) => (
      el.username?.toLowerCase().includes(activeSearch)
    ))
    setSearchArray(currentSearch)
    setSearchTerm(activeSearch);
  };


  useEffect(() => {
    userAPI.getUsers()
      .then(res => {
        setAllUsers(res.data);

      })
  }, [])

  return (
    <div className={classes.root}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>COMMUNITY</h1>
        </Grid>
        <Grid className="grid-card" item xs={6}>
            <h2>RECENT OPPONENTS</h2>
            <DetailCard>
              <ul>
                {allUsers.slice(0, 5).map(function (member, index) {
                  return <li key={index}> {member.username}</li>
                })}
              </ul>
            </DetailCard>
        </Grid>
        <Grid className="grid-card" item xs={6}>
          <h2>FIND NEW CHALLENGERS</h2>
          <Grid item xs={12}>
            <DetailCard>
              <h3>- Search Opponents -</h3>
              <input className="input" onChange={handleInputChange} type="text" name="user-name" placeholder="Enter Username" value={searchTerm} />
              <div className="search-results" id="search-results">{searchArray.slice(0, 3).map(function (user, index) {
                return <p key={index}>{user.username} +</p>
              })}</div>
            </DetailCard>
          </Grid>
        </Grid>
      </Grid>
    </div>

  )

};