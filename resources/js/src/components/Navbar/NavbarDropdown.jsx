import { Button, Menu, useMantineTheme } from '@mantine/core';
import {
    IconChevronDown,
    IconUser,
    IconLogout
} from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

const NavbarDropdown = ({ user }) => {
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const pushPage = (link) => {
        navigate(link);
    }

    return (
        <Menu transition="pop-top-right" position="top-end" width={150} withinPortal>
            <Menu.Target>
                <Button rightIcon={<IconChevronDown size={18} stroke={1.5} />} pr={12}>
                    {user.name}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    onClick={() => pushPage('/profile')}
                    icon={<IconUser size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                >
                    Profile
                </Menu.Item>
                <Menu.Item
                    onClick={() => pushPage('/logout')}
                    icon={<IconLogout size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default NavbarDropdown;
