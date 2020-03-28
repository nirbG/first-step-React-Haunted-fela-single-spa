import React, { Component } from 'react'

const OrderContext = React.createContext();

class OrderProvider extends Component {
  // Context state
  state = {
    env :{ // donnee utile pour la connextion avec la back qui utilise kong, nest et rabbitmq
      code :'Z2WV2AcaLPifz5TMr46rljMsWabKtZbA',// example
      provision_key :'provision_key',// obtenu grace au curl
      client_id :'client_id',// obtenu grace au curl
      client_secret:'client_secret',// obtenu grace au curl
      response_type:'code',
      authenticated_userid:'tada',
      scope:'access',
      grant_type:'authorization_code',
      redirect_uri:'http://192.168.99.100:8080/',
      token:'bearer x3esYSui6I4fCPXjnSDx3rdhFCdaI7T1', //example
    },
    orders: [],// liste des commande
  };

  // Method to update state
  setOrders = orders => {
    this.setState(prevState => ({ orders }))
  };
  // Method to update state
  setEnv = env => {
    this.setState(prevState => ({ env }))
  };

  render() {
    const { children } = this.props;
    const { orders,env } = this.state;
    const { setOrders,setEnv } = this;

    return (
        <OrderContext.Provider
            value={{
              orders,
              env,
              setOrders,
              setEnv,
            }}>
          {children}
        </OrderContext.Provider>
    )
  }
}

export default OrderContext
export { OrderProvider }