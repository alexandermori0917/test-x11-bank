import cn from "classnames";
import styles from "@/../css/Components/MainButton.module.scss";

export default function MainButton({ title, onClick, disabled }) {
    return (
        <button
            className={cn(styles.button, disabled && styles.disabled)}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    );
}
