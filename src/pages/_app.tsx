import type {AppProps} from 'next/app'
import Layout from "@/components/Layout/Layout";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/pages/global_styles.scss';

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
        </QueryClientProvider>
    )
}
