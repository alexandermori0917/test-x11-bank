import styles from "@/../css/Components/SmallCard.module.scss";

export default function SmallCard({
    card_number,
    exp_month,
    exp_year,
    onClick,
}) {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.card__number}>
                •••• {card_number.slice(-4)}
            </div>
            <div className={styles.card__exp}>
                {exp_month} / {exp_year}
            </div>
        </div>
    );
}
