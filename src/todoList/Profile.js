import React, { Component } from 'react'
import UserContext from './UserContext'

class Profile extends Component {
    static contextType = UserContext;

    render() {
        // Context API
        const {user} = this.context;
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Name : {user.name}</td>
                            <td >Surname : {user.surname}</td>
                            <td >Count Task : {user.tasks.length}</td>
                            <td >Task Done : {user.tasks.filter(_ => _.done).length}</td>
                        </tr>
                        <tr>
                            <td>Num : {user.address.num}</td>
                            <td>Street : {user.address.street}</td>
                            <td>City : {user.address.city}</td>
                            <td>Country : {user.address.country}</td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                            {user.tasks.map( task => (
                                task.done ? (<strong key={task.id}>{task.title}/</strong>):
                                    (<span key={task.id}>{task.title}/</span>)
                            )
                            )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Profile