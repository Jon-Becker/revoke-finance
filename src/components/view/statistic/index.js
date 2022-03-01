import React from 'react';
import styles from './styles.module.scss';

const Statistic = ({ color, title, stat, icon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.statistic} style={{borderColor: `${color}`}}>
        <div className={styles.statWrapper}>
          <div className={styles.title} style={{color: `${color}`}}>{title}</div>
          <div className={styles.stat}>{stat}</div>
        </div>
        <div className={styles.icon}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Statistic;