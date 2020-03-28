import {
  html,
  component,
  useState,
} from "haunted";
import './FormUpdate.js'

/**
 *
 * @param contact objet contact
 * @returns {TemplateResult}
 * @constructor
 */
function Contact({contact}) {
  // hooks
  const [state,setState] = useState(false);
  const [updateF,setUpdateF] = useState(false);
  //event
  // envoie les donnees pour mettre a jour le contact
  const submitChange = (ev) => {
    contact.name = ev.name;
    const event = new CustomEvent('submit-update-contact', {
      bubbles: true, // this let's the event bubble up through the DOM
      composed: true, // this let's the event cross the Shadow DOM boundary
      detail: {id: contact.id, name: ev.name } // all data you wish to pass must be in `detail`
    });
    this.dispatchEvent(event);
  };
  // envoie l'id du contact a supprimer
  const suppContact = () => {
    setState(false);
    setUpdateF(false);
    const id = contact.id;
    const event = new CustomEvent('supp-contact', {
      bubbles: true, // this let's the event bubble up through the DOM
      composed: true, // this let's the event cross the Shadow DOM boundary
      detail: { id } // all data you wish to pass must be in `detail`
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
            tr,td {
                color: #7ba2a9;
            }
            </style>
        <div class="card-body">
            <button style="float: right" @click=${suppContact}>supp contact</button>
            <table>
             <tr>
                <td>Name : ${contact.name} </td>
                <td>Alias : ${contact.username}</td> 
            </tr>
            <tr>
                <td>Email : ${contact.email} </td> 
                <td>Phone : ${contact.phone}</td>
            </tr>
            <tr>
               <td>Catch phrase : ${contact.company.catchPhrase}</p>
            </tr>
            </table>
            <div>
                <button @click=${() => setState(!state)}>${state ? html`supp` : html`add`} to your favorite </button>
                ${state ? html`<span  style="float:right"><strong>favorite</strong></span>` : html``}
                            <p @click=${() => setUpdateF(!updateF)} style="cursor: pointer;text-align: center; margin-top: 1%">${updateF ? html`Hide` : html`Show`} update form </p>
                ${updateF ? html`<form-update-contact @submit-update-contact=${ev => submitChange(ev.detail)} 
                    .contact=${contact}></form-update-contact>` : html``}
            </div>
        </div>
    </div>
    <hr>
  `;
}

Contact.observedAttributes = ['contact'];

customElements.define('card-contact', component(Contact));
