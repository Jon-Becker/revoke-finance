import React from 'react';
import styles from './styles.module.scss';
import { FaSearch } from "react-icons/fa";

const Sidebar = ({ active, account, connect }) => {
  console.log(account)
  return (
    <div className={styles.navbar}>
      
      <div className={styles.search}>
        <input type="text" placeholder='Contract Address'></input>
        <button className={styles.button}><FaSearch /></button>
      </div>

      <div className={styles.connect}>
        {
          !active ? (
            <button className={styles.button} onClick={() => connect()}>Connect</button>
          ) : (
            <p>{account}</p>
          )
        }
      </div>
    </div>
  );

};

export default Sidebar;