import React from 'react';
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { FaExchangeAlt, FaHandshake, FaUnlink, FaPen, FaTwitter, FaCodeBranch, FaChevronLeft, FaChevronRight, FaExclamationTriangle } from 'react-icons/fa'
import { TailSpin } from  'react-loader-spinner'

import SkeletonLoading from '../skeletonLoading';
import Statistic from './statistic';
import Notification from '../notification';
import Card from './card';

import * as utils from '../../library/utils';

const View = ({ active, account, library }) => {

  const [statOne, setStatOne] = useState(null);
  const [statTwo, setStatTwo] = useState(null);
  const [statThree, setStatThree] = useState(null);

  const [updateRequired, setUpdateRequired] = useState(false);
  const [updateApprovals, setUpdateApprovals] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);


  
  useEffect(() => {
    utils.fetchTokens(function(updateRequired){
      if(updateRequired){
        setUpdateRequired(true);
      }
    })
  }, []);

  useEffect(() => {
    if(account) {
      utils.resetERC20Approvals();
      utils.loadLibrary(library);
      utils.fetchApprovals(account, function(response){
        setStatThree(response.length)
        var insecureApprovals = 0;
        response.forEach(element => {
          if(element.value > 11579208923731619542357098500868790785326998466564056403945758400791312963993){
            insecureApprovals++;
          }
        });
        setStatOne(insecureApprovals)
      })
    }
  }, [account,updateApprovals])

  function pageUp() {
    var maxPages = Math.ceil((utils.getTokenList().length)/10)-1;
    if(currentPage+1 <= maxPages){
      setCurrentPage(currentPage+1);
    }
  }

  function pageDown() {
    if(currentPage-1 >= 0){
      setCurrentPage(currentPage-1);
    }
  }

  var body = 
    <div className={styles.centered}>
      <h2>Something went wrong.</h2>
      <p>We're not sure how you got here, but we're looking into it.</p>
    </div>
  switch(active){
    case 'dashboard':

      if(account){

        library.eth.getTransactionCount(account, function(err, result){
          setStatTwo(result)
        });

        var erc20Approvals = utils.getERC20Approvals();

      }
      //TODO fix link on 84 after deployment
      body = 
        <>
          <div className={styles.headline}>
            <h2>Dashboard</h2>
            <a href="https://twitter.com/intent/tweet?text=Check out this simple DApp by @BeckerrJon that lets you manage your token approvals on Ethereum.%0A%0Ahttps://revoke.finance/" target="_blank" className={styles.button}><FaTwitter /> Share</a>
          </div>
          <div className={styles.dashboard}>
            <>
              <Statistic color={"#35B9CC"} title={"TRANSACTIONS"} stat={statTwo ? (statTwo) : (<SkeletonLoading />)} icon={<FaExchangeAlt />} />
              <Statistic color={"#F7C443"} title={"ACTIVE APPROVALS"} stat={statThree ? (statThree) : (<SkeletonLoading />)} icon={<FaHandshake />} />
              <Statistic color={"#C71C33"} title={"UNLIMITED APPROVALS"} stat={statOne ? (statOne) : (<SkeletonLoading />)} icon={<FaExclamationTriangle />} />
            </>

            <Card title={"ERC20 APPROVALS"} minwidth={"100%"} content={
              <table>
                <tr>
                  <th>TOKEN</th>
                  <th>CONTRACT</th>
                  <th>SPENDER</th>
                  <th>ALLOWANCE</th>
                  <th>EDIT</th>
                  <th>REVOKE</th>
                </tr>
                {
                  (erc20Approvals && erc20Approvals.length > 0) ? (
                    erc20Approvals.slice(0,5).map((approval) => {
                      var tokenInfo = utils.getToken(approval.token)
                      return (
                        <tr className={approval.value > 11579208923731619542357098500868790785326998466564056403945758400791312963993 ? ('danger'):('')}>
                          <td>
                            <div className={styles.token}>
                              <img src={tokenInfo.logoURI} alt='' />
                              <span className={styles.tokenName}>{tokenInfo.name} ({tokenInfo.symbol})</span>
                            </div>
                          </td>
                          <td><a href={`https://etherscan.io/address/${approval.token}`} target="_blank">{approval.token.substring(0,6)}...{approval.token.substring(36)}</a></td>
                          <td><a href={`https://etherscan.io/address/${approval.spender}`} target="_blank">{approval.spender.substring(0,6)}...{approval.spender.substring(36)}</a></td>
                          <td>{ approval.value > 11579208923731619542357098500868790785326998466564056403945758400791312963993 ? (
                            "UNLIMITED"
                          ) : (approval.value)}</td>
                          <td>
                            <div className={styles.search}>
                              <input type="number" placeholder='Edit Approval' id={`edit_amount_${approval.token}${approval.spender}`}></input>
                              <button className={`${styles.button} ${styles.edit}`} onClick={() => utils.editAllowance(account, approval.token, approval.spender, function(txid){
                                utils.resetERC20Approvals();
                                setUpdateApprovals(txid)
                              })}><FaPen /></button>
                          </div>
                          </td>
                          <td><button className={`${styles.button} ${styles.revoke}`} onClick={() => utils.updateAllowance(account, approval.token, approval.spender, 0, function(txid){
                                utils.resetERC20Approvals();
                                setUpdateApprovals(txid)
                              })}><FaUnlink /> REVOKE</button></td>
                        </tr>
                      );
                    })
                  ):(
                    <>
                      <tr>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                      </tr>
                      <tr>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                      </tr>
                    </>
                  )
                }
              </table>
            }/>

              <Card title={"INCIDENT FEED"} minwidth={"100%"} content={
                <table>
                  <tr>
                    <th>SEVERITY</th>
                    <th>PLATFORM</th>
                    <th>DESCRIPTION</th>
                    <th>DATE</th>
                  </tr>
                </table>
              } />

          </div>
        </>
      break;
    case 'tokens':
      body = 
        <>
          <div className={styles.headline}>
            <h2>Supported Token Library</h2>
            <a href="https://github.com/0xsequence/token-directory#add-or-update-your-token" target="_blank" className={styles.button}><FaCodeBranch /> Submit Token</a>
          </div>
          <div className={styles.approvals}>

            <Card title={"ERC20 TOKENS"} minwidth={"100%"} content={
              <>
                <table>
                  <tr>
                    <th>TOKEN</th>
                    <th>ADDRESS</th>
                    <th>DECIMALS</th>
                    <th>LINK</th>
                  </tr>
                  {
                    (utils.getTokenList() && utils.getTokenList().length > 0) ? (
                      utils.getTokenList().slice((currentPage*10),(currentPage*10)+10).map((approval) => {
                        var tokenInfo = approval;
                        return (
                          <tr>
                            <td>
                              <div className={styles.token}>
                                <img src={approval.logoURI ? (approval.logoURI ) : ('https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png') } />
                                <span className={styles.tokenName}>{tokenInfo.name} ({tokenInfo.symbol})</span>
                              </div>
                            </td>
                            <td><a href={`https://etherscan.io/address/${approval.address}`} target="_blank">{approval.address.substring(0,6)}...{approval.address.substring(36)}</a></td>
                            <td>{approval.decimals ? (approval.decimals) : ('N/A')}</td>
                            <td>{approval.extensions.link ? (
                              <>
                                <a href={approval.extensions.link} target="_blank">{approval.extensions.link}</a>
                              </>
                            ) : ('N/A')}</td>
                          </tr>
                        );
                      })
                    ):('')
                  }
                </table>
                <div className={styles.pagination}>
                  
                  <div className={styles.controllerWrap}>
                    <div className={styles.controller} onClick={() => pageDown()}><FaChevronLeft /></div>

                    <span className={styles.pageNumber}>Page {currentPage+1} of {Math.ceil((utils.getTokenList().length)/10)}</span>

                    <div className={styles.controller} onClick={() => pageUp()}><FaChevronRight /></div>
                  </div>

                </div>
              </>
            }/>
          </div>
        </>
      break;
    case 'approvals':
      if(account){
        
        library.eth.getTransactionCount(account, function(err, result){
          setStatTwo(result)
        });

        var erc20Approvals = utils.getERC20Approvals();

      }

      body = 
        <>
          <div className={styles.headline}>
            <h2>Token Approvals</h2>
          </div>
          <div className={styles.approvals}>

            <Card title={"ERC20 APPROVALS"} minwidth={"100%"} content={
              <table>
                <tr>
                  <th>TOKEN</th>
                  <th>CONTRACT</th>
                  <th>SPENDER</th>
                  <th>ALLOWANCE</th>
                  <th>EDIT</th>
                  <th>REVOKE</th>
                </tr>
                {
                  (erc20Approvals && erc20Approvals.length > 0) ? (
                    erc20Approvals.map((approval) => {
                      var tokenInfo = utils.getToken(approval.token)
                      return (
                        <tr className={approval.value > 11579208923731619542357098500868790785326998466564056403945758400791312963993 ? ('danger'):('')}>
                          <td>
                            <div className={styles.token}>
                              <img src={tokenInfo.logoURI} alt='' />
                              <span className={styles.tokenName}>{tokenInfo.name} ({tokenInfo.symbol})</span>
                            </div>
                          </td>
                          <td><a href={`https://etherscan.io/address/${approval.token}`}>{approval.token.substring(0,6)}...{approval.token.substring(36)}</a></td>
                          <td><a href={`https://etherscan.io/address/${approval.spender}`}>{approval.spender.substring(0,6)}...{approval.spender.substring(36)}</a></td>
                          <td>{ approval.value > 11579208923731619542357098500868790785326998466564056403945758400791312963993 ? (
                            "UNLIMITED"
                          ) : (approval.value)}</td>
                          <td>
                            <div className={styles.search}>
                              <input type="number" placeholder='Edit Approval' id={`edit_amount_${approval.token}${approval.spender}`}></input>
                              <button className={`${styles.button} ${styles.edit}`} onClick={() => utils.editAllowance(account, approval.token, approval.spender, setUpdateApprovals)}><FaPen /></button>
                          </div>
                          </td>
                          <td><button className={`${styles.button} ${styles.revoke}`} onClick={() => utils.updateAllowance(account, approval.token, approval.spender, 0, setUpdateApprovals)}><FaUnlink /> REVOKE</button></td>
                        </tr>
                      );
                    })
                  ):(
                    <>
                      <tr>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                      </tr>
                      <tr>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                        <td><SkeletonLoading /></td>
                      </tr>
                    </>
                  )
                }
              </table>
            }/>
          </div>
        </>
      break;
    default:
      break;
  }
  
  return (
    <div className={styles.view}>
      {body}

      {
        updateRequired ? (
          <Notification content={
            <>
            <div>Syncing token data</div>
            <TailSpin color="#FFF" height={22} width={22} />
            </>
          } />
        ) : ('')
      }
      
    </div>
  );

};

export default View;