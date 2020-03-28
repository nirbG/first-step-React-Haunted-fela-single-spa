import React, {useContext} from 'react'
import OrderContext from "../OrderContext";

const OrdersTable = props => {
    // Context API
    const cont = useContext(OrderContext);
    const {orders,env, setOrders,setEnv } = cont;
    /**
     * supprime une commande
     * @param id de la commande
     */
    const deleteUser = id => {
        // console.log(token);
        fetch(`http://192.168.99.100:8000/orders/`+id,
            {
                method: "DELETE",
                headers: new Headers({
                    'Authorization' : env.token,
                    'Origin': '',
                }),
            }).then(response => response).
        then(json => {
                //setOrders(orders.map(order => (order.id === id ? updatedOrder : order)))
                setOrders(orders.filter(order => order.id !== id));
            }
        );
    };

    return (
        <table>
            <thead>
            <tr>
                <th>
                    <>Id</>
                    </th>
                <th>Status</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {orders.length > 0 ? (
                orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>Name coming soon</td>
                        <td>{order.status}</td>
                        <td>
                            <button
                                onClick={() => {
                                    props.editRow(order)
                                }} className="button muted-button">
                                Edit
                            </button>
                            <button onClick={() => deleteUser(order.id)} className="button muted-button">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3}>No Orders</td>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default OrdersTable