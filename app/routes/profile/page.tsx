import { LogoutButton } from '@/AuthComponents/logout-button';
import Link from 'next/link';
import styles from './page.module.css';

const Profile = () => {
  return (
    <div className={styles['profile-page']}>
      <Link href={'/'} className={styles['back-button']}>
        {' '}
        Back{' '}
      </Link>
      <div className={styles['profile-logout-button-bottom']}>
        <LogoutButton size={'medium'} />
      </div>
    </div>
  );
};

export default Profile;
