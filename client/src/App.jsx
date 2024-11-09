import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Contract, RpcProvider } from "starknet";
import { useSelector } from "react-redux";
import { contractaddress } from "../global/constant";
import Navbar from "./Components/Navbar";

function App() {
  const [count, setCount] = useState(0);
  const connection = useSelector((state) => state.connection);

  const init = async () => {
    const provider = new RpcProvider({
      nodeUrl:
        "https://starknet-goerli.g.alchemy.com/v2/z_ZWlsOXWnNNXqo9hveLbeX4QDNycdA9",
    });

    const ContAbi = await provider.getClassAt(contractaddress);
    console.log(">> contract abi", ContAbi);
    const newContract = new Contract(
      ContAbi.abi,
      contractaddress,
      connection?.provider
    );
    const address = connection?.address;
    const value = {
      level: 10,
    };
    console.log("contract details", newContract);
    const response = await newContract.register_user(address, value);
    console.log(">> firstresponse", response);
  };

  return (
    <>
      <Navbar />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
