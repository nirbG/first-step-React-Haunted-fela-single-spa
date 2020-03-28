import {
    html,
    component,
    useState,
    useEffect,
} from "haunted";
import  "./Contact.js"
import  "./SideBar.js"

/**
 *
 * @returns {TemplateResult}
 * @constructor
 */
function Contacts() {
    // hooks
    const [contacts, setContacts] = useState([]);
    const [newid,setNewid] = useState(-1);
    // useEffect qui load les donnees au demarrage de la page
    useEffect(() => {
        reaload()
    }, []);

    /**
     * load les donnees a partir d'une API REST
     */
    function reaload() {
        fetch('http://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then((data) => {
                setContacts(data);
            })
            .catch(console.log);
    }

    /**
     * gere le mode selectionne
     * !!!! j'ai voulu tester le UseReducer mais j'ai pas trop reussi !!!!
     * @param action
     */
    function reducer(action) {
        console.log(action);
        switch (action) {
            case 'reset':
                setContacts([]);
                break;
            case 'supp':
                contacts.shift();
                setContacts(contacts);
                break;
            case 'random':
                random();
                break;
            case 'reload':
                reaload();
                break;
        }
    }

    /**
     * retourne un contact random
     */
    function random() {
        fetch('http://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then((data) => {
                setContacts([data[Math.floor(Math.random() * (data.length - 0))]]);
            })
            .catch(console.log);
    }

    /**
     * recherche un ou des contacts
     * @param ev
     */
    function  searchContact(ev) {
        setContacts(contacts.filter((_) => _.name.toLowerCase().match(ev.toLowerCase())));
    }

    /**
     * handler pour ajouter un contact
     * @param ev
     */
    function hanldeClickAdd(ev) {
        if( ev.name !== '' && ev.email !=='') {
            console.log('click');
            contacts.push({
                id:newid,
                name: ev.name,
                email: ev.email,
                company: {
                    catchPhrase: ev.catchPhrase,
                }
            });
            setContacts(contacts);
            setNewid(newid-1)
        }
    }

    /**
     * handler pour supprimer un contact
     * @param ev
     */
    function handleSupp(ev) {
        console.log(contacts.filter((_) => _.id !== ev.detail.id ));
        setContacts(contacts.filter((_) => _.id !== ev.detail.id ));
    }

    /**
     * handler pour modifier un contact
     * @param contact
     * @param event
     */
    function handleUpdate(contact,event) {
        contact.name = event.detail.name;
        setContacts(contacts);
    }

    return html`
        <side-bar @send-action=${ev =>reducer(ev.detail.action)} 
        @create-contact=${ ev => hanldeClickAdd(ev.detail)}
        @search-contact="${ev => searchContact(ev.detail.search)}"
            style="width: 20%; float: left;">
        </side-bar>
            <div style="width: 80%;margin-left: 20% ">
                <center><h3>Contact List</h3></center>
                <div>
                ${contacts.map(contact => html `
                   <card-contact .contact=${contact}
                                  @submit-update-contact=${event => handleUpdate(contact,event)}
                                  @supp-contact=${event => handleSupp(event)}>        
                   </card-contact>`)}
                </div>
            </div>`
}

customElements.define("list-monster", component(Contacts));