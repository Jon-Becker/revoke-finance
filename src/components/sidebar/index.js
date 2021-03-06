import React from 'react';
import styles from './styles.module.scss'
import LinkWrap from './linkWrap';
import { FaTachometerAlt, FaList, FaHandshake, FaGithub, FaBug } from "react-icons/fa";

const Sidebar = ({ active, updateActive, showDropdown, setShowDropdown }) => {
  
  return (
    <div className={`${styles.sidebar} ${showDropdown ? (styles.active) : ('')}`}>
      <h1>revoke.finance</h1>
      <hr />

      <div className={styles.linkContainer}>
        <LinkWrap title="Dashboard" icon={<FaTachometerAlt />} active={active === "dashboard" ? true : false} update={updateActive} />
        <LinkWrap title="Approvals" icon={<FaHandshake />} active={active === "approvals" ? true : false} update={updateActive} />
        <LinkWrap title="Tokens" icon={<FaList />} active={active === "tokens" ? true : false} update={updateActive} />
        <hr />
        <a href="https://github.com/Jon-Becker/revoke-finance" target="_blank"><LinkWrap title="Source Code" icon={<FaGithub />} active={false} update={console.log} /></a>
        <a href="https://cryptosec.info/defi-hacks/" target="_blank"><LinkWrap title="Exploit List" icon={<FaBug />} active={false} update={console.log} /></a>
      </div>

      <div className={styles.credits}>
        <hr />
        <p>By Jonathan Becker</p>
        <div className={styles.links}>
          <a href="https://jbecker.dev" target={'_blank'} rel={'noreferrer'}>Portfolio</a>
          <a href="https://jbecker.dev/research" target={'_blank'} rel={'noreferrer'}>Research</a>
          <a href="https://github.com/Jon-Becker" target={'_blank'} rel={'noreferrer'}>Github</a>
        </div>
      </div>
    </div>
  );

};

export default Sidebar;