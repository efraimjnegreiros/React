import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Hook para pegar os parâmetros da URL
import { useNavigate } from 'react-router-dom';  // Importando o hook useNavigate

export default function Update() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [id, setID] = useState(null);
    const navigate = useNavigate();  // Hook para redirecionar
    const { id: urlId } = useParams();  // Pegando o id da URL
    const handleReadClick = (id) => {
        // Redireciona para a página de update com o id do item
        navigate(`/read`);
    };
    useEffect(() => {
        if (urlId) {
            setID(urlId);  // Define o id a partir da URL
            axios.get(`https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeData/${urlId}`)
                .then(response => {
                    const { firstName, lastName, checkbox } = response.data;
                    setFirstName(firstName);
                    setLastName(lastName);
                    setCheckbox(checkbox);
                })
                .catch(error => {
                    console.error('Erro ao buscar dados para edição:', error);
                });
        }
    }, [urlId]);  // Sempre que o id da URL mudar, a lógica de carregamento é disparada

    const updateAPIData = () => {
        axios.put(`https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeData/${id}`, {
            firstName,
            lastName,
            checkbox
        })
        .then(response => {
            console.log('Dados atualizados com sucesso', response);
            handleReadClick();
        })
        .catch(error => {
            console.error('Erro ao atualizar dados', error);
        });
    };

    return (
        <div>
            <Form className="create-form" onSubmit={e => e.preventDefault()}>
                <Form.Field>
                    <label>First Name</label>
                    <input
                        placeholder='First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        label='I agree to the Terms and Conditions'
                        checked={checkbox}
                        onChange={(e) => setCheckbox(!checkbox)}
                    />
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    );
}
