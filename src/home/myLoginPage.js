import React from 'react';
import { useLogin, useNotify } from 'react-admin';
import { ThemeProvider } from '@material-ui/styles';

const MyLoginPage = ({ theme }) => {
    const login = useLogin();
    const notify = useNotify();
    const submit = (e) => {
        e.preventDefault();
        login()
            .then((c) => {
                console.log("token: ", c);
                return c;
            })
            .catch(() => notify('Invalid'));
    };

    return (
        <ThemeProvider theme={theme}>
            <button onClick={submit} id="login">Click to Login</button>
        </ThemeProvider>
    );
};

export default MyLoginPage;
