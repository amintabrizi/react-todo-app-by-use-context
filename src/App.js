import React, { useState, useCallback, useEffect } from 'react';
import './App.css';

//import axios
import AxiosConfig from './Axios/AxiosConfig';

//contexts
import LoginContext from './Contexts/LoginContext';
import ToastContext from './Contexts/ToastContext';
import TodoContext from './Contexts/TodoContext';

//components
import NavbarComponent from './Components/HeaderComponents/Navbar/NavbarComponent';
import FormComponent from './Components/HeaderComponents/FormSection/FormComponent';
import TodosListComponent from './Components/MainComponents/TodosComponents/TodosList';
import ModalComponent from './Components/GeneralComponents/Modal/ModalComponent';
import LoginFormComponent from './Components/GeneralComponents/LoginForm/LoginFormComponent';
import ToastComponent from './Components/GeneralComponents/Toast/ToastComponent';

function App() {

  const [login, setLogin] = useState(true);
  const [todos, setTodos] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastInfo, setToastInfo] = useState({});
  const [selectedTodoInfo,setSelectedTodoInfo] = useState({});

  let handleLoginStatus = () => {

    setLogin(!login);

    if (!login) {
      handleToastShow('وضعیت ورود', 'وارد شدید', 'bg-success');
    } else {
      handleToastShow('وضعیت ورود', 'خارج شدید', 'bg-danger');
    }

  }

  let modalHandler = () => setModalShow(true);

  let handleToastShow = (toastTitle, toastBody, toastBg) => {
    setToastShow(!toastShow);
    setToastInfo({
      'time': 'لحظاتی پیش',
      'title': toastTitle,
      'body': toastBody,
      'bg': toastBg
    })
  }

  let handleToastClose = () => {
    setToastShow(false);
  }

  //add todo Functions
  let addTodoHandler = (todoTitle) => {
    AxiosConfig.post('/todos.json', { todoTitle, 'todoStatus': false })
      .then((response) => {
        setTodos(prevState => {
          return (
            [...prevState, { 'todoKey': response.data.name, todoTitle, 'todoStatus': false }]
          )
        });
        handleToastShow('وضعیت درخواست', 'درخواست ایجاد برنامه ریزی انجام شد', 'bg-success');
      })
      .catch((error) => {
        handleToastShow('وضعیت درخواست', 'درخواست ایجاد برنامه ریزی انجام نشد', 'bg-danger');
      })
  }

  //delete todo function
  let handleDeleteTodo = (key) => {

    let copyTodos = [...todos];
    let newTodos = copyTodos.filter(item => item.todoKey !== key);
    setTodos(newTodos);

    AxiosConfig.delete(`/todos/${key}.json`)
      .then((response) => {
        handleToastShow('وضعیت درخواست', 'درخواست حذف انجام شد', 'bg-success');
      })
      .catch(() => {
        handleToastShow('وضعیت درخواست', 'درخواست حذف با مشکل مواجه شد', 'bg-danger');
      })

  }

  //handle edit todo status
  let handlEditTodoStatus = (key) => {

    let copyTodo = [...todos]

    let selectTodoIndex = copyTodo.findIndex(item => {
      return item.todoKey === key
    })

    let selectTodo = copyTodo[selectTodoIndex];

    selectTodo = {todoKey: key,todoStatus: !selectTodo.todoStatus,'todoTitle':selectTodo.todoTitle};

    let otherTodos = copyTodo.filter(item => {
      return item.todoKey !== key
    })
    
    setTodos([...otherTodos,selectTodo]);

    AxiosConfig.put(`/todos/${key}.json`,{todoStatus: selectTodo.todoStatus,'todoTitle':selectTodo.todoTitle})
      .then((response) => {
        handleToastShow('وضعیت درخواست', 'درخواست ویرایش انجام شد', 'bg-success');
      })
      .catch(() => {
        handleToastShow('وضعیت درخواست', 'درخواست ویرایش با مشکل مواجه شد', 'bg-danger');
      })

  }

  //get todos function
  useEffect(() => {

    AxiosConfig.get('/todos.json')
      .then((response) => {
        let loadedTodos = [];
        let responseData = response.data;
        for (const item in responseData) {
          loadedTodos.push({
            'todoKey': item,
            'todoTitle': responseData[item].todoTitle,
            'todoStatus': responseData[item].todoStatus,
          })
        }
        setTodos(loadedTodos);
      })
      .catch((error) => {
        handleToastShow('وضعیت درخواست', 'دریافت اطلاعات با مشکل مواجه شد', 'bg-danger');
      })

  }, [])

  let handleEditTodoClick = (key) => {
    modalHandler();
    getTodoInfo(key);
  }

  let getTodoInfo = (key) => {
    let FindTodo = todos.find(item => {
      return item.todoKey === key
    })
    setSelectedTodoInfo(FindTodo)
  }

  //handle edit todo status
  let handleEditTodoTitle = (key,title) => {

    let copyTodo = [...todos]

    let selectTodoIndex = copyTodo.findIndex(item => {
      return item.todoKey === key
    })

    let selectTodo = copyTodo[selectTodoIndex];

    selectTodo = {todoKey: key,todoStatus: selectTodo.todoStatus,'todoTitle':title};

    let otherTodos = copyTodo.filter(item => {
      return item.todoKey !== key
    })
    
    setTodos([...otherTodos,selectTodo]);

    AxiosConfig.put(`/todos/${key}.json`,{todoStatus: selectTodo.todoStatus,'todoTitle':title})
      .then((response) => {
        handleToastShow('وضعیت درخواست', 'درخواست ویرایش انجام شد', 'bg-success');
      })
      .catch(() => {
        handleToastShow('وضعیت درخواست', 'درخواست ویرایش با مشکل مواجه شد', 'bg-danger');
      })

  }
  
  return (
    <ToastContext.Provider value={{
      'toastShow': toastShow,
      'toastInfo': toastInfo,
      'handleToastShow': handleToastShow,
      'handleToastClose': handleToastClose
    }}>

      <LoginContext.Provider value={{
        'loginStatus': login,
        'changeLoginStatus': handleLoginStatus
      }}>

        <TodoContext.Provider value={{
          addTodoHandler,
          todos,
          handleDeleteTodo,
          handlEditTodoStatus,
          modalHandler,
          handleEditTodoClick,
          handleEditTodoTitle
        }}>

          {
            login
              ?
              <>
                <NavbarComponent />
                <FormComponent />
                <TodosListComponent />
                <ModalComponent edit_todo_title={handleEditTodoTitle} show={modalShow} selecttodoinfo={selectedTodoInfo} onHide={() => setModalShow(false)} />
              </>
              :
              <LoginFormComponent />
          }

          <>
            <ToastComponent />
          </>

        </TodoContext.Provider>
      </LoginContext.Provider>

    </ToastContext.Provider>
  );
}

export default App;
