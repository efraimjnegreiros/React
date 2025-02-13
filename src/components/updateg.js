import React, { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Hook para pegar os parâmetros da URL
import { useNavigate } from 'react-router-dom';  // Importando o hook useNavigate

export default function Update() {
    const [groupName, setGroupName] = useState('');
    const [id, setID] = useState(null);
    const navigate = useNavigate();  // Hook para redirecionar
    const { id: urlId } = useParams();  // Pegando o id da URL
    const handleReadClick = (id) => {
        // Redireciona para a página de update com o id do item
        navigate(`/readg`);
    };
    useEffect(() => {
        if (urlId) {
            setID(urlId);  // Define o id a partir da URL
            axios.get(`https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeGroup/${urlId}`)
                .then(response => {
                    const { groupName } = response.data;
                    setGroupName(groupName);
                
                })
                .catch(error => {
                    console.error('Erro ao buscar dados para edição:', error);
                });
        }
    }, [urlId]);  // Sempre que o id da URL mudar, a lógica de carregamento é disparada

    const updateAPIData = () => {
        axios.put(`https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeGroup/${id}`, {
            groupName
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
                        placeholder='Group Name'
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </Form.Field>
                
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    );
}
