import {observer} from "proxily";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import {store} from "../store";
import {Alert} from "react-bootstrap";

function MessagesFooter() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    return (
        <div className="messagesFooter">
            {store.session.currentName &&
                <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Message</Form.Label>
                        <Form.Control value={message} type="textArea"
                                      placeholder="Message ..."
                                      onKeyUp={e => {
                                          if (e.key === 'Enter') submit();
                                      }}
                                      onChange={e => setMessage(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" disabled={!message} onClick={submit}>
                        Send
                    </Button>
                    {error &&
                        <Alert key="danger" variant="danger">
                            ${error}
                        </Alert>
                    }
                </div>
            }
       </div>
    );
    async function submit() {
         try {
            setError("");
            await store.session.sendMessage(message);
            setMessage("");
        } catch (e : any) {
            setError(e.message);
        }
    }
}

export default observer(MessagesFooter);