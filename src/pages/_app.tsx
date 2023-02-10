import type {AppProps} from 'next/app'
import Layout from "@/components/Layout/Layout";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import '@/pages/global_styles.scss';
import {I18nProvider, LOCALES} from "@/i18n";
import translate from "@/i18n/translate";
import React, {useState} from "react";
import styles from './App.module.scss'

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {

    const [locale, setLocal] = useState(LOCALES.ENGLISH)

    return (
            <QueryClientProvider client={queryClient}>
                <I18nProvider locale={locale}>
                    <div className={styles.lang}>
                        {translate('hello')}
                        <div className={styles.btnWrap}>
                            <button className={styles.button} onClick={() => {setLocal(LOCALES.ENGLISH)}}>Eng</button>
                            <button className={styles.button}  onClick={() => {setLocal(LOCALES.GERMAN)}}>De</button>
                        </div>
                    </div>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </I18nProvider>
            </QueryClientProvider>
    )
}
