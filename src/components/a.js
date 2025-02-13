import React, { useEffect, useState } from 'react';
import { Button, Table, Select, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserGroupAssociation() {
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [userGroupAssociations, setUserGroupAssociations] = useState([]);
    const navigate = useNavigate();

    // Fetch users and groups on component mount
    useEffect(() => {
        // Fetching users
        axios.get('https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeData')
            .then(response => {
                setUsers(response.data);
            });

        // Fetching groups
        axios.get('https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeGroup')
            .then(response => {
                setGroups(response.data);
            });
    }, []);

    // Fetch user-group associations
    const fetchUserGroupAssociations = () => {
        axios.get('https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeData')
            .then(response => {
                setUserGroupAssociations(response.data);
            });
    };

    // Handle user selection
    const handleUserChange = (e, { value }) => {
        setSelectedUser(value);
    };

    // Handle group selection
    const handleGroupChange = (e, { value }) => {
        setSelectedGroup(value);
    };

    // Handle adding user to group
    const addUserToGroup = () => {
        if (selectedUser && selectedGroup) {
            axios.put(`https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeData/${selectedUser}`, {
                groupId: selectedGroup
            }).then(() => {
                fetchUserGroupAssociations();
            });
        }
    };

    // Handle removing user from group
    const removeUserFromGroup = (userId) => {
        axios.put(`https://67ac7c2a5853dfff53daea80.mockapi.io/teste/fakeData/${userId}`, {
            groupId: null
        }).then(() => {
            fetchUserGroupAssociations();
        });
    };

    // Get users for a specific group
    const usersInGroup = (groupId) => {
        return users.filter(user => user.groupId === groupId);
    };

    return (
        <div>
            <h3>Associação de Usuários a Grupos</h3>

            {/* Select para usuários */}
            <Select
                placeholder="Selecione o Usuário"
                options={users.map(user => ({
                    key: user.id,
                    value: user.id,
                    text: user.firstName
                }))}
                onChange={handleUserChange}
                value={selectedUser}
            />

            {/* Select para grupos */}
            <Select
                placeholder="Selecione o Grupo"
                options={groups.map(group => ({
                    key: group.id,
                    value: group.id,
                    text: group.groupName
                }))}
                onChange={handleGroupChange}
                value={selectedGroup}
            />

            {/* Botão para associar o usuário ao grupo */}
            <Button onClick={addUserToGroup}>Adicionar ao Grupo</Button>

            <h4>Usuários no Grupo</h4>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Nome do Usuário</Table.HeaderCell>
                        <Table.HeaderCell>Ações</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {usersInGroup(selectedGroup).map((user) => {
                        return (
                            <Table.Row key={user.id}>
                                <Table.Cell>{user.id}</Table.Cell>
                                <Table.Cell>{user.firstName}</Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => removeUserFromGroup(user.id)}>Remover</Button>
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </div>
    );
}
