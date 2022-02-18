import './App.css';
import React, { useEffect, useState } from 'react';
import getAllStudents from './Service';

function App() {
  const [student = [], setStudent] = useState();

  useEffect(() => {
    getAllStudents
      .then(({ data }) => {
        setStudent(data.data.getAll);
      })
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>

      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>CPF</th>
        </tr>
        {student.map((row) => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.cpf}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
export default App;