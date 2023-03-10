import {observer} from "proxily";
import {session} from "../store";
import Person from "./Person";

function People () {
    return (
        <>
            {session.people.length > 10 ?
                <>
                    {session.people.map(person => <Person key={person.name} person={person}/>)}
                </>
                :
                <>
                    <h3>No Friends?</h3>
                    <div>Open and incognito/private window and impersonate some!</div>
                </>
            }
        </>
    );
}

export default observer(People);