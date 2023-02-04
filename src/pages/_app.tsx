import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import {theme} from '@/chakra/theme'
import Layout from "@/components/Layout/Layout";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </QueryClientProvider>
    )
}
