import { useContext } from 'react';
import { Toast,Row,Col } from 'react-bootstrap';

import ToastContext from '../../../Contexts/ToastContext'

function ToastComponent(props) {
    const toastContext = useContext(ToastContext);

    return (
        <Row>
            <Col xs={6}>
                <Toast onClose={toastContext.handleToastClose} show={toastContext.toastShow} delay={3000} autohide>
                    <Toast.Header className={`${toastContext.toastInfo.bg} text-white`}>
                        <strong className="ml-auto ml-1">{toastContext.toastInfo.title}</strong>
                    </Toast.Header>
                    <Toast.Body className="d-flex flex-column">
                        {toastContext.toastInfo.body}
                        <small className="mr-auto">{toastContext.toastInfo.time}</small>
                    </Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}

export default ToastComponent;