import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Button from '../components/common/Button/Button';
import Feed from '@/components/Feed';

export default function Home() {
  return (
    <div>
      <div>Hello, project</div>
      <Feed/>
      <Button 
        text="Click me"
        clickHandler={() => console.log('click')}
      />
    </div>
  )
}
