import {component, html, useContext, useEffect, useState} from "haunted";
import './OrderContext'
import {ThemeContext,udpate,getContext} from "./OrderContext";
function subComponent() {
    const [theme, setTheme] = useState(getContext());
    useEffect(() => {
        udpate(theme);
    },[theme]);
    return html`
    <div>
       <my-consumer></my-consumer>
        <select value=${theme} @change=${event => setTheme(event.target.value)}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
    </div>`;
}

customElements.define('sub-component', component(subComponent));