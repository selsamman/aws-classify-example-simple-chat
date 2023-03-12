import {observer} from "proxily";
import {store} from "../store";
import {Col, Row} from "react-bootstrap";
import {Person} from "../store/Person";

function PeopleHeader () {
    const person = (new Person(store.session.name));
    return (
        <div className="messagesHeader">
        <Row>
            <Col xs={10}>
                <div className="name">I am {person.name}</div>
            </Col>
            <Col xs={2}>
                <div className="initials">{person.initials}</div>
            </Col>
        </Row>
        </div>
    );
}
export default observer(PeopleHeader);