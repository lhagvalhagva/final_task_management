// components/Navbar.js
'use client';

import Image from 'next/image';
import styles from './styles/Navbar.module.css';  // Assuming CSS module for styling

export default function NavBar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.navLeft}>
                <h1>Task Management System</h1>
            </div>
            <div className={styles.navRight}>
                <a href="/" className={styles.link}>Home</a>
                <a href="/about" className={styles.link}>About Us</a>
                <a href="/login" className={styles.link}>Login</a>
            </div>
        </div>
    );
}
