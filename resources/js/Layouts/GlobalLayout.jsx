import styles from "@/../css/Layouts/GlobalLayout.module.scss";

export default function Global({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className={styles.header}></header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}></footer>
        </div>
    );
}
