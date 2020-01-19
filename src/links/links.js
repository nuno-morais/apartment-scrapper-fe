import React from 'react';
import { List, Datagrid, TextField, TextInput, Create, SimpleForm } from 'react-admin';

export const LinkList = props => (
    <List {...props}>
        <Datagrid >
            <TextField source="url" />
            <TextField source="provider" />
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
        </Datagrid>
    </List>
);


export const LinkCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="url" />
        </SimpleForm>
    </Create>
);