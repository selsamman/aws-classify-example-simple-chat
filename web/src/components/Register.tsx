import {observer} from "proxily";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import {chatServerRequest} from "../store/classify";
import {session} from "../store";
import {Alert} from "react-bootstrap";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    return (
        <>
            <h2>Tell Us Who You Are</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" onChange={e => setFirstName(e.target.value)}/>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name" onChange={e => setLastName(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" disabled={!firstName || !lastName} onClick={submit}>
                    Submit
                </Button>
                {error &&
                    <Alert key="danger" variant="danger">
                        ${error}
                    </Alert>
                }
        </Form>
       </>
    );
    async function submit() {
        try {
            setError("");
            await  session.register(`${firstName} ${lastName}`);
        } catch (e : any) {
            setError(e.message);
        }
    }
}

export default observer(Register);