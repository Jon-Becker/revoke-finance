import styles from './styles.module.scss';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import { useEffect, useState } from 'react';
import { useWeb3React } from "@web3-react/core";
import { injected } from "./components/wallet/injector";
import {useEagerConnect, web3} from "web3";

function App() {

  const [activeDashboardView, setDashboardView] = useState("dashboard");

  const { active, account, library, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      await deactivate()
    } catch (ex) {
      console.log(ex)
    }
    
  }

  return (
    <section className={styles.main}>
      <Sidebar active={activeDashboardView} updateActive={setDashboardView} />
      <Navbar active={active} account={account} connect={connect} />
    </section>
  );
}

export default App;
