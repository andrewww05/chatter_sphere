export default () => ({
    app: {
        jwt: {
            secret: process.env.APP_JWT_SECRET,
            lifetime: {
                access: process.env.APP_JWT_LIFETIME_ACCESS, 
                refresh: process.env.APP_JWT_LIFETIME_REFRESH,
            }
        }
    },
    google: {
        oauth: {
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID
        },
    },
});
