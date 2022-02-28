import React from 'react';
import { FaMoneyBill, FaExchangeAlt, FaDownload, FaHandshake } from 'react-icons/fa';
import SkeletonLoading from '../skeletonLoading';
import Statistic from './statistic';
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';


const View = ({ active, account, library }) => {

  const [statOne, setStatOne] = useState(null);
  const [statTwo, setStatTwo] = useState(null);
  const [statThree, setStatThree] = useState(null);
  const [statFour, setStatFour] = useState(null);


  var body = 
    <div className={styles.centered}>
      <h2>Something went wrong.</h2>
      <p>We're not sure how you got here, but we're looking into it.</p>
    </div>
  switch(active){
    case 'dashboard':

      if(account){
        library.eth.getBalance(account, function(err, result){
          setStatOne(`${(result/1000000000000000000).toFixed(8)} ETH`)
        });
        library.eth.getTransactionCount(account, function(err, result){
          setStatTwo(result)
        });
        library.eth.getPastEvents({fromBlock:'0x0', address: account})
        .then(res => {
          console.log(res)
        }).catch(err => console.log("getPastLogs failed", err));
      }

      body = 
        <>
          <div className={styles.headline}>
            <h2>Dashboard</h2>
            <button className={styles.button}><FaDownload /> Save Report</button>
          </div>
          <div className={styles.dashboard}>
            <Statistic color={"red"} title={"NET WORTH"} stat={statOne ? (statOne) : (<SkeletonLoading />)} icon={<FaMoneyBill />} />
            <Statistic color={"red"} title={"TRANSACTIONS"} stat={statTwo ? (statTwo) : (<SkeletonLoading />)} icon={<FaExchangeAlt />} />
            <Statistic color={"red"} title={"ACTIVE APPROVALS"} stat={statThree ? (statThree) : (<SkeletonLoading />)} icon={<FaHandshake />} />
            <Statistic color={"red"} title={"NET WORTH"} stat={statFour ? (statFour) : (<SkeletonLoading />)} icon={<FaMoneyBill />} />
          </div>
        </>
      break;
    default:
      break;
  }
  
  return (
    <div className={styles.view}>
      {body}
    </div>
  );

};

export default View;