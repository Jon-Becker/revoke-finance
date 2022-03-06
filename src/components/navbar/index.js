import React from 'react';
import { useEffect, useState } from 'react'
import styles from './styles.module.scss';
import { FaBars, FaEthereum, FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import Blockie from './blockie';

import * as utils from '../../library/utils';

const Sidebar = ({ active, account, connect, updateActive, showDropdown, setShowDropdown }) => {
  
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
  function toggleDropdown() {
    if(showDropdown){
      setShowDropdown(false)
    }
    else {
      setShowDropdown(true)
    }
  }

  function updateToast(event) {
    const query = event.target.value;
    var results = utils.handleSearch(query);
    console.log(results)
    setToastBody(
      <div className={styles.results}>
        {results.slice(0,25).map(token => {
          return (
            <>
              <div className={styles.tokenWrap}>
                <img src={token.logoURI ? (token.logoURI ) : ('https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png') } />
                <div>
                  <span>{token.name} {token.symbol ? (`(${token.symbol})`) : ('')}</span>
                  <a href={`https://etherscan.io/address/${token.address}`} target="_blank">{token.address.substring(0,10)}...{token.address.substring(36)}</a>
                </div>
                {
                  token.extensions.link ? (
                    <a className={styles.externalLink} href={token.extensions.link} target="_blank"><FaExternalLinkAlt /></a>
                  ) : ('')
                }
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
        <input type="text" placeholder='Token Address, Name, or Symbol' id='search' 
          onFocus={() => toggleToast()}
          onBlur={() => toggleToast()}
          onKeyUp={a =>updateToast(a)}
        />
        <button className={styles.button}><FaSearch /></button>

        { showToast ? (
          <div className={styles.toast} onMouseDown={(e) => e.preventDefault()}>
            {toastBody}
            <button onClick={() => {updateActive('tokens')}}>View All Tokens</button>
          </div>
        ) : ('') }
        
      </div>

      <FaBars className={styles.bars} onClick={() => toggleDropdown()} />

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