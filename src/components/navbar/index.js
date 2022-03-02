import React from 'react';
import { useEffect, useState } from 'react'
import styles from './styles.module.scss';
import { FaEthereum, FaSearch } from "react-icons/fa";
import Blockie from './blockie';

import * as utils from '../../library/utils';

const Sidebar = ({ active, account, connect }) => {
  
  const [showToast, setShowToast] = useState(false);
  const [toastBody, setToastBody] = useState(<></>);

  function toggleToast() {
    if(showToast){
      setShowToast(false)
    }
    else {
      setShowToast(true)
    }
  }

  function updateToast(event) {
    const query = event.target.value;
    var results = utils.handleSearch(query);
    setToastBody(
      <div className={styles.results}>
        {results.slice(0,25).map(token => {
          return (
            <>
              <div className={styles.tokenWrap}>
                <img src={token.logoURI} alt=""/>
                <div>
                  <span>{token.name} ({token.symbol})</span>
                  <a href={`https://etherscan.io/address/${token.address}`} target="_blank">{token.address.substring(0,10)}...{token.address.substring(36)}</a>
                </div>
              </div>
            </>
          )
        })}
      </div>
    );
  }

  return (
    <div className={styles.navbar}>
      
      <div className={styles.search}>
        <input type="text" placeholder='Contract Address' id='search' 
          onFocus={() => toggleToast()}
          onBlur={() => toggleToast()}
          onKeyUp={a =>updateToast(a)}
        />
        <button className={styles.button}><FaSearch /></button>

        { showToast ? (
          <div className={styles.toast} onMouseDown={(e) => e.preventDefault()}>
            {toastBody}
            <button onClick={() => alert()}>View All Tokens</button>
          </div>
        ) : ('') }
        
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