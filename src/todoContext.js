import React, {useState, createContext} from "react";


export const todoContext = createContext();

export const TodoProvider = (props) =>{
    const [todoList, setTodoList] = useState([]);

    return(
        <todoContext.Provider value={[todoList, setTodoList]}>
            {props.children}
        </todoContext.Provider>
    )
}