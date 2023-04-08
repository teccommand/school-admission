import { Card } from '@mantine/core';
import React from 'react';
import Layout from '../layouts/Default';
import { TITLE } from '../constants/path';

const Home: React.FC = () => {
    return (
        <Layout title={TITLE.DASHBOARD}>
            <Card shadow="sm">Hello world</Card>
        </Layout>
    );
};

export default Home;
