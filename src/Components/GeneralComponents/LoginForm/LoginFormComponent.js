import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import LoginContext from './../../../Contexts/LoginContext';

function LoginFormComponent(props) {

    const loginContext = useContext(LoginContext);

    return (
        <div className="w-100 min-vh-100 d-flex align-items-center justify-content-center bg-dark">
            <Button onClick={loginContext.changeLoginStatus} variant="primary" className="btn-lg">ورود به سایت</Button>
        </div>
    )
}

export default LoginFormComponent;