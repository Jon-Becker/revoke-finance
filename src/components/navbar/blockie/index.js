import React from 'react';
import styles from './styles.module.scss';
import blockies from 'blockies';

const Blockie = ({ address }) => {
  return (
    <div className={styles.blockie} style={{backgroundImage: `url(${blockies({ seed:address.toLowerCase(), size: 8,scale: 16}).toDataURL()})` }}></div>
  );
};

export default Blockie;