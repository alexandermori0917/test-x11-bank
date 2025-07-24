import { useEffect, useState } from "react";
import cn from "classnames";
import { Head } from "@inertiajs/react";
import GlobalLayout from "@/Layouts/GlobalLayout";
import RubleIcon from "@/Icons/Ruble";
import ArIcon from "@/Icons/Ar";
import styles from "@/../css/Pages/Payment.module.scss";
import SmallCard from "@/Components/SmallCard";
import CardButton from "@/Components/CardButton";
import Card from "@/Components/Card";
import CheckedIcon from "@/Icons/Checked";
import UncheckedIcon from "@/Icons/Unchecked";
import InformationIcon from "@/Icons/Information";
import MainButton from "@/Components/MainButton";
import { ToastContainer, toast } from "react-toastify";

export default function Payment() {
    const [cards, setCards] = useState([]);
    const [form, setForm] = useState({
        amount: undefined,
        card_number: "",
        exp_month: "",
        exp_year: "",
        cvv: "",
    });
    const [errors, setErrors] = useState({});
    const [agreed, setAgreed] = useState(false);
    const [isNew, setIsNew] = useState(true);
    useEffect(() => {
        axios.get("/api/cards").then((res) => {
            setCards(res.data.data);
        });
    }, []);
    const onClickSubmit = () => {
        const newErrors = {};
        const amountFloat = parseFloat(form.amount);
        if (!form.amount || isNaN(amountFloat) || amountFloat <= 0) {
            newErrors.amount = "Укажите корректную сумму";
        }

        const cleanCard = form.card_number.replace(/\s/g, "");
        if (!/^\d{16}$/.test(cleanCard)) {
            newErrors.card_number = "Введите 16-значный номер карты";
        }

        const month = parseInt(form.exp_month, 10);
        if (!/^\d{2}$/.test(form.exp_month) || month < 1 || month > 12) {
            newErrors.exp_month = "Неверный месяц";
        }

        const year = parseInt(form.exp_year, 10);
        const currentYear = new Date().getFullYear() % 100;
        if (!/^\d{2}$/.test(form.exp_year) || year < currentYear) {
            newErrors.exp_year = "Неверный год";
        }

        if (!/^\d{3}$/.test(form.cvv)) {
            newErrors.cvv = "Неверный CVV";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        if (isNew) {
            axios
                .post("/api/cards", form)
                .then((res) => {
                    if (res.data.success) {
                        toast.success(res.data.message);
                        setCards([...cards, res.data.data]);
                        setForm({
                            ...form,
                            card_number: "",
                            exp_month: "",
                            exp_year: "",
                            cvv: "",
                            amount: undefined,
                        });
                        setIsNew(true);
                    } else {
                        toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(error.response.data.message);
                });
        } else {
            axios
                .post("/api/cards/check", form)
                .then((res) => {
                    if (res.data.success) {
                        toast.success("Операция прошла успешно");
                        setForm({
                            ...form,
                            card_number: "",
                            exp_month: "",
                            exp_year: "",
                            cvv: "",
                            amount: undefined,
                        });
                        setIsNew(true);
                    } else {
                        toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(error.response.data.message);
                });
        }
    };
    return (
        <GlobalLayout>
            <Head title="Payment" />
            <div className={styles.container}>
                <div className={styles.form}>
                    <div className={styles.title}>
                        Пополнить банковской картой
                    </div>
                    <label className={styles.label}>Укажите сумму</label>
                    <div
                        className={cn(
                            styles.amountRow,
                            errors.amount && styles.error
                        )}
                    >
                        <div className={styles.amountAr}>
                            <input
                                className={styles.inputAmount}
                                placeholder="0000.00"
                                type="number"
                                min={0}
                                step={0.01}
                                value={form.amount ?? ""}
                                onKeyDown={(e) => {
                                    if (
                                        [
                                            "-",
                                            "e",
                                            "E",
                                            "+",
                                            ",",
                                            "ArrowUp",
                                            "ArrowDown",
                                        ].includes(e.key)
                                    ) {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={(e) => {
                                    let value = e.target.value;

                                    if (value.includes(".")) {
                                        const [intPart, decimalPart] =
                                            value.split(".");
                                        if (decimalPart.length > 2) {
                                            value = `${intPart}.${decimalPart.slice(
                                                0,
                                                2
                                            )}`;
                                        }
                                    }

                                    setForm({
                                        ...form,
                                        amount:
                                            value !== "" ? value : undefined,
                                    });
                                    setErrors({
                                        ...errors,
                                        amount: undefined,
                                    });
                                }}
                            />

                            <ArIcon className="min-w-5" />
                        </div>
                        <div className={styles.amountRu}>
                            <input
                                className={styles.inputAmount}
                                placeholder="0000.00"
                                value={
                                    form.amount
                                        ? Number(form.amount * 15).toFixed(2)
                                        : ""
                                }
                                disabled
                                readOnly
                            />
                            <RubleIcon className="min-w-5" />
                        </div>
                    </div>
                    <div className={styles.cards}>
                        {cards.map((c) => (
                            <div className="py-1" key={c.card_number}>
                                <SmallCard
                                    onClick={() => {
                                        setForm({
                                            ...form,
                                            card_number: c.card_number,
                                            exp_month: c.exp_month,
                                            exp_year: c.exp_year,
                                            cvv: "",
                                        });
                                        setIsNew(false);
                                    }}
                                    card_number={c.card_number}
                                    exp_month={c.exp_month}
                                    exp_year={c.exp_year}
                                />
                            </div>
                        ))}
                        <CardButton
                            onClick={() => {
                                setForm({
                                    ...form,
                                    card_number: "",
                                    exp_month: "",
                                    exp_year: "",
                                    cvv: "",
                                });
                                setIsNew(true);
                            }}
                        />
                    </div>
                    <div className={styles.card}>
                        <Card
                            data={form}
                            onChange={setForm}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    </div>
                    <div className="mt-6 flex items-start gap-3">
                        <div
                            className="flex items-center justify-center cursor-pointer mt-1"
                            onClick={() => {
                                setAgreed(!agreed);
                            }}
                        >
                            {agreed ? (
                                <CheckedIcon className="min-w-5" />
                            ) : (
                                <UncheckedIcon className="min-w-5" />
                            )}
                        </div>
                        <div className="text-[12px] leading-5 md:text-[14px] md:leading-[22px] text-dark-200">
                            <p>
                                Запомнить эту карту. Это безопасно.{" "}
                                <InformationIcon className="min-w-5 inline-block" />
                            </p>
                            <p>
                                Сохраняя карту, вы соглашаетесь с{" "}
                                <span className="text-primary-100">
                                    условиями привязки карты.
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-[30px] w-full md:w-[141px]">
                        <MainButton
                            title="Оплатить"
                            onClick={onClickSubmit}
                            disabled={!agreed}
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </GlobalLayout>
    );
}
