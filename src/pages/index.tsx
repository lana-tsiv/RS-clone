import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Button from '../components/common/Button/Button';
import Feed from '@/components/Feed';
import {useIntl} from "react-intl";

export default function Home() {
    const intl = useIntl();
    const text = intl.formatMessage({id: 'pages.index.button', defaultMessage: 'Click me'})
    return (
    <div>
      <Feed/>
    </div>
  )
}
