import React, {useContext, useState} from 'react'
import UserContext from "../UserContext";

const AddTaskForm = props => {
    // Context API
    const cont = useContext(UserContext);
    const { user, setUser } = cont;
    //initial state
    const initialFormState = {id: null, title: '', desc: '', done: false};
    // hook
    const [task, setTask] = useState(initialFormState);
    // handler
    const  handleInputChange = event => {
        const {name , value} =event.target;
        setTask({...task, [name]: value})
    };
    const addUser = task => {
        task.id = user.tasks.length + 1;
        user.tasks.push(task);
        setUser(user);
    };
    return (
        <form
            onSubmit={ event => {
                event.preventDefault();
                if (!task.title ) return
                addUser(task);
                setTask(initialFormState)
            }}>
            <label>Title *</label>
            <input type="text" name="title" value={task.title}
                   onChange={handleInputChange}/>
            <label>Description</label>
            <input type="text" name="desc" value={task.desc}
                   onChange={handleInputChange}/>
            <div>
                <label htmlFor="done">
                    <input style={{'position':'initial','opacity':1,'left':0,'margin':'1%'}}
                           onChange={() => setTask({...task, ['done']: !task.done})}
                           type="checkbox" id="done" name="done" checked={task.done}/>
                    Done
                </label>
            </div>
            <button style={{'float':'right','color':'white'}}>Add new task</button>
        </form>
    )
};
export default AddTaskForm;