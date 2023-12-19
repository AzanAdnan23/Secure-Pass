import React, { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

const ConnectWallet = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  useEffect(() => {
    async function detectProvider() {
      const provider = await detectEthereumProvider();

      if (provider) {
        if (provider !== window.ethereum) {
          console.error("Do you have multiple wallets installed?");
        } else {
          // MetaMask is installed and the provider is detected
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (accounts.length > 0) {
            // Wallet is connected
            setDefaultAccount(accounts[0]);
            setConnButtonText("Wallet Connected");
            getAccountBalance(accounts[0]);
          }
        }
      } else {
        setConnButtonText("Install MetaMask");
        console.log("Please install MetaMask!");
      }
    }

    detectProvider();
  }, []);

  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const newAccount = accounts[0];
        accountChangedHandler(newAccount);
        setConnButtonText("Wallet Connected");
        getAccountBalance(newAccount);
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount);
  };

  const getAccountBalance = async (account) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      setUserBalance(parseInt(balance, 16));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          accountChangedHandler(accounts[0]);
        } else {
          // Wallet disconnected
          setDefaultAccount(null);
          setConnButtonText("Connect Wallet");
        }
      };

      const handleChainChanged = (chainId) => {
        setDefaultAccount(null);
        setConnButtonText("Connect Wallet");
        window.location.reload();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, []);

  return (
    <div className="font-semibold px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-600">
      <button onClick={connectWalletHandler}>{connButtonText}</button>
    </div>
  );
};

export default ConnectWallet;
