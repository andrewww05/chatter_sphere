export default () => ({
    app: {
        jwt: {
            secret: process.env.APP_JWT_SECRET
        }
    },
    google: {
        oauth: {
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            callbackUrl: process.env.GOOGLE_OAUTH_CALLBACK_URL,
        },
    },
});
