import { Button, Menu, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconUser, IconLogout } from '@tabler/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IUser {
    name: string;
}

interface IProps {
    user: IUser;
}

const NavbarDropdown: React.FC<IProps> = ({ user }) => {
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const pushPage = (link: string) => {
        navigate(link);
    };

    return (
        <Menu
            transitionProps={{ transition: 'pop-top-right', duration: 150 }}
            position="top-end"
            width={150}
            withinPortal
        >
            <Menu.Target>
                <Button
                    rightIcon={<IconChevronDown size={18} stroke={1.5} />}
                    pr={12}
                >
                    {user.name}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    onClick={() => pushPage('/profile')}
                    icon={
                        <IconUser
                            size={16}
                            color={theme.colors.blue[6]}
                            stroke={1.5}
                        />
                    }
                >
                    Profile
                </Menu.Item>
                <Menu.Item
                    onClick={() => pushPage('/logout')}
                    icon={
                        <IconLogout
                            size={16}
                            color={theme.colors.blue[6]}
                            stroke={1.5}
                        />
                    }
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default NavbarDropdown;
