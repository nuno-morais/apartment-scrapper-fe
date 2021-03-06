import React from 'react';
import { Admin, Resource } from 'react-admin';
import { LinkList, LinkCreate } from './links/links';
import authProvider from './auth/authProvider';
import MyLoginPage from './home/myLoginPage';
import { ApartmentList } from './apartments/apartments';
import dataProvider from './dataProvider';

const App = () => {
  return (
    <Admin loginPage={MyLoginPage} authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="links" list={LinkList} create={LinkCreate} />
      <Resource name="apartments" list={ApartmentList} />
    </Admin>
  )
};
export default App;