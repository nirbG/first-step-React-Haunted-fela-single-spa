import {
  html,
  component,
  useState,
} from "haunted";

/**
 *
 * @param mybuttonvalue nom du bouton
 * @returns {TemplateResult}
 * @constructor
 */
function Button({mybuttonvalue}) {
  // hook
  const [val,setval] = useState(mybuttonvalue);
  //event
  const modeSelect = () => {
    const event = new CustomEvent('mode-select', {
      bubbles: true, // this let's the event bubble up through the DOM
      composed: true, // this let's the event cross the Shadow DOM boundary
      detail: {} // all data you wish to pass must be in `detail`
    });
    this.dispatchEvent(event);
  };

  return html`
            <style>button {
            cursor: pointer;
            width: 82%;
            background-color: transparent;
            color: #a7dbe5;
            border: 1px solid #a7dbe5;
            border-radius: 10px;
            font-size: 20px;
            padding: 2% 0%;
            }</style>
            <button @click=${() => modeSelect()}><strong>${val}</strong></button>
  `;
}

const properties = {
  mybuttonvalue: {type: String},
};

customElements.define('my-button', component(Button,{properties}));
