// React Basic and Bootstrap
import React from 'react';
import { Link } from 'react-router-dom';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

//Import Icons
import FeatherIcon from 'feather-icons-react';

import Payment from './Payment';

const PageSignUp = () => {
  const stripePromise = loadStripe(
    'pk_test_51IdwfeH8KzFo5uc9gvu6EUUnzatrPyNeh6fVsTmr1eyW7RELgRGiDJid8LQmS9f2c47FE58dKBPoa6VlDCLkogxd00RKRpOPvb',
  );
  return (
    <Elements stripe={stripePromise}>
      <title>Sign UP </title>
      <div className="back-to-home rounded d-none d-sm-block">
        <Link to="/" className="btn btn-icon btn-soft-primary">
          <i>
            <FeatherIcon icon="home" className="icons" />
          </i>
        </Link>
      </div>
      <Payment />
    </Elements>
  );
};
export default PageSignUp;
