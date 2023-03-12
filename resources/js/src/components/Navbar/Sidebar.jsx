import { useEffect, useState } from 'react';
import { Navbar } from '@mantine/core';
import { useLocation, useNavigate } from "react-router-dom";
import { SIDEBAR } from '../../constants/path';
import useStyles from './SidebarStyle';

const Sidebar = (props) => {
    const { classes, cx } = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [url, setUrl] = useState("");

    const pushPage = (link) => {
        if (url !== link) {
            navigate(link, { replace: true });
        }
    }

    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);
    
    const links = SIDEBAR.map((item) => (
        <a
            className={cx(classes.link, { [classes.linkActive]: item.link === url })}
            href={"#"}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                pushPage(item.link);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <Navbar height={700} hidden={!props.hidden} width={{ md: 250 }} p="md">
            <Navbar.Section grow>
                {links}
            </Navbar.Section>
        </Navbar>
    );
}

export default Sidebar;