import {observer} from "proxily";
import {store} from "../store";
import {Col, Row} from "react-bootstrap";
import {Person} from "../store/Person";

function MessagesHeader () {
    const person = (new Person(store.session.currentName));
    return (
        <>
            {!!store.session.currentName &&
                <div className="messagesHeader">
                    <Row>
                        <Col xs={10}>
                            <div className="name">Chatting with {person.name}</div>
                        </Col>
                        <Col xs={2}>
                            <div className="initials">{person.initials}</div>
                        </Col>
                    </Row>
                </div>
            }
         </>
    );
}
export default observer(MessagesHeader);