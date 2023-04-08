import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/user';

interface IGuestProps {
    title: string;
    children: ReactNode;
}

const Guest: React.FC<IGuestProps> = ({ title, children }: IGuestProps) => {
    const isAuth = isLoggedIn();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = title + ' | School Admission';

        if (isAuth) {
            navigate('/');
        }
    }, [title]);

    return <>{children}</>;
};

export default Guest;
