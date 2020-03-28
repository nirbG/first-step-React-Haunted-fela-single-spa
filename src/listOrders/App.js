import React, {useContext, useState,useEffect} from 'react'
import OrderContext from "./OrderContext";
import AddOrdersForm from "./forms/AddOrdersForm";
import OrdersTable from "./tables/OrdersTable";
import EditOrdersForm from "./forms/EditOrdersForm";

const App = () => {
    // init state
    const initialFormState = { id: null, name: '', username: '' };
    // Context API
    const cont = useContext(OrderContext);
    const {orders,env, setOrders,setEnv } = cont;
    // HOOKS
    const [editing, setEditing] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(initialFormState);

    /**
     *  retourne la liste des orders
     * @param token
     */
    function useAuthorizationToken (token) {
        //console.log(token);
        fetch(`http://192.168.99.100:8000/orders`,
            {
                method: "GET",
                headers: new Headers({
                    'Authorization' : token,
                    'Origin': '',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),

            }).then(response => response.json()).
        then(json => {
                //console.log(json);
                setOrders(json);
            }
        )
    }

    /**
     * retourne le token du client
     * @param code
     */
    function fetchAuthorizationTokenWithCode(code) {
        // preparation des parametres
        const data2 = {
            client_id:env.client_id,
            client_secret: env.client_secret,
            code:code,
            grant_type:env.grant_type,
            redirect_uri:env.redirect_uri,
        };
        let param2 ='?';
        Object.entries(data2).map( ([key,value]) => param2+=key+'='+value+'&');
        fetch(`https://192.168.99.100:8443/orders/oauth2/token`+param2,
            {
                method: "POST",
                headers: {
                    'Host': 'app',
                },

            }).then(response => response.json()).
        then(json => {
            //console.log(json);
            setEnv({ ...env, token: json.token_type+' '+json.access_token});
            useAuthorizationToken(json.token_type+' '+json.access_token);
            }
        )
    }
    // lancé au lencement du composant
    useEffect(() => {
        // preparation des parametres
        const data = {
            client_id:env.client_id,
            response_type: 'code',
            provision_key:env.provision_key,
            authenticated_userid:env.authenticated_userid,
            scope:env.scope,
        };
        let param ='?';
        Object.entries(data).map( ([key,value]) => param+=key+'='+value+'&');
        fetch(`https://192.168.99.100:8443/orders/oauth2/authorize`+param,
            {
                method: "POST",
                headers: {
                   'Host': 'app',
                },

            }).then(response => response.json()).
            then(json => {
                //console.log(json);
                // redirect_uri	"http://192.168.99.100:8080/?code=5cDw61uSxFUx7B1ZaNMhSdE34LFSKeNA"
                setEnv({ ...env, code: json.redirect_uri.split('?code=')[1]});
                fetchAuthorizationTokenWithCode(json.redirect_uri.split('?code=')[1])
            }
        )},
        []);

    /**
     * declence la modification de la ligne
     * @param order
     */
    const editRow = order => {
        setEditing(true);
        setCurrentOrder({ id: order.id, name: order.name, status: order.status })
    };
    // desactive le mode d' editing
    const updateOrder = () => {
        setEditing(false);
    };
    return (
        <div className="">
            <h3>List Orders</h3>
            <div className="Orders">
                <div className="sideBarForm">
                    {editing ? (
                        <div>
                            <h4>Edit order</h4>
                            <EditOrdersForm
                                editing={editing}
                                setEditing={setEditing}
                                currentOrder={currentOrder}
                                updateOrder={updateOrder}
                            />
                        </div>
                    ) : (
                        <div>
                            <h4>Add order</h4>
                            <AddOrdersForm />
                        </div>
                    )}
                </div>
                <div className="tableOrders">
                    <OrdersTable editRow={editRow}/>
                </div>
            </div>
        </div>
    )
};

export default App