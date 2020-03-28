import React, {useState, useEffect, useContext} from 'react'
import OrderContext from "../OrderContext";
import socketIOClient from "socket.io-client"

const EditOrdersForm = props => {
    // Context API
    const cont = useContext(OrderContext);
    const {orders,env, setOrders,setEnv } = cont;
    // hook
    const [order, setOrder] = useState(props.currentOrder);
    // handler des Inputs
    const handleInputChange = event => {
        const { name, value } = event.target;

        setOrder({ ...order, [name]: value })
    };
    // useEffect qui met a jour la commande courante
    useEffect(() => {
        setOrder(props.currentOrder)
    }, [props]);

    // SOCKET
    // let ws = new socketIOClient('http://192.168.99.100:3001');
    // ws.onopen = () => {
    //     // on connecting, do nothing but log it to the console
    //     console.log('connected')
    // };
    //
    // ws.onmessage = evt => {
    //     // listen to data sent from the websocket server
    //     const message = JSON.parse(evt.data);
    //     console.log(message);
    //
    //     ws.onclose = () => {
    //         console.log('disconnected')
    //         // automatically try to reconnect on connection loss
    //
    //     };
    // };
    /**
     * modifie une commande
     * @param id
     * @param updatedOrder
     */
    const updateOrder = (id, updatedOrder) => {

        // console.log(token);
        fetch(`http://192.168.99.100:8000/orders/`+id,
            {
                method: "PUT",
                headers: new Headers({
                    'Authorization' : env.token,
                    'Origin': '',
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    status :order.status,
                })
            }).then(response => response).
        then(json => {
                //setOrders(orders.map(order => (order.id === id ? updatedOrder : order)))
                props.updateOrder(false);
                //console.log(json);
                setOrders(orders.map(_ => (_.id === id ? order : _)))
            }
        );
    };
    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                updateOrder(order.id, order)
            }}>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label>Id</label>
                        <input type="text" disabled name="id" value={order.id} onChange={handleInputChange} />
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
                        <select style={{'display':'block'}} name='status'
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
                        <button style={{'color':'white'}}>Update user</button>
                        <button style={{'marginLeft':'2%'}} onClick={() => props.setEditing(false)} className=" muted-button">
                            Cancel
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    )
};

export default EditOrdersForm