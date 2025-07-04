import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import CoinLeaf from "../../../public/coinleaf-logo.png"
import { LogoutButton } from "@/AuthComponents/logout-button";
import { AuthButton } from "@/AuthComponents/AuthButton/auth-button";
import { createClient } from "@/lib/supabase/server";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = async () => {

    const supabase = await createClient();

    const {
    data: { user },
    } = await supabase.auth.getUser();

    return(
        <div className={styles["navbar"]}>
            {!user && <div className={styles["navbar__logo_section"]}>
                <Image src={CoinLeaf} alt="Coinleaf Logo" width={100} height={100} />
            </div>}
            {user && <p>Hi, {user.email}</p>}
            <div className={styles["navbar__menu_section"]}>
                <Link className={styles["navbar__menu_section_element"]} href={"/"}>
                    Home
                </Link>
                <Link className={styles["navbar__menu_section_element"]} href={""}>
                    Transactions
                </Link>
                <Link className={styles["navbar__menu_section_element"]} href={""}>
                    History
                </Link>
                {user ? <LogoutButton size="small"/> : <AuthButton />}
            </div>
            {user && <Link href={"/routes/profile"}> <AccountCircleIcon className={styles["navbar__profile_icon"]}/> </Link>}
        </div>
    );
}

export default Navbar;