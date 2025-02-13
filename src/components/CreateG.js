import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importando o hook useNavigate



export default function Create() {
    const [groupName, setGroupName] = useState('');
    const navigate = useNavigate();  // Hook para redirecionar

    const postData = () => {
        axios.post(`https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeGroup`, {
            groupName
        })
        handlReadClick();
    }
    const handlReadClick = (id) => {
        navigate(`/readg`);
    };
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='Group Name' onChange={(e) => setGroupName(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}