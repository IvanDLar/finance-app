import styles from "./MobileNavBar.module.css";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PaymentsIcon from '@mui/icons-material/Payments';
import Link from "next/link";

const MobileNavBar = () => {
    return(
        <div className={styles["mobile-navbar__container"]}>
            <div className={styles["mobile-navbar"]}>
                <Link href={"/routes/profile"} className={styles["mobile-navbar-element"]} >
                    <LogoutIcon className={styles["mobile-navbar__icon"]}/>
                </Link>
                <Link href={"/routes/profile"} className={styles["mobile-navbar-element"]}>
                    <PersonIcon className={styles["mobile-navbar__icon"]}/>
                </Link>
                <div className={`${styles["add-transaction-container"]} ${styles["mobile-navbar-element"]}`}>
                    <Link href={"/routes/add-transaction"} className={styles["mobile-navbar-element"]}>
                        <AddIcon className={`${styles["mobile-navbar__icon"]} ${styles["mobile-navbar__add-icon"]}`}/>
                    </Link>
                </div>
                <Link href={"/routes/profile"} className={styles["mobile-navbar-element"]}>
                    <PaymentsIcon className={styles["mobile-navbar__icon"]}/>
                </Link>
                <Link href={"/routes/profile"} className={styles["mobile-navbar-element"]}>
                    <HomeRoundedIcon className={styles["mobile-navbar__icon"]}/>
                </Link>
            </div>
        </div>
    )
};

export default MobileNavBar;