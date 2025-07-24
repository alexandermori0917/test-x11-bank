import cn from "classnames";
import styles from "@/../css/Components/Card.module.scss";

export default function Card({ data, onChange, errors, setErrors }) {
    return (
        <div className={styles.card}>
            <div className={styles.card__grey}>
                <div className={styles.bar}></div>
                <div className={styles.container}>
                    <div className={styles.info}>
                        <label className={styles.label}>CVV/CVC</label>
                        <div className="mt-2 flex md:flex-col gap-2 items-start justify-start">
                            <input
                                className={cn(
                                    styles.input,
                                    errors.cvv && styles.error
                                )}
                                placeholder="000"
                                type="number"
                                min={0}
                                max={999}
                                step={1}
                                value={data.cvv}
                                onKeyDown={(e) => {
                                    if (
                                        ["-", "e", "E", "+", ",", "."].includes(
                                            e.key
                                        )
                                    ) {
                                        e.preventDefault();
                                        setErrors({
                                            ...errors,
                                            cvv: undefined,
                                        });
                                    }
                                }}
                                onChange={(e) => {
                                    onChange({
                                        ...data,
                                        cvv:
                                            e.target.value !== ""
                                                ? e.target.value.slice(0, 3)
                                                : undefined,
                                    });
                                    setErrors({
                                        ...errors,
                                        cvv: undefined,
                                    });
                                }}
                            />
                            <div className={styles.help}>
                                три цифры с обратной стороны карты
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.card_blue}>
                <img
                    src="/images/chip1.png"
                    alt="chip1"
                    className="absolute top-0 right-0"
                />
                <img
                    src="/images/chip2.png"
                    alt="chip2"
                    className="absolute bottom-0 left-0"
                />
                <label className={cn(styles.label, "z-30")}>Номер карты</label>
                <input
                    className={cn(
                        styles.input,
                        "z-30",
                        errors.card_number && styles.error
                    )}
                    style={{ width: "100%" }}
                    placeholder="Номер карты"
                    value={data.card_number
                        .replace(/\D/g, "")
                        .replace(/(.{4})/g, "$1 ")
                        .trim()}
                    onChange={(e) => {
                        const raw = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 16);
                        onChange({
                            ...data,
                            card_number: raw,
                        });
                        setErrors({
                            ...errors,
                            card_number: undefined,
                        });
                    }}
                    inputMode="numeric"
                    pattern="\d*"
                />

                <label className={cn(styles.label, "mt-2 z-30")}>
                    Действует до
                </label>
                <div className="flex items-center gap-[7px] z-30">
                    <input
                        className={cn(
                            styles.input,
                            errors.exp_month && styles.error
                        )}
                        placeholder="мм"
                        type="number"
                        min={1}
                        max={12}
                        step={1}
                        value={data.exp_month}
                        onKeyDown={(e) => {
                            if (
                                ["-", "e", "E", "+", ",", "."].includes(e.key)
                            ) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            onChange({
                                ...data,
                                exp_month:
                                    e.target.value !== ""
                                        ? e.target.value.slice(0, 2)
                                        : undefined,
                            });
                            setErrors({
                                ...errors,
                                exp_month: undefined,
                            });
                        }}
                    />
                    /
                    <input
                        className={cn(
                            styles.input,
                            errors.exp_year && styles.error
                        )}
                        placeholder="гг"
                        type="number"
                        min={25}
                        max={30}
                        step={1}
                        value={data.exp_year}
                        onKeyDown={(e) => {
                            if (
                                ["-", "e", "E", "+", ",", "."].includes(e.key)
                            ) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            onChange({
                                ...data,
                                exp_year:
                                    e.target.value !== ""
                                        ? e.target.value.slice(0, 2)
                                        : undefined,
                            });
                            setErrors({
                                ...errors,
                                exp_year: undefined,
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
