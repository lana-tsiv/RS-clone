import React, {FormEvent, useEffect, useState} from 'react';
import styles from './manage-account.module.scss';
import User from '@/../public/icons/user.svg';
import Security from '@/../public/icons/security.svg';
import Delete from '@/../public/icons/delete.svg';
import {
    EmailAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    updateEmail, updatePassword,
    updateProfile,
} from "firebase/auth";
import {auth} from "@/firebaseClient/clientApp";
import FormButton from "@/components/common/FormButton";
import FormInput from "@/components/common/FormInput";
import HideIcon from '@/../public/icons/eyehide.svg';

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
                    <FormInput
                        type={'text'}
                        value={textName}
                        placeholder={currentName!}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTextName(event.target.value)}
                    />
                    <FormButton text={'Update Name'} disabled={textName.length < 1}/>
                </form>
            </div>
        </div>
    )
}

const Password = () => {
    const [currentEmail, setCurrentEmail] = useState('');
    const [email, setEmail] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordChange = () => {
        setShowPassword(!showPassword);
    };

    const promptForCredentials = async () => {
        const email = prompt('Please enter your current email:');
        const password = prompt('Please enter your current password:');
        if (!email || !password) {
            throw new Error('Missing credentials');
        }
        return EmailAuthProvider.credential(email, password);
    };

    const onSubmitEmail = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = auth.currentUser;
        promptForCredentials()
            .then((credential) => {
                return reauthenticateWithCredential(user!, credential);
            })
            .then(() => {
                const newEmail = email.trim();
                if (!newEmail) {
                    throw new Error('Missing email');
                }
                return updateEmail(user!, newEmail);
            })
            .then(() => {
                setCurrentEmail(email);
                setEmail('');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const onSubmitPassword = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = auth.currentUser;
        promptForCredentials()
            .then((credential) => {
                return reauthenticateWithCredential(user!, credential);
            })
            .then(() => {
                return updatePassword(user!, newPassword);
            })
            .then(() => {
                setNewPassword('');
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const currentUserEmail = auth.currentUser?.email;
                setEmail('')
                setCurrentEmail(currentUserEmail!)
            } else {
                console.log('Not found')
            }
        })
    }, [])

    return (
        <div>
            <p className={styles.title}>Password & Security</p>
            <div className={styles.PasswordWrap}>
                <form className={styles.form} onSubmit={onSubmitEmail}>
                    <label className={styles.label}>Enter new email</label>
                    <FormInput
                        type={'email'}
                        value={email}
                        placeholder={currentEmail!}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                    />
                    <FormButton text={'Update Email'} disabled={email.length < 1}/>
                </form>
                <form className={styles.form} onSubmit={onSubmitPassword}>
                    <label className={styles.label}>Enter new password</label>
                    <FormInput
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        placeholder={'Password'}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value)}
                    />
                    <FormButton text={'Update Password'} disabled={newPassword.length < 6}/>
                </form>
                <div className={showPassword ? styles.passwordActive : styles.passwordDeActive}
                     onClick={handleShowPasswordChange}>
                    <img className={styles.hideIcon} src={HideIcon.src} alt={'open-hide'}/>
                    <p className={styles.textIcon}>Show password</p>
                </div>
            </div>
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