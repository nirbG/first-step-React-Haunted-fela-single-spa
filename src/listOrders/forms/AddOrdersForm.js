import React, {useContext, useState} from 'react'
import OrderContext from "../OrderContext";

const AddUserForm = props => {
    // init state
    const initialFormState = { id: null, name: '', status: 'Open' };
    // Context API
    const cont = useContext(OrderContext);
    const {orders,env, setOrders,setEnv } = cont;
    //hooks
    const [order, setOrder] = useState(initialFormState);
    // handler des Input
    const handleInputChange = event => {
        const { name, value } = event.target;
        setOrder({ ...order, [name]: value })
    };
    /**
     * ajoute une order
     * @param order
     */
    const addOrder = order => {
        // console.log(token);
        fetch(`http://192.168.99.100:8000/orders`,
            {
                method: "POST",
                headers: new Headers({
                    'Authorization' : env.token,
                    'Origin': '',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),

            }).then(response => response.json()).
        then(json => {
            console.log(json);
                setOrders([...orders, json])
            }
        )
    };
    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                if (!order.name || !order.status) return
                addOrder(order);
                setOrder(initialFormState);
            }}>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label>Id</label>
                        <input type="text" disabled name="id" value="généré automatiquement" onChange={handleInputChange} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Name</label>
                        <input type="text" name="name" value={order.name} onChange={handleInputChange} />
                    </td>
                </tr>
                    <tr>
                        <td>
                            <label htmlFor="cars">Choose a status :</label>
                            <select disabled style={{'display':'block'}} name='status'
                            value={order.status}
                                onChange={handleInputChange}>
                                <option value="Open">Open</option>
                                <option value="Processing">Processing</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:'right'}}>
                            <button style={{'color':'white'}}>Add new order</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
};

export default AddUserForm