import React, {useState}  from 'react'
import {navigateToUrl} from 'single-spa'

const NavBar = () => {
    const [active,setActive] = useState('');
    return (
        <nav style={{
            'backgroundColor': '#5C0004',
        }}>
            <div className="nav-wrapper">
                <a style={{}} href="/" onClick={navigateToUrl} className="brand-logo">single-spa</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li  className={(active === 'home' ? 'active':'')}>
                        <a href="/" onClick={ navigateToUrl}>Home</a>
                    </li>
                    <li className={(active === 'listOrders' ? 'active':'')}>
                        <a href="/listOrders" onClick={navigateToUrl}>ListOrdersReact</a>
                    </li>
                    <li className={(active === 'listOrdersHaunted' ? 'active':'')}>
                        <a href="/OrdersHaunted" onClick={ navigateToUrl}>ListOrdersHaunted</a>
                    </li>
                    <li className={(active === 'todoList' ? 'active':'')}>
                        <a href="/todoList" onClick={navigateToUrl}>TodoList</a>
                    </li>
                    <li className={(active === 'haunted' ? 'active':'')}>
                        <a href="/haunted" onClick={navigateToUrl}>Haunted</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
export default NavBar