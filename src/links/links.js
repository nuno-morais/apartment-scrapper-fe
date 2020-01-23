import React from 'react';
import { List, Datagrid, TextField, TextInput, Create, SimpleForm } from 'react-admin';

const AmazingUrlField = ({ source, record = {} }) => {
    const appendTitle = record.url.length > 100 ? '...' : '';

    const title = record.url.substring(0, 100) + appendTitle;
    return (<a target={'_blank'} href={record.url} >{title}</a>)
}

export const LinkList = props => {
    const {record} = props;
    return (
        <List {...props}>
            <Datagrid >
                <AmazingUrlField record={record} source="url" />
                <TextField source="provider" />
                <TextField source="createdAt" />
            </Datagrid>
        </List>
    );
}

export const LinkCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="url" />
        </SimpleForm>
    </Create>
);