// components/Navbar.tsx
import Link from 'next/link';
import styles from './navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className={styles.navbar_nav}>
            <div className={styles.navbar_section}>
                <Link href="/">
                    <Image
                        src="/images/image1.png"
                        alt="logo"
                        className={styles.logo_image}
                        width={200}
                        height={50}
                    />
                </Link>
                <p className={styles.text_p}>
                    Business is Tech 👨‍💻 & Passion is Environment 🌳
                </p>
            </div>
        </nav>
    );
};

export default Navbar;
