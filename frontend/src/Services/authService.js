
import api from './configAxios'

export const login = (credential) => {

    return api.post('/login/token', credential)
    .then(response=> {
        console.log(response.data.token)
        localStorage.setItem('token', response.data.token);
        return response.data;})
    .catch((error) =>{
        console.error('Erro ao fazer login:', error)
        if  (error.response) {
          throw new Error(error.response.data.message || 'Erro ao fazer login.')
        } 
        else if (error.request) {
          throw new Error('Sem resposta do servidor. Verifique sua conexão.')
        } 
        else {
          throw new Error('Erro ao fazer login.');
        }
    }
    )

}

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  };