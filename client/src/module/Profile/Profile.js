import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
const LS_KEY = 'metamask_jwt';

const Profile = ({ onLoggedOut }) => {
  const [address, setAddress] = useState('');
  useEffect(() => {
    // Access token is stored in localstorage
    const data = localStorage.getItem(LS_KEY);
    const auth = data && JSON.parse(data);
    const { address } = jwtDecode(auth.data);
    setAddress(address);
  }, []);

  return (
    <div>
      <h4>Successfully logged in as: {address}</h4>
      <button className="logout-button" onClick={onLoggedOut}>
        logout
      </button>
    </div>
  );
};

export default Profile;
