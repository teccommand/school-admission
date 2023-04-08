import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//  Components
import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import Logout from '../pages/Auth/Logout';
import Error from '../pages/Error/Error';
import { PATH } from '../constants/path';
import Course from '../pages/Course/Index';
import ClassRoom from '../pages/ClassRoom/Index';

const RouterApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/logout" element={<Logout />}></Route>

                <Route path={PATH.DASHBOARD} element={<Home />}></Route>
                <Route path={PATH.COURSE} element={<Course />}></Route>
                <Route path={PATH.CLASS_ROOM} element={<ClassRoom />}></Route>

                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
};

export default RouterApp;
