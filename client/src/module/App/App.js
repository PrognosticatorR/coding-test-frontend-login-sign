import { useEffect, useState } from 'react';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import './app.css';

const LS_KEY = 'metamask_jwt';

function App() {
  const [auth, setAuth] = useState();

  useEffect(() => {
    // Access token is stored in localstorage
    const ls = localStorage.getItem(LS_KEY);
    const auth = ls && JSON.parse(ls);
    setAuth(auth);
  }, []);

  const handleLoggedIn = auth => {
    if (auth) {
      localStorage.setItem(LS_KEY, JSON.stringify(auth));
      setAuth(auth);
    }
  };

  const handleLoggedOut = () => {
    localStorage.removeItem(LS_KEY);
    setAuth(undefined);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="App-title">Welcome To Login App Demo</p>
      </header>
      <div className="App-intro">
        {auth ? (
          <Profile auth={auth} onLoggedOut={handleLoggedOut} />
        ) : (
          <Login onLoggedIn={handleLoggedIn} />
        )}
      </div>
    </div>
  );
}

export default App;
