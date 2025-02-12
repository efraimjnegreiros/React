import { Button, Table } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importando o hook useNavigate

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    const navigate = useNavigate();  // Hook para redirecionar

    useEffect(() => {
        axios.get(`https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeData`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, []);

    const handleUpdateClick = (id) => {
        // Redireciona para a página de update com o id do item
        navigate(`/update/${id}`);
    };
    const handleCreateClick = (id) => {
        navigate(`/create`);
    };
  
    const onDelete = (id) => {
        axios.delete(`https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeData/${id}`)
     .then(() => {
        navigate('/read');
    })
    navigate('/read');
}

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Checkbox</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row key={data.id}>
                                <Table.Cell>{data.id}</Table.Cell>
                                <Table.Cell>{data.firstName}</Table.Cell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
                                <Table.Cell>
                                    {/* Botão de atualização com o id do item */}
                                    <Button onClick={() => handleUpdateClick(data.id)}>Update</Button>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            <Button onClick={handleCreateClick}>Inserir um Novo Usuário</Button>
        </div>
    );
}
