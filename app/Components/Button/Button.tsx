"use client"

import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
    url?: string;
    type?: "button" | "submit" | "reset" | undefined;
    isDisabled?: boolean;
    text: string;
    size?: string;
    variant?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const MyButton = ({ url, type="button", isDisabled, text, size="medium", variant="main-button", onClick}: ButtonProps) => {
    if (url) {
        return (
            <Link className={`${styles["button-link"]}`} href = {url}>
                <button className={`${styles["button"]} ${styles[variant]} ${styles[size]}`} type={type}>
                    {text}
                </button>
            </Link>
        );
    } else {
        return (
            <button className={`${styles["button"]} ${styles[variant]} ${styles[size]}`} disabled={isDisabled} type={type} onClick={onClick}>
                {text}
            </button>
        );
    }

}

export default MyButton;