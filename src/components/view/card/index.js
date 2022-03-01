import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import styles from './styles.module.scss';

const Card = ({ title, minwidth, content }) => {
  return (
    <div className={styles.container} style={{minWidth: minwidth}}>
      <div className={styles.card}>
        <div className={styles.titleBar}>
          <div className={styles.title}>{title}</div>
          <button>
            <FaEllipsisV />
          </button>
        </div>
        <div className={styles.body}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Card;