import styles from './styles.module.scss';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import { useEffect, useState } from 'react';
import { useWeb3React } from "@web3-react/core";
import { injected } from "./components/wallet/injector";
import {useEagerConnect, web3} from "web3";
import View from './components/view';

function App() {

  const [activeDashboardView, setDashboardViewState] = useState("dashboard");
  const [showDropdown, setShowDropdown] = useState(false);

  const { active, account, library, activate, deactivate } = useWeb3React()

  function setDashboardView(state) {
    setDashboardViewState(state)
    setShowDropdown(false)
  }

  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem("account", account)
    } catch (ex) {
    }
  }

  async function disconnect() {
    try {
      await deactivate()
      localStorage.removeItem("account")
    } catch (ex) {
    }
  }

  useEffect(() => {
    if(localStorage.getItem("account") != null){
      connect();
    }
  }, [])


  return (
    <section className={styles.main}>
      <Sidebar active={activeDashboardView} updateActive={setDashboardView} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
      <div className={styles.view}>
        <Navbar active={active} account={account} connect={connect} updateActive={setDashboardView} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
        <View active={activeDashboardView} account={account} library={library} />
      </div>
    </section>
  );
}

export default App;
