import React from 'react';
import axios from 'axios';

import getWeb3 from '../../utils/getWeb3';

import './login.css';
let web3 = undefined;

const Login = ({ onLoggedIn }) => {
  const [loading, setLoading] = React.useState(false);
  const [buttonText, setButtonText] = React.useState('Login with MetaMask');

  const fetchNonce = async () => {
    let { data } = await axios.get(`/api/token`);
    return data;
  };

  const handleAuthentication = async (signature, nonce) => {
    return await axios.post(`/api/auth`, { signature, nonce });
  };

  const handleSignMessage = async (address, nonce) => {
    try {
      const signature = await web3.eth.personal.sign(
        `Logging in using nonce: ${nonce}`,
        address,
        '' // ignore the password argument here
      );
      return { address, signature };
    } catch (err) {
      throw new Error('You need to sign the message to log in.');
    }
  };

  const handleClick = async () => {
    try {
      web3 = await getWeb3();
      const coinbase = await web3.eth.getCoinbase();
      if (!coinbase) {
        window.alert('Please activate MetaMask first.');
        return;
      }
      const publicAddress = coinbase.toLowerCase();
      setLoading(true);
      const nonce = await fetchNonce();
      // Popup MetaMask confirmation modal to sign message
      const signature = await handleSignMessage(publicAddress, nonce);
      // Send signature to backend on the /api/auth route
      const token = await handleAuthentication(signature, nonce);
      // Pass accessToken back to parent component (to save it in localStorage)
      onLoggedIn(token);
    } catch (error) {
      setButtonText('please try again!');
      window.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <p>
          Please click on login button.
          <br />
          MetaMask popup will ask you to sign a message.
        </p>
        <button className="Login-button Login-mm" onClick={handleClick}>
          {loading ? 'Loading...' : buttonText}
        </button>
      </div>
    </div>
  );
};

export default Login;
