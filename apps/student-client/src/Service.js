import axios from 'axios';

const getAllStudents = axios.post('http://localhost:3000/graphql', {
  query: `
    query {
      getAll {
        id
        name
        cpf
        email
      }
    }`,
});

export default getAllStudents;
