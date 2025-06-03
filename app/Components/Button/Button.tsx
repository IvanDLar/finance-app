"use client"

import Link from "next/link";
import styles from "./Button.module.css";
import { Button } from "@mui/material";

type ButtonProps = {
    url?: string;
    type?: "button" | "submit" | "reset" | undefined;
    isDisabled?: boolean;
    text: string;
}

const MyButton = ({url, type, isDisabled, text}: ButtonProps) => {
    if (url) {
        return (
            <Link className={styles["main-button-link"]} href = {url}>
                <button className={styles["main-button"]} type={type}>
                    {text}
                </button>
            </Link>
        );
    } else {
        return (
            <button className={`${styles["main-button"]}`} disabled={isDisabled} type={type}>
                {text}
            </button>
        );
    }

}

export default MyButton;