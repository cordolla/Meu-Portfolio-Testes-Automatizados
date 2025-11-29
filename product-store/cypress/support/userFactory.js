export const generateUser = () => {
    const timeStamp = Math.floor(Date.now() / 10000);
    const id = timeStamp.toString().slice(-5)
    return {
        username: `Teste${id}`,
        password: 'SenhaValida'
    }
};