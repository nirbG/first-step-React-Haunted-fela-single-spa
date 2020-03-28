import React, { useContext, useState} from 'react'
import UserContext from './UserContext'
import Profile from "./Profile";
import Tasks from "./Tasks";
import AddTaskForm from "./forms/AddTaskForm";
import EditUserForm from "./forms/EditUserForm";

const HomePage  = props => {
    // Context API
    const cont = useContext(UserContext);
    const { user, setUser } = cont;
    // Hook
    const [editing, setEditing] = useState(false);
    const [log, setLog] = useState(false);

    /**
     * charge les donnees (le profile + les taches)
     */
    const logIn = () => {
        setLog(true);
        const newUser = {
            name:'Gauthier',
            surname:'Brin',
            address: {
                num:'1',
                street:'jesais',
                city:'pas',
                country:'no where',
            },
            tasks : [
                {id:1,title:'Haunted',desc:'Jouer avec haunted',done:true},
                {id:2,title:'React',desc:'tester Context API',done:false},
                {id:3,title:'fela',desc:'Faire du css dynamique',done:false},
                {id:4,title:'Hasura',desc:'Read Model',done:true},
            ],
        };
        setUser(newUser)
    };

    /**
     * supp les donnees
     */
    const logOut = () => {
        setLog(false);
        const newUser = {};
        setUser(newUser)
    };

    return (
        <div className="container">
            <div>
                <button style={{'float':'right','color':'white'}} onClick={() =>   log ? logOut(): logIn()}>
                    { !log ? 'LogIn' : 'LogOut'}
                </button>
                <h3>CRUD App with Hooks & Context API</h3>
            </div>
            { log && (
                <div>
                    <div>
                        <h4> <span onClick={() => setEditing(!editing)}>🖊️</span>Profile</h4>
                        <Profile/>
                    </div>
                    <div className="flex-row">
                        <div className="flex-large">
                            <h5>Add Task</h5>
                            <AddTaskForm/>
                        </div>
                        <div className="flex-large">
                            <Tasks/>
                        </div>
                    </div>
                    { editing && (
                        <div className="flex-row">
                            <div className="flex-large">
                                <EditUserForm />
                            </div>
                        </div>) }
                </div>)}
        </div>
    )
};
export default HomePage