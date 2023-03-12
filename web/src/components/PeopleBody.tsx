import {observer} from "proxily";
import {store} from "../store";
import Person from "./Person";

function PeopleBody () {
    return (
        <div className="messagesBody">
            {store.session.people.length > 0 ?
                <>
                    {store.session.people.map(person => <Person key={person.name} person={person}/>)}
                </>
                :
                <>
                    <h3>No Friends?</h3>
                    <div>Open and incognito/private window and impersonate some!</div>
                </>
            }
        </div>
    );
}

export default observer(PeopleBody);