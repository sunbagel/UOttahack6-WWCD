export default {
    userName: "solace-cloud-client",
    password: import.meta.env.VITE_SOLACE_PASS,
    invocationContext: {
        host: import.meta.env.VITE_SOLACE_HOST,
        port: 8443,
        clientId: ""
    },
    timeout: 3,
    keepAliveInterval: 60,
    cleanSession: true,
    useSSL: true,
    reconnect: true
};