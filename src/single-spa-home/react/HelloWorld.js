import React, { useState } from 'react'

const Hello = props => {
    const [name,setName] = useState('React');
    return (
        <div  style={{margin:'0% 25%',width :'50%', textAlign:'center'}}>
            <h1>Hello from {name}</h1>
            <input type="text" onChange={ev => setName(ev.target.value)}
                   value={name}/>
        </div>
    )
};
export default Hello;