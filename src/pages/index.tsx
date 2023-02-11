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
