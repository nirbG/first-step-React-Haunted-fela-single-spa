import React, {useContext, useState} from 'react'
import UserContext from "../UserContext";

const EditUserForm = props => {
    // Context API
    const cont = useContext(UserContext);
    const { user, setUser } = cont;
    // Hook
    const [profile, setProfile] = useState(user);
    // handler
    const  handleInputChange = event => {
        const {name , value} =event.target;
        setProfile({...profile, [name]: value})
    };

    return (
        <fieldset>
            <legend>Edit profile</legend>
            <form
                onSubmit={ event => {
                    event.preventDefault();
                    if (!profile.name ) return
                    setUser(profile)
                }}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <label>Name :</label>
                            <input type="text" name="name" value={profile.name}
                                   onChange={handleInputChange}/>
                        </td>
                        <td>
                            <label>Surname :</label>
                            <input type="text" name="surname" value={profile.surname}
                                   onChange={handleInputChange}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button style={{'float':'right','color':'white'}}>Edit profile</button>
            </form>
        </fieldset>
    )
};
export default EditUserForm;