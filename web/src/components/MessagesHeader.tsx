import {observer} from "proxily";
import {session} from "../store";
import {Col, Row} from "react-bootstrap";
import {Person} from "../store/Person";

function MessagesHeader () {
    const person = (new Person(session.name));
    return (
        <div className="messagesHeader">
        <Row>
            <Col xs={10}>
                <div className="name">{person.name}</div>
            </Col>
            <Col xs={2}>
                <div className="initials">{person.initials}</div>
            </Col>
        </Row>
        </div>
    );
}
export default observer(MessagesHeader);