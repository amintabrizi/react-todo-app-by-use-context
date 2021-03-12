import { useContext } from 'react';
import { Navbar,Nav,Button } from 'react-bootstrap';
import LoginContext from './../../../Contexts/LoginContext';


function NavbarComponent(props) {

    const loginContext = useContext(LoginContext);

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Todos Manager</Navbar.Brand>
            <Nav className="ml-auto mr-1">
                <Nav.Link href="#home">صفحه اصلی</Nav.Link>
                <Nav.Link href="#about-us">درباره ما</Nav.Link>
                <Nav.Link href="#contact-us">تماس با ما</Nav.Link>
            </Nav>
            <Button onClick={loginContext.changeLoginStatus} variant="primary" className={`btn-sm ${loginContext.loginStatus ? 'btn-danger' : 'btn-success'}`}>{loginContext.loginStatus ? 'خارج شوید' : 'وارد به سایت'}</Button>
        </Navbar>
    )

}

export default NavbarComponent;