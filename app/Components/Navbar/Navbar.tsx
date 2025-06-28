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
                <Link className={styles["navbar__menu_section_element"]} href={"/routes/home"}>
                    Home
                </Link>
                <Link className={styles["navbar__menu_section_element"]} href={""}>
                    Transactions
                </Link>
                <Link className={styles["navbar__menu_section_element"]} href={""}>
                    History
                </Link>
            </div>
        </div>
    );
}

export default Navbar;