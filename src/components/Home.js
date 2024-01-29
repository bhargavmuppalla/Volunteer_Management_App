// src/components/Home.js
import React from 'react';
import { Link} from 'react-router-dom';

const Home = () => {

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Volunteer Management App</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <p className="lead">
            Welcome to the Volunteer Management App. Log your hours and make a difference!
          </p>
          <p>
            If you are a volunteer, you can log your hours using the{' '}
            <Link to="/volunteer-dashboard">Volunteer Dashboard</Link>.
          </p>
          <p>
            Managers can access the <Link to="/admin-dashboard">Admin Dashboard</Link> to review and approve volunteer hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
