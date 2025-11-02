import styles from './CategoryIcon.module.css';
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
import { Categories } from '@/app/Types/Categories';

export const AVAILABLE_CATEGORIES = (isSelected: boolean) => {
  const iconStyle = isSelected ? 'class-icon-selected' : 'class-icon';
  return {
    Pets: <PetsIcon className={styles[iconStyle]} />,
    Dinning: <DiningIcon className={styles[iconStyle]} />,
    Groceries: <StoreIcon className={styles[iconStyle]} />,
    Shopping: <ShoppingBagIcon className={styles[iconStyle]} />,
    Transit: <DirectionsTransitIcon className={styles[iconStyle]} />,
    Entertainment: <TheaterComedyIcon className={styles[iconStyle]} />,
    'Bills & Fees': <PointOfSaleIcon className={styles[iconStyle]} />,
    Gifts: <CardGiftcardIcon className={styles[iconStyle]} />,
    Beauty: <FaceRetouchingNaturalIcon className={styles[iconStyle]} />,
    Work: <WorkIcon className={styles[iconStyle]} />,
    Travel: <LocalAirportIcon className={styles[iconStyle]} />,
    'Balance Correction': <BalanceIcon className={styles[iconStyle]} />,
    Income: <MonetizationOnIcon className={styles[iconStyle]} />,
    Housing: <HomeIcon className={styles[iconStyle]} />,
    Health: <HealthAndSafetyIcon className={styles[iconStyle]} />,
  };
};

const CategoryIcon = ({
  category,
  type,
  setIsModalOpen,
  isSelected,
}: {
  category: Categories;
  type: 'static' | 'select_icon';
  setIsModalOpen?: (value: boolean) => void;
  isSelected?: boolean;
}) => {
  let availabelCategories;
  if (isSelected === undefined) isSelected = false;

  availabelCategories = AVAILABLE_CATEGORIES(isSelected);
  const handleIconClick = () => {
    if (setIsModalOpen) {
      setIsModalOpen(true);
    }
  };

  if (type === 'select_icon') {
    return (
      <button
        onClick={handleIconClick}
        type="button"
        className={styles['category-icon-button']}
      >
        {availabelCategories && availabelCategories[category]}
      </button>
    );
  } else {
    return <div>{availabelCategories && availabelCategories[category]}</div>;
  }
};

export default CategoryIcon;
