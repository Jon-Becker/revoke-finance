import React from 'react';
import styles from './styles.module.scss'
import LinkWrap from './linkWrap';
import { FaTachometerAlt, FaList } from "react-icons/fa";

const Sidebar = ({ active, updateActive }) => {
  
  return (
    <div className={styles.sidebar}>
      <h1>Fenris</h1>
      <hr />

      <div className={styles.linkContainer}>
        <LinkWrap title="Dashboard" icon={<FaTachometerAlt />} active={active === "dashboard" ? true : false} update={updateActive} />
        <LinkWrap title="Tokens" icon={<FaList />} active={active === "tokens" ? true : false} update={updateActive} />
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