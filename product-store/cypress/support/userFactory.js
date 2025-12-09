export const generateUser = () => {
    const timeStamp = Date.now();
    const random = Math.floor(Math.random() * 9999); 
    
    return {
        username: `Teste${timeStamp}${random}`, 
        password: 'SenhaValida'
    }
};