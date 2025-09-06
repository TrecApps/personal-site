import React from "react";
import styles from "../component.module.css";
import {Button, Form} from 'react-bootstrap';


import { StylesService } from "@tc/tc-rc-general";

export default function Base64EditorComponent() {

    const [showBase64Error, setShowBase64Error] = React.useState<boolean>(false);
    const [filterbadChars, setFilterBadChars] = React.useState<boolean>(false);

    const [inputText, setInputText] = React.useState<string>("");
    const [outputText, setOutputText] = React.useState<string>("");

    const ss: StylesService = StylesService.getInstance();

    function decodeText() {
        // Assume it is gong to work
        setShowBase64Error(false);

        let text = inputText.toString();

        if(filterbadChars){
            let tempText = "";
            for(let c = 0; c < text.length; c++){
                let ch = text.charCodeAt(c);
                if((ch >= 'a'.charCodeAt(0) && ch <= 'z'.charCodeAt(0)) ||
                    (ch >= 'A'.charCodeAt(0) && ch <= 'A'.charCodeAt(0)) ||
                    (ch >= '0'.charCodeAt(0) && ch <= '9'.charCodeAt(0)) ||
                    ch == '+'.charCodeAt(0) || ch == '/'.charCodeAt(0) || ch == '='.charCodeAt(0)
                ) {
                    tempText += text.charAt(c);
                }
            }
            text = tempText;
        }

        try {
            setOutputText(decodeURIComponent(window.atob(text)));
        } catch (e){
            console.error("Error decoding Base 64", e);
            setShowBase64Error(true);
        }
    }

    function encodeText(){
        // Assume it is gong to work
        setShowBase64Error(false);

        let text = inputText.toString();

        setOutputText(btoa(text));
    }


    return (
        <div className={ss.getElementContainerClasses(styles.baseBackground)} style={{overflowY: "auto"}}>
            <div className={ss.getElementItemClasses('')} style={{display: showBase64Error ? 'block' : 'none'}}>
                <div style={{
                    backgroundColor: 'red',
                    padding: '3px',
                    textAlign: 'center'
                }}  ><h4>Invalid Base 64 string</h4></div>
            </div>
            <div className={ss.getElementItemClasses('')}>
                <textarea 
                    value={inputText} 
                    style={{
                        width: "100%",
                        backgroundColor: ss.isDark ? "#3a3a3a" : "white",
                        color: ss.isDark ? "white" : "black"
                    }}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(event.target.value)}>

                </textarea>
            </div>
            <div className={ss.getElementItemClasses('')}>
                <div className="form-group">
                    <Form.Check type="checkbox" label="Filter input when Decoding" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilterBadChars(event.target.checked)}></Form.Check>
                </div>
                <Button style={{width: '100%', margin: '3px'}} variant="primary" onClick={encodeText}>Encode to Base64</Button>
                
                <Button style={{width: '100%', margin: '3px'}} variant="primary" onClick={decodeText}>Decode from Base64</Button>
            </div>

            <div className={ss.getElementItemClasses('')}>
                <textarea 
                    value={outputText} 
                    style={{
                        width: "100%",
                        backgroundColor: ss.isDark ? "#3a3a3a" : "white",
                        color: ss.isDark ? "white" : "black"
                    }}
                    readOnly></textarea>
            </div>
        </div>
    )
    

}