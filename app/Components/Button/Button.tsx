"use client"

import Link from "next/link";
import styles from "./Button.module.css";
import { Button } from "@mui/material";

type ButtonProps = {
    url: string;
    text: string;
}

const MyButton = (props: ButtonProps) => {
    return (
        <Link className={styles["main-button-link"]} href = {props?.url}>
            <button className={styles["main-button"]}>
                {props.text}
            </button>
        </Link>
    );
}

export default MyButton;