import React from 'react';
import styles from './SideBarItem.module.scss'

interface SidebarItemProps {
    isActive: boolean;
    icon: string;
    alt: string;
    onClick: () => void;
    text: string;
}

const SideBarItem = ({isActive, icon, alt, onClick, text}: SidebarItemProps) => {
    return (
        <div className={styles.sidebarItemWrap} onClick={onClick}>
            <div className={isActive ? styles.sidebarItemActive : styles.sidebarItemDeActive}>
                <img className={styles.icon} src={icon} alt={alt}/>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default SideBarItem;