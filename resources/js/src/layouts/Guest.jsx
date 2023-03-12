import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/user';

const Default = (props) => {
    const isAuth = isLoggedIn();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = props.title + " | School Admission";

        if (isAuth) {
            navigate('/')
        }
    }, [props.title]);

    return (
        <>
            {props.children}
        </>
    );
}

export default Default;