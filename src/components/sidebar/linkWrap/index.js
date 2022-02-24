import React from 'react';
import styles from './styles.module.scss'
import { FaAngleRight } from "react-icons/fa";

const LinkWrap = ({ title, icon, active, update }) => {
  
  return (
    <div className={`${styles.linkWrap} ${active ? styles.selected : ''}`} onClick={() => update(title.toLowerCase())}>
      {icon}
      <p>{title}</p>
      <FaAngleRight className={styles.carat} />
    </div>
  );

};

export default LinkWrap;