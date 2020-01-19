import createAuth0Client from '@auth0/auth0-spa-js';

const clientAuth0 = createAuth0Client({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    issuer: process.env.REACT_APP_AUTH0_ISSUER,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE
});

const authProvider = {
    login: () => new Promise(async (resolve, reject) => {
        try {
            const authorization = await clientAuth0;
            await authorization.loginWithPopup();

            const user = await authorization.getUser();
            if (user != null) {
                localStorage.setItem('user', user);
            }

            const token = await authorization.getTokenSilently();
            if (token != null) {
                localStorage.setItem('token', token);
            }

            resolve(user);
        }
        catch (e) {
            console.log("An error occurred on login", e);
            reject();
        }
    }),
    logout: () => new Promise(async (resolve, reject) => {
        try {
            const authorization = await clientAuth0;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            await authorization.logout({ returnTo: `${process.env.REACT_APP_DOMAIN_ROOT}/#/login` });
            resolve();
        } catch (e) {
            console.log("An error occurred on logout");
            reject();
        }
    }),
    checkAuth: () => new Promise(async (resolve, reject) => {
        if (localStorage.getItem('user') == null) {
            reject();
        } else {
            try {
                const authorization = await clientAuth0;
                const token = await authorization.getTokenSilently();
                if (token) {
                    localStorage.setItem('token', token);
                    resolve()
                } else {
                    reject()
                }
            } catch (e) {
                reject();
            }
        }
    }),
    checkError: (error) => {
        const status = error.status;
        if (status === 401) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => new Promise(async (resolve, reject) => {
        const user = localStorage.getItem('user');
        if (user) {
            resolve();
        } else {
            reject();
        }
    }),
};

export default authProvider;
