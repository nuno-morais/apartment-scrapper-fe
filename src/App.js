import React from 'react';
import { fetchUtils, Admin, Resource } from 'react-admin';
import { LinkList, LinkCreate } from './links/links';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './auth/authProvider';
import MyLoginPage from './home/myLoginPage';
import { ApartmentList, ApartmentTrigger } from './apartments/apartments';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider(`${process.env.REACT_APP_DOMAIN_API}`, httpClient);
const App = () => {
  return (
    <Admin loginPage={MyLoginPage} authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="links" list={LinkList} create={LinkCreate} />
      <Resource name="apartments" list={ApartmentList} />
      <Resource name="apartment-trigger" list={ApartmentList} create={ApartmentTrigger} />
    </Admin>
  )
};
export default App;