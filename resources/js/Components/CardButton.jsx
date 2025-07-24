import styles from "@/../css/Components/CardButton.module.scss";
import PlusIcon from "@/Icons/Plus";

export default function CardButton({ onClick }) {
    return (
        <div className={styles.button} onClick={onClick}>
            <div className={styles.inner}>
                <PlusIcon className="min-w-5" />
                <div>Новая карта</div>
            </div>
        </div>
    );
}
