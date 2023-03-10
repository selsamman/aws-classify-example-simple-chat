import {observer} from "proxily";
import {GiNightSleep} from 'react-icons/gi'
import Button from "react-bootstrap/Button";
import {wake} from "../store";

function Sleep () {
    return (
        <div className="centerOnScreen">
            <div>
                <div>
                    <GiNightSleep size={200} color="#a0a0a0"/>
                </div>
                <div>
                    <Button style={{width:200}} variant="secondary"  onClick={wake}>Wake</Button>
                </div>
            </div>
        </div>
    )
}
export default observer(Sleep);