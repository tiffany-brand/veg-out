import React from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import About from "../../components/About/About";

function AboutView(): JSX.Element {


  return (


    <div className="card-container">
      <div className="card-holder">
        <img src="" alt="Vegemon" />
        <h2>Welcome To Vegemon!</h2>
        <DetailCard>
          <About />
        </DetailCard>
      </div>


      <Link to="/"><button>Home</button></Link>
    </div>

  )

};
export default AboutView;