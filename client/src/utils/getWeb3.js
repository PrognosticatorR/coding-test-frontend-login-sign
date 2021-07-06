import Web3 from 'web3';

const getWeb3 = async () => {
  let web3 = undefined;
  if (!window.ethereum) {
    window.alert('Please install MetaMask first.');
    return;
  }
  if (!web3) {
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // We don't know window.web3 version, so we use our own instance of Web3
      // with the injected provider given by MetaMask
      web3 = new Web3(window.ethereum);
    } catch (error) {
      window.alert('You need to allow MetaMask.');
      return;
    }
  }
  // web3.eth.getAccounts()[0];

  return web3;
};

export default getWeb3;
