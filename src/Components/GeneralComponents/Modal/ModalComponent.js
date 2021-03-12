import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import './ModalComponent.css'

function ModalComponent(props) {
    const [title, setTitle] = useState('');

    useEffect(()=>{
        setTitle(props.selecttodoinfo.todoTitle);
    },[props.selecttodoinfo.todoTitle]);

    let handleEditTodo = (e,key) => {
        e.preventDefault();
        props.edit_todo_title(key,title);
        props.onHide(false);
    }

    return (
        <Modal
            show = {props.show}
            onHide = {props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    ویرایش وظیفه
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => handleEditTodo(e,props.selecttodoinfo.todoKey)} inline className="flex-row-reverse w-100 justify-content-center direction-ltr">
                    <InputGroup size="md" className="mb-3">
                        <InputGroup.Prepend>
                            <Button type="submit" className="bg-info">ویرایش</Button>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => setTitle(e.target.value)} value={title || ''} className="text-right add-todo" aria-describedby="basic-addon1" />
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>بستن</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;