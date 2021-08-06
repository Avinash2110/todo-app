import React, {useContext, useState, useEffect} from 'react'
import "./Todo.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import {todoContext} from "../todoContext";


const Todo = () => {

    const [inputdata, setInputData] = useState("");
    const [todoList, setTodoList] = useContext(todoContext);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState("");

    const handleTodoAdd = () =>{
        if(inputdata){
            const item = {
                id: Date.now(),
                data: inputdata
            }
            setTodoList([...todoList, item]);
            const list = [...todoList, item];
            localStorage.setItem("todoList", JSON.stringify(list));
            setInputData("");
        }
    }

    const handleEnterTodoAdd = (event) =>{
        if(event.key === "Enter"){
            handleTodoAdd();
        }
    }

    const handleDeleteAllTodo = () =>{
        setTodoList([]);
        localStorage.removeItem("todoList");
    }

    const handleRemoveTodo = (id) =>{
        const newList = todoList.filter(item => item.id !== id);
        setTodoList(newList);
        localStorage.removeItem("todoList");
        localStorage.setItem("todoList", JSON.stringify(newList));
    }

    const handleEditTodo = (message, id) =>{
        setInputData(message);
        setIsEdit(true);
        setEditId(id);
    }

    const handleModifyTodo = (message, id) =>{
        const newTodo = {
            id: id,
            data: message
        }

        const newList = [];
        todoList.forEach(item =>{
            if(item.id === id){
                newList.push(newTodo);
            }
            else{
                newList.push(item);
            }
        })

        setTodoList(newList);
        setIsEdit(false);
        setEditId("");
        setInputData("");
        localStorage.removeItem("todoList");
        localStorage.setItem("todoList", JSON.stringify(newList));
    }

    useEffect(() =>{
        if(localStorage.getItem("todoList")){
            const list = JSON.parse(localStorage.getItem("todoList"));
            setTodoList(list);
        }

    }, [])

    return (
        <div className="todo-container">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter todo"
                    className="input" 
                    value={inputdata}
                    onChange={(e) => setInputData(e.target.value)}
                    onKeyDown={(event) =>handleEnterTodoAdd(event)}
                />
                {   isEdit ? (
                        <button className="btn" style={{backgroundColor: "#1FAA59"}} onClick={() => handleModifyTodo(inputdata, editId)}>Modify</button>
                    ):(
                        <button className="btn" style={{backgroundColor: "#1FAA59"}} onClick={() =>handleTodoAdd()}>Add</button>
                    )
                }
                <button className="btn" style={{backgroundColor: "#D82E2F"}} onClick={() => handleDeleteAllTodo()}>Delete</button>
            </div>
            <div className="todo-list-container">
                {
                    todoList.map((item) =>{
                        return(
                            <div className="todo-card" key={item.id}>
                                <h3 className="todo">{item.data}</h3>
                                <span className="icons" onClick={()=> handleEditTodo(item.data, item.id)}><FaRegEdit style={{width: "20px", height: "20px"}}/></span>
                                <span className="icons" onClick={() => handleRemoveTodo(item.id)}><RiDeleteBinLine style={{width: "20px", height: "20px"}}/></span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Todo
