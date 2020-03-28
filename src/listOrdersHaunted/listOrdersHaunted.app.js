import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import ListOrders from './root.component.js';
function domElementGetter() {
    return document.getElementById("OrdersHaunted")
}
const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: ListOrders,
    domElementGetter,
});
export const bootstrap = [
    reactLifecycles.bootstrap,
];
export const mount = [
    reactLifecycles.mount,
];
export const unmount = [
    reactLifecycles.unmount,
];