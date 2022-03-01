import React from 'react';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';


const Notification = ({ content, refresh }) => {

  return (
    <div className={`${styles.notification}`}>
      {content}
    </div>
  );
};

export default Notification;