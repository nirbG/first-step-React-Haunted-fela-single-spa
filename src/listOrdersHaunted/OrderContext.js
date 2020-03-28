import {component, createContext, useContext} from "haunted";

export let ThemeContext = createContext('dark');

customElements.define('theme-provider', ThemeContext.Provider);
customElements.define('theme-consumer', ThemeContext.Consumer);

function Consumer() {
    const context = useContext(ThemeContext);
    return context;
}

export function getContext(){
    return useContext(ThemeContext);
}

export function udpate(newOjbet){
    ThemeContext = createContext(newOjbet)
}

customElements.define('my-consumer', component(Consumer));