"use client"
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return(
        <div className={styles["navbar"]}>
            <div className={styles["navbar__logo_section"]}>
                LOGO
            </div>
            <div className={styles["navbar__menu_section"]}>
                <Link href={""}>
                    Home
                </Link>
                <Link href={""}>
                    Transactions
                </Link>
                <Link href={""}>
                    History
                </Link>
            </div>
        </div>
    );
}

export default Navbar;