import React, { useContext, useState} from 'react'
import UserContext from './UserContext'

const Tasks  = props => {
    // Context API
    const cont = useContext(UserContext);
    const { user, setUser } = cont;
    // Hook
    const [editing, setEditing] = useState(false);
    //handler
    const  handleInputChange = (event,task) => {
        const {name , value} =event.target;
        task={...task, [name]: value};
        user.tasks = user.tasks.map( _ => (_.id === task.id ? task : _));
        setUser(user);
    };
    return (
        <div>
            <h5><span onClick={() => setEditing(!editing)}>🖊️</span>Tasks</h5>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {user.tasks.length >0 ? (
                    user.tasks.map((task) => {
                        return (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{editing ? (<input type="text" name='title' onChange={
                                    (ev) => {handleInputChange(ev,task) }
                                } value={task.title}/>) : (task.title) }
                                </td>
                                <td>{editing ? (<input type="text" name='desc' onChange={
                                    (ev) => { handleInputChange(ev,task) }
                                } value={task.desc}/>) : (task.desc) }
                                </td>
                                <td>
                                    <div style={{float:"right",cursor:"pointer"}} onClick={() =>{
                                        user.tasks = user.tasks.filter(t => t.id !== task.id);
                                        setUser(user)}
                                    }>➖
                                    </div>
                                    <div style={{float:"right",cursor:"pointer"}}
                                            onClick={() => {
                                                user.tasks = user.tasks.map( t => (t.id === task.id ?
                                                    {id:t.id, title :t.title,desc:t.desc, done: !t.done} : t));
                                            setUser(user)
                                            } }>{task.done ? '✅' : '❌'}
                                    </div>
                                </td>
                            </tr>)})
                        ) : (
                            <tr>
                                <td colSpan={4}>No tasks</td>
                            </tr>)}
                </tbody>
            </table>
        </div>
    )
};

export default Tasks
