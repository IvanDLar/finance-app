import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import CoinLeaf from "../../../public/coinleaf-logo.png"
import { LogoutButton } from "@/AuthComponents/logout-button";
import { AuthButton } from "@/AuthComponents/AuthButton/auth-button";
import { createClient } from "@/lib/supabase/server";

const Navbar = async () => {

    const supabase = await createClient();

    const {
    data: { user },
    } = await supabase.auth.getUser();

    return(
        <div className={styles["navbar"]}>
            <div className={styles["navbar__logo_section"]}>
                <Image src={CoinLeaf} alt="Coinleaf Logo" width={100} height={100} />
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
                {user ? <LogoutButton /> : <AuthButton />}
            </div>
        </div>
    );
}

export default Navbar;