import EPGView from "@/views/epg";
import styles from './styles.module.scss';

export default function Home() {

  return (
    <div className={styles.main}>
      <EPGView />
    </div>
  );
}
