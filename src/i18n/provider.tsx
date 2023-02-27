import React, {Fragment, ReactNode} from 'react';
import {IntlProvider} from "react-intl";
import {LOCALES} from "@/i18n/locales";
import messages from "@/i18n/messages";

const Provider = ({children, locale = LOCALES.ENGLISH}: { children: ReactNode, locale: any }) => {
    return (
        <IntlProvider
            locale={locale}
            textComponent={Fragment}
            messages={messages[locale]}
        >
            {children}
        </IntlProvider>
    )
};

export default Provider;