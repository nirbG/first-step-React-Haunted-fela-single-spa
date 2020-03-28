import { registerApplication, start } from 'single-spa'

registerApplication(
    // Name of our single-spa application
    'helloworld',
    // loadingFunction
    () => import('./src/single-spa-home/react/helloWorld.app.js'),
    // activityFunction
    (location) => location.pathname === "" ||
        location.pathname === "/" ||
        location.pathname.startsWith('/home')
);

registerApplication(
    'vue',
    () => import('./src/single-spa-home/vue/vue.app.js'),
    () =>  location.pathname === "" ||
        location.pathname === "/" ||
        location.pathname.startsWith('/home')
);

registerApplication(
    'navBar',
    () => import('./src/navBar/navBar.app.js').then(module => module.navBar),
    () => true
);

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(prefix);
  }
}
registerApplication(
    'todoList',
    () => import ('./src/todoList/todoList.app.js'),
    pathPrefix('/todoList')
);

registerApplication(
    'listOrders',
    () => import ('./src/listOrders/listOrders.app.js'),
    pathPrefix('/listOrders')
);

registerApplication(
    'OrdersHaunted',
    () => import ('./src/listOrdersHaunted/listOrdersHaunted.app.js'),
    pathPrefix('/OrdersHaunted')
);
registerApplication(
    'haunted',
    () => import ('./src/haunted/haunted.app.js'),
    pathPrefix('/haunted')
);

start();