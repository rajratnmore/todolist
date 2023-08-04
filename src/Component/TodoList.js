import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { RiAddBoxFill } from "react-icons/ri";
import { LiaListAlt } from "react-icons/lia";
import Task from "./Task";

const getLocalData = () => {
    const localData = localStorage.getItem("todolist");
    if (localData) {
        return JSON.parse(localData);
    } else {
        return [];
    }
}
const TodoList = () => {

    const [task, setTask] = useState("");
    const [editId, setEditId] = useState();
    const [listOfTask, setListOfTask] = useState(getLocalData);

    const updateTask = (event) => {
        setTask(event.target.value);
    }

    const addTask = () => {
        if (task === "") {
            return;
        }

        if (editId !== undefined) {
            const editedList = listOfTask.map((currTask) => {
                if (currTask.id === editId) {
                    currTask.title = task;
                }
                return currTask;
            });
            setListOfTask(editedList);
            setEditId();
            setTask("");
            return;
        }

        setListOfTask(
            [
                ...listOfTask,
                {
                    id: new Date().getTime().toString(),
                    title: task
                }
            ]
        );
        setTask("");
    }

    const editTask = (id) => {

        const taskObj = listOfTask.find((currTask) => {
            return (currTask.id === id);
        });

        setEditId(taskObj.id);
        setTask(taskObj.title);
    }

    const deleteTask = (id) => {
        const newTask = listOfTask.filter((currTask) => {
            return (currTask.id !== id);
        });
        setListOfTask(newTask);
    }

    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(listOfTask));
    }, [listOfTask]);

    return (
        <>
            <div className="list-container">
                <h3 className="heading"> <LiaListAlt/> To do List</h3>
                <div className="task-input">
                    <Form.Control className="input-area"
                        type="text"
                        placeholder="Enter Your Task"
                        onChange={(event) => { updateTask(event) }}
                        value={task}
                    />
                    <RiAddBoxFill className="taskbtn" onClick={() => { addTask() }} />
                </div>
                <div className="task-container">
                    {
                        listOfTask.map((currTask) => {
                            return <Task key={currTask.id} currTask={currTask} editTask={editTask} deleteTask={deleteTask} />
                        })
                    }
                </div>
                <Button variant="outline-warning" className="revome-btn" onClick={() => { setListOfTask([]) }}>Clear All</Button>
            </div>
        </>
    );
}

export default TodoList;