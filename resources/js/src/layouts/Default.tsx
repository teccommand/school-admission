import {
    Anchor,
    AppShell,
    Breadcrumbs,
    Burger,
    Container,
    Flex,
    Header,
    MediaQuery,
    Text,
    useMantineTheme,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import useStyles from './DefaultStyle';
import NavbarDropdown from '../components/Navbar/NavbarDropdown';
import { getUser, isLoggedIn } from '../utils/user';
import Sidebar from '../components/Navbar/Sidebar';
import { useNavigate } from 'react-router-dom';

interface IBreadcrumb {
    title: string;
    href: string;
}

interface IProps {
    breadcrumbs?: IBreadcrumb[];
    title: string;
    children: React.ReactNode;
}

const Default: React.FC<IProps> = (props) => {
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const user = getUser();
    const isAuth = isLoggedIn();
    const navigate = useNavigate();

    const renderBreadcrumbs = () => {
        if (props.breadcrumbs) {
            return props.breadcrumbs.map((item, index) => (
                <Anchor href={item.href} key={index}>
                    {item.title}
                </Anchor>
            ));
        }
    };

    useEffect(() => {
        document.title = props.title + ' | School Admission';

        if (!isAuth) {
            navigate('/login');
        }
    }, [props.title]);

    return (
        <AppShell
            padding="md"
            navbar={<Sidebar hidden={opened}></Sidebar>}
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <MediaQuery
                            largerThan="md"
                            styles={{ display: 'none' }}
                        >
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <div className={classes.inner}>
                            <Text fw={500}>ระบบรับสมัครนักเรียน</Text>

                            <NavbarDropdown user={user}></NavbarDropdown>
                        </div>
                    </div>
                </Header>
            }
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
        >
            <Container style={{ marginTop: 10, marginBottom: 20 }}>
                <Flex
                    justify="space-between"
                    style={{ marginTop: 5, marginBottom: 10, width: '100%' }}
                >
                    <Text size="xl" fw="bold">
                        {props.title}
                    </Text>
                    <Breadcrumbs separator="→" mt="xs">
                        {renderBreadcrumbs()}
                    </Breadcrumbs>
                </Flex>

                {props.children}
            </Container>
        </AppShell>
    );
};

export default Default;
