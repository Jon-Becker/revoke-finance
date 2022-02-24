import styles from './styles.module.scss';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import { useCallback, useEffect, useState } from 'react';

function App() {

  const [activeDashboardView, setDashboardView] = useState("dashboard");

  return (
    <section className={styles.main}>
      <Sidebar active={activeDashboardView} updateActive={setDashboardView} />
      <Navbar />
    </section>
  );
}

export default App;
