import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Task = ({ ...props }) => {

    const { id, title } = props.currTask;

    return (
        <>
            <div className="task-body" key={id}>
                <p className="task-content">{title}</p>
                <FiEdit className="btns btn-edit" onClick={() => { props.editTask(id) }} />
                <MdOutlineDeleteOutline className="btns btn-delete" onClick={() => { props.deleteTask(id) }} />
            </div>
        </>
    );
}

export default Task;