import {
  html,
  component,
  useState,
} from "haunted";

/**
 * formulaire d'update
 * @param contact
 * @returns {TemplateResult}
 * @constructor
 */
function FormUpdate({contact}) {
  // Hooks
  const [name,setName] = useState(contact.name);
  // event de validation
  const submit = () => {
    const id = contact.id;
    const event = new CustomEvent('submit-update-contact', {
      bubbles: true, // this let's the event bubble up through the DOM
      composed: true, // this let's the event cross the Shadow DOM boundary
      detail: { name } // all data you wish to pass must be in `detail`
    });
    this.dispatchEvent(event);
  };

  return html`
    <div class="card">
          <style>button {
            background-color: transparent;
            color: #a7dbe5;
            border: 1px solid #a7dbe5;
            border-radius: 10px;
            cursor: pointer;
            }
            p{
             color: #a7dbe5;
            }</style>
        <div class="card-body">
            <table>
             <tr>
                <td>
                    <p>name : ${name}</p>
                    <input type="text" name="name" id="name"
                            value=${name} @keyup=${ev => setName(ev.target.value)}/>
                </td>
            </tr>
            </table>
            <div>
                <button @click=${() => submit()}>change contact</button>
            </div>
        </div>
    </div>
  `;
}

FormUpdate.observedAttributes = ['contact'];

customElements.define('form-update-contact', component(FormUpdate));