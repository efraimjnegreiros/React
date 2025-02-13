import { Button, Table } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importando o hook useNavigate

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    const navigate = useNavigate();  // Hook para redirecionar

    useEffect(() => {
        axios.get(`https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeGroup`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, []);

    const handleUpdateClick = (id) => {
        // Redireciona para a página de update com o id do item
        navigate(`/updateg/${id}`);
    };
    const handleCreateClick = (id) => {
        navigate(`/createg`);
    };
  
    const onDelete = (id) => {
        axios.delete(`https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeGroup/${id}`)
     .then(() => {
        navigate('/readg');
    })
    navigate('/readg');
}

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Group Name</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row key={data.id}>
                                <Table.Cell>{data.id}</Table.Cell>
                                <Table.Cell>{data.groupName}</Table.Cell>
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
            <Button onClick={handleCreateClick}>Inserir um Novo Grupo</Button>
        </div>
    );
}
