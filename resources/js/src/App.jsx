import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import RouterApp from './routes/Routes';
import { ModalsProvider } from '@mantine/modals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{
            components: {
                Button: {
                    sizes: {
                        base: () => ({
                            root: {
                                height: '1.25rem',
                                padding: '0.3125rem',
                                fontSize: '0.1rem',
                            },
                        }),
                    },
                },
            },
        }}>
            <ModalsProvider>
                <ToastContainer theme='colored' />
                <RouterApp />
            </ModalsProvider>
        </MantineProvider>
    )
}
