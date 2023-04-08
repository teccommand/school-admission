import { IconBook2, IconChalkboard, IconHome2 } from '@tabler/icons';

export const PATH = {
    LOGIN: '/login',
    Logout: '/logout',

    DASHBOARD: '/',
    COURSE: '/course',
    CLASS_ROOM: '/class-room',
};

export const TITLE = {
    DASHBOARD: 'หน้าแรก',
    COURSE: 'หลักสูตร',
    CLASS_ROOM: 'ชั้นเรียน',
};

export const SIDEBAR = [
    { link: PATH.DASHBOARD, label: TITLE.DASHBOARD, icon: IconHome2 },
    { link: PATH.COURSE, label: TITLE.COURSE, icon: IconBook2 },
    { link: PATH.CLASS_ROOM, label: TITLE.CLASS_ROOM, icon: IconChalkboard },
];
