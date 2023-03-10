import {observer} from "proxily";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import {session} from "../store";
import {Alert} from "react-bootstrap";
import {LocalSession} from "../store/LocalSession";

function MessagesFooter() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    return (
        <div className="messagesFooter">
            {session.currentName &&
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Message</Form.Label>
                        <Form.Control value={message} type="textArea"
                                      placeholder="Message ..."
                                      onKeyDown={e => {
                                          if (e.key === 'Enter') submit();
                                          return false
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
                </Form>
            }
       </div>
    );
    async function submit() {
         try {
            setError("");
            if (message === '/clear')
                Object.assign(session, new LocalSession());
            else
                await session.sendMessage(message);
            setMessage("");
        } catch (e : any) {
            setError(e.message);
        }
    }
}

export default observer(MessagesFooter);