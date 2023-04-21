import React, { useState } from "react";
import * as Styled from "./style";
import { ethers } from "ethers";
import { TokenName, TokenValue, transferFunction } from "../../logic/contract/UJJERC-20/ujj";

const Home = () => {
  const active = localStorage.getItem("walletConnected");
  console.log("active", active);
  const { ethereum }: any = window;
  const [sendToken , setSendToken] = useState<boolean>(false)
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletAddress , setWalletAddress] = useState<string>('')
  const [token1Balance, setToken1Balance] = useState<any>("");
  const [token1Symbol, setToken1Symbol] = useState<string>("");
  const [valuetoSend , setValueToSend] = useState<any>('');
  const [recieverAdd , setReceiverAdd] = useState<string>('');

  const handleAccountChange = (_account: any) => {
    if (_account && _account?.length > 0) {
      //   setUserAccount(_account)
      //   setContextAddress(_account)
      setWalletConnected(true);
    } else {
      window.location.reload();
      //   setContextBalance(null)
      //   setContextAddress(null)
      setWalletConnected(false);
      ethereum
        .request({ method: "wallet_requestPermissions" })
        .then((data: any) => {
          window.location.reload();
        });
    }
  };

  const connectWallet = async () => {
    if (ethereum !== "undefined") {
      if (ethereum?.chainId != "0x61") {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x61" }],
          });
          // const accounts = await ethereum.request({
          //   method: "eth_requestAccounts",
          // });
          // handleAccountChange(accounts[0]);
          // setWalletConnected(true);
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x61",
                    chainName: "Binance Testnet",
                    rpcUrls: [
                      "https://data-seed-prebsc-1-s1.binance.org:8545/",
                    ] /* ... */,
                  },
                ],
              });
            } catch (addError) {
              console.log(addError);
            }
          }
          if (switchError.code == 4001) {
            window.location.reload();
          }
        }
      }
    }
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletConnected(true);
    
    localStorage.setItem('address',accounts[0])
    console.log("accounts",accounts)
    await getSymbol();
    await getBalance(accounts[0]);
    localStorage.setItem("walletConnected", "true");
    handleAccountChange(accounts[0]);
    setWalletAddress(accounts[0])
  };

  const getSymbol = async () => {
    const result = await TokenName();
    setToken1Symbol(result);
  };

  const getBalance = async (address : string) => {
    const result = await TokenValue(address);
    setToken1Balance(result);
    console.log("balance", result);
  }

   const sendFunction = async () => {
    const result = await transferFunction( recieverAdd , valuetoSend);
    const receipt = await result.wait(); // wait for the transaction to be mined

    console.log(`Transaction mined. Block number: ${receipt.blockNumber}`);
    console.log(`Gas used: ${receipt.gasUsed.toString()}`);
    console.log(`Events emitted:`);
    console.log(receipt.events);
    getBalance(walletAddress);
    setReceiverAdd('');
    setValueToSend('');
  }

  const disconnect = () => {
    setWalletAddress('')
    setWalletConnected(false)
    localStorage.clear();
    setSendToken(false)
  }

  console.log("walletConnected", walletConnected);
  return (
    <React.Fragment>
      <Styled.Nav>{walletConnected && <Styled.WalletBtn onClick={()=>disconnect()}>Disconnect</Styled.WalletBtn>}</Styled.Nav>
      <Styled.Container>
        {!walletConnected ? (
          <Styled.WalletBtn
            onClick={() => {
              connectWallet();
            }}
          >
            Connect Wallet
          </Styled.WalletBtn>
        ) : (
          <>
            {" "}
            <Styled.TokenInfo>
              Token Balance : {Number(token1Balance).toFixed(3)} {token1Symbol}
            </Styled.TokenInfo>
           
            { 
            !sendToken ?  <Styled.Span onClick={()=>{setSendToken(prev => !prev)}}> Want to Send Tokens to Your Friends ? </Styled.Span> : 
            <>
              <Styled.InputContainer value={recieverAdd} onChange={(e)=>{setReceiverAdd(e.target.value)}} type="text" id="add" name="add" placeholder="Enter your wallet address"/>
              <Styled.InputContainer value={valuetoSend} onChange={(e)=>{setValueToSend(e.target.value)}} type="number" id="token" name="token" placeholder="Enter your amount"/>
              <Styled.WalletBtn onClick={()=>sendFunction()}>
                Send Tokens
              </Styled.WalletBtn>
            </>
            }
          </>
        )}
      </Styled.Container>
    </React.Fragment>
  );
};

export default Home;
