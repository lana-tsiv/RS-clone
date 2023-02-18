import React, {FormEvent, useEffect, useState} from 'react';
import styles from './manage-account.module.scss';
import User from '@/../public/icons/user.svg';
import Security from '@/../public/icons/security.svg';
import Delete from '@/../public/icons/delete.svg';
import {onAuthStateChanged, updateProfile} from "firebase/auth";
import {auth} from "@/firebaseClient/clientApp";

const ManageAccount = () => {
    const [currentTab, setCurrentTab] = useState(1)

    const handleClickBasicInfo = (num: number) => {
        setCurrentTab(num);
    }

    const handleClickPassword = (num: number) => {
        setCurrentTab(num);
    }

    const handleClickDelete = (num: number) => {
        setCurrentTab(num);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftSection}>
                <p className={styles.title}>Account Settings</p>
                <div
                    className={styles.sidebarItemWrap}
                    onClick={() => handleClickBasicInfo(1)}
                >
                    <div className={currentTab === 1 ? styles.sidebarItemActive : styles.sidebarItemDeActive}>
                        <img className={styles.icon} src={User.src} alt='user'/>
                        <p>Basic Information</p>
                    </div>
                </div>
                <div
                    className={styles.sidebarItemWrap}
                    onClick={() => handleClickPassword(2)}
                >
                    <div className={currentTab === 2 ? styles.sidebarItemActive : styles.sidebarItemDeActive}>
                        <img className={styles.icon} src={Security.src} alt='security'/>
                        <p>Password &
                            Security</p>
                    </div>
                </div>
                <div
                    className={styles.sidebarItemWrap}
                    onClick={() => handleClickDelete(3)}
                >
                    <div className={currentTab === 3 ? styles.sidebarItemActive : styles.sidebarItemDeActive}>
                        <img className={styles.icon} src={Delete.src} alt='delete'/>
                        <p>Delete account</p>
                    </div>
                </div>
            </div>


            <div className={styles.rightSection}>
                {currentTab === 1 && <BasicInfo/>}
                {currentTab === 2 && <Password/>}
                {currentTab === 3 && <DeleteAccount/>}
            </div>
        </div>
    );
};

const BasicInfo = () => {

    const [currentName, setCurrentName] = useState('');
    const [textName, setTextName] = useState('');

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProfile(auth.currentUser!, {
            displayName: textName
        }).then(() => {
            setCurrentName(textName!);
            setTextName('');
            console.log('was updated');
        }).catch((err) => {
            console.log(err.message)
        })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const currentUserName = auth.currentUser?.displayName;
                setTextName('')
                setCurrentName(currentUserName!)
            } else {
                console.log('Not found')
            }
        })
    }, [])


    return (
        <div>
            <p className={styles.title}>Basic Information</p>
            <div className={styles.BasicInfoWrap}>
                <p className={styles.name}>{currentName}</p>
                <p className={styles.text}>This will be displayed on your profile.</p>
                <form className={styles.form} onSubmit={onSubmit}>
                    <textarea
                        className={styles.textarea}
                        value={textName}
                        onChange={(event) => setTextName(event.target.value)}
                        placeholder={currentName!}
                    />
                    <div className={styles.btnWrapper}>

                        <button
                            className={styles.button}
                            disabled={textName.length < 1}
                        >
                            Update Name
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const Password = () => {
    return (
        <div>
            <p className={styles.title}>Password & Security</p>
        </div>
    )
}

const DeleteAccount = () => {
    return (
        <div>
            <p className={styles.title}>Delete your account</p>
        </div>
    )
}

export default ManageAccount;