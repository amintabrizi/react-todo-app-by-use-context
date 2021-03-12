import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import TodoContext from './../../../../Contexts/TodoContext'
function BtnsComponent(props) {

    const todoContext = useContext(TodoContext)
    
    return (
        <>
            <Button onClick={() => todoContext.handleDeleteTodo(props.item.todoKey)} variant="danger" className="btn-sm ml-2">پاک کردن</Button>
            <Button onClick={() => todoContext.handleEditTodoClick(props.item.todoKey)} variant="info" className="btn-sm ml-2">ویرایش</Button>
            <Button onClick={() => todoContext.handlEditTodoStatus(props.item.todoKey)} className={`btn-sm ml-2 ${props.item.todoStatus ? 'btn-success' : 'btn-warning'}`}>{props.item.todoStatus ? 'انجام شده' : 'انجام نشده'}</Button>
        </>
    )
}

export default BtnsComponent;