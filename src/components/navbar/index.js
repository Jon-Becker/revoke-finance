import React from 'react';
import styles from './styles.module.scss';
import { FaSearch } from "react-icons/fa";

const Sidebar = ({ tabs }) => {

  return (
    <div className={styles.navbar}>
      
      <div className={styles.search}>
        <input type="text" placeholder='Contract Address'></input>
        <button className={styles.button}><FaSearch /></button>
      </div>

      <div className={styles.connect}>
        <button className={styles.button}>Connect</button>
      </div>
    </div>
  );

};

export default Sidebar;