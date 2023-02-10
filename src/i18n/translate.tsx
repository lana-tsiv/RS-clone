import React from 'react';
import {FormattedMessage} from "react-intl";

const Translate = (id: string, value = {}) => {
    return (
        <FormattedMessage id={id} values={{...value}}/>
    );
};

export default Translate;