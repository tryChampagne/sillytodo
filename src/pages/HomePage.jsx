import styles from "./HomePage.module.css";
export default function HomePage() {
  return (
    <div className={styles.home_page_wrapper}>
      <div className={styles.header_container}>
        <h1 className={styles.header}> Homepage</h1>
      </div>

      <div className={styles.msg_container}>
        <p className={styles.msg}>Привет!</p>
      </div>
    </div>
  );
}
