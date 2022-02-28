import React from 'react';
import styles from './styles.module.scss';
import { FaEthereum, FaSearch } from "react-icons/fa";
import Blockie from '../blockie';

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
            <button className={styles.button} onClick={() => connect()}><FaEthereum /> Connect</button>
          ) : (
            <div className={styles.address}>
              <a href={`https://etherscan.io/address/${account}`}>{account.substring(0,6)}...{account.substring(36)}</a>
              <Blockie address={account} />
            </div>
          )
        }
      </div>
    </div>
  );

};

export default Sidebar;