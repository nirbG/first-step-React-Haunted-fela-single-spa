import {
  html,
  component,
  useState,
} from "haunted";
import "./Button.js"

/**
 * sideBar
 * @returns {TemplateResult}
 * @constructor
 */
function SideBar({}) {
  // hooks
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [catchPhrase,setCatchPhrase] = useState('');
  const [search,setSearch] = useState('');
  // event qui renvoie le mode choisi
  const action = (action) => {
    const event = new CustomEvent('send-action', {
      bubbles: true, // this let's the event bubble up through the DOM
      composed: true, // this let's the event cross the Shadow DOM boundary
      detail: { action } // all data you wish to pass must be in `detail`
    });
    this.dispatchEvent(event);
  };
  // event qui permet d'ajouter un contact
  const createContact = () => {
    const event = new CustomEvent('create-contact', {
      bubbles: true, // this let's the event bubble up through the DOM
      composed: true, // this let's the event cross the Shadow DOM boundary
      detail: { name, email,catchPhrase } // all data you wish to pass must be in `detail`
    });
    this.dispatchEvent(event);
  };
  // event qui permet de chercher un ou des contacts
  const searchContact = () => {
    const event = new CustomEvent('search-contact', {
      bubbles: true, // this let's the event bubble up through the DOM
      composed: true, // this let's the event cross the Shadow DOM boundary
      detail: { search } // all data you wish to pass must be in `detail`
    });
    this.dispatchEvent(event);
  };

  return html`
          <style>
            p,legend{
             color: #a7dbe5;
            }</style>
            <h1>Menu</h1>
            <table style="width: 100%;">
                <tr>
                    <td>
                        <p>Search</p>
                            <input type="text" name="first" id="first-name"
                            value=${search} @keyup=${ev => setSearch(ev.target.value)} 
                            @change=${event => searchContact()}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <my-button  .mybuttonvalue=${"Supp All"} @mode-select=${() => action('reset')}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <my-button  .mybuttonvalue=${"Supp First"} @mode-select=${() => action('supp')}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <my-button  .mybuttonvalue=${"Random"} @mode-select=${() => action('random')}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <my-button  .mybuttonvalue=${"Reload"} @mode-select=${() => action('reload')}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <fieldset>
                            <legend>Add contact</legend>
                            <p>name</p>
                            <input type="text" name="first" id="first-name"
                            value=${name} @keyup=${ev => setName(ev.target.value)}/>
                            <p>email</p>
                            <input type="email" name="first" id="first-name"
                            value=${email} @keyup=${ev => setEmail(ev.target.value)}/>
                            <p>catch Phrase</p>
                            <input type="text" name="first" id="first-name"
                            value=${catchPhrase} @keyup=${ev => setCatchPhrase(ev.target.value)}/>
                            <div style="text-align: center; margin-top: 3%">
                                <my-button   .mybuttonvalue=${"add"} 
                                    @mode-select=${() => (name !== '' && email !== '') ? createContact() : ''}/>
                            </div>
                        </fieldset>
                    </td>
                </tr>
            </table>
            <style>
                p {
                    margin-top: 1%;
                    margin-bottom: 0%;
                }
                input{
                    padding: 1%;
                    background-color: #a7dbe5;
                    border-radius: 5px;
                    border: 1px solid #303f42;
                    color: #303f42;
                    width: 78%;
                }
                fieldset input {
                    width: 100%!important;
                }
                fieldset {
                    width: 70%;
                }
            </style>
  `;
}

customElements.define('side-bar', component(SideBar));