import styles from "./CategoryIcon.module.css";
import PetsIcon from '@mui/icons-material/Pets';
import DiningIcon from '@mui/icons-material/Dining';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import WorkIcon from '@mui/icons-material/Work';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import BalanceIcon from '@mui/icons-material/Balance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeIcon from '@mui/icons-material/Home';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

interface Category {
    category: "Pets" |
        "Dinning" |
        "Groceries" |
        "Shopping" |
        "Transit" |
        "Entertainment" |
        "Bills & Fees" |
        "Gifts" |
        "Beauty" |
        "Work" |
        "Travel" |
        "Balance Correction" |
        "Income" |
        "Housing" |
        "Health"

}
const CategoryIcon = ({ category }: Category) => {
    const AVAILABLE_CATEGORIES = {
        "Pets": <PetsIcon className={styles["class-icon"]}/>,
        "Dinning": <DiningIcon className={styles["class-icon"]}/>,
        "Groceries": <StoreIcon className={styles["class-icon"]}/>,
        "Shopping": <ShoppingBagIcon className={styles["class-icon"]}/>,
        "Transit": <DirectionsTransitIcon className={styles["class-icon"]}/>,
        "Entertainment": <TheaterComedyIcon className={styles["class-icon"]}/>,
        "Bills & Fees": <PointOfSaleIcon className={styles["class-icon"]}/>,
        "Gifts": <CardGiftcardIcon className={styles["class-icon"]}/>,
        "Beauty": <FaceRetouchingNaturalIcon className={styles["class-icon"]}/>,
        "Work": <WorkIcon className={styles["class-icon"]}/>,
        "Travel": <LocalAirportIcon className={styles["class-icon"]}/>,
        "Balance Correction": <BalanceIcon className={styles["class-icon"]}/>,
        "Income": <MonetizationOnIcon className={styles["class-icon"]}/>,
        "Housing": <HomeIcon className={styles["class-icon"]}/>,
        "Health": <HealthAndSafetyIcon className={styles["class-icon"]}/>
    }

    return (
        <div>
            {AVAILABLE_CATEGORIES[`${category}`]}
        </div>
    )
};

export default CategoryIcon;
