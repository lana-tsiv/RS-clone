import React, {useState} from "react";
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nProvider, LOCALES } from "@/i18n";
import translate from "@/i18n/translate";
import Layout from "@/components/Layout/Layout";

import { store } from '@/store/store';

import type { AppProps } from 'next/app'

import styles from './App.module.scss'
import '@/pages/global_styles.scss';

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {

    const [locale, setLocal] = useState(LOCALES.ENGLISH)

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <I18nProvider locale={locale}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </I18nProvider>
            </QueryClientProvider>
        </Provider>
    )
}
