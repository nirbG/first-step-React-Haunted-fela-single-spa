import {component, html, useContext, useEffect, useState} from "haunted";
import './souscomponent'
import './OrderContext'
import {getContext} from "./OrderContext";

function App() {
    // hook
    const [theme, setTheme] = useState(getContext());
    
    return html`

    <theme-provider .value=${theme}>
        <select value=${theme} @change=${event => setTheme(event.target.value)}>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
        <my-consumer></my-consumer>
      <sub-component/>
    </theme-provider>
  `;
}

customElements.define('my-app', component(App));