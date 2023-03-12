import {observer} from "proxily";
import {store} from "../store";
import {Row, Col} from "react-bootstrap";
import {Person} from "../store/Person";

function PersonComponent ({person} : {person : Person}) {
    const className = person.selectable ? store.session.currentName === person.name ? 'activePerson' : 'inactivePerson' :
                      'disabledPerson';
    return (
        <Row className={`${className} gx-0`} onClick={selectPerson}>
            <Col xs={2}>
                <div className="initials">{person.initials}</div>
            </Col>
            <Col xs={10}>
                <div className="name">{person.name}</div>
            </Col>
        </Row>
    );
    function selectPerson () {
        if (person.selectable)
            store.session.setCurrentPerson(person);
    }
}

export default observer(PersonComponent);