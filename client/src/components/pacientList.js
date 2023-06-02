
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";

const Record = (props) => (
    <tr>
      <td>{props.record.name}</td>
      <td>{props.record.rut}</td>
      <td>{props.record.f_nacimiento}</td>
      <td>{props.record.sexo}</td>
      <td>{props.record.direccion}</td>
      <td>{props.record.comuna}</td>
      <td>{props.record.movil}</td>
      <td>{props.record.prevision}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Editar</Link> |
        <button className="btn btn-link"
          onClick={() => {
            props.deletePacient(props.record._id);
          }}
        >Borrar</button>
      </td>
    </tr>
);

const PacientList = () => {
  const [pacients, setPacients] = useState([]);

  const getUsers = async () => {
    const res = await Axios.get("http://localhost:5000/pacient");
    setPacients(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  function recordList() {
    return pacients.map((pacient) => {
      return (
        <Record
          record={pacient}
          deletePacient={() => deletePacient(pacient._id)}
          key={pacient._id}
        />
      );
    });
  }

  async function deletePacient(id) {
    await Axios.delete(`http://localhost:5000/delete/${id}`);

    const newPacients = pacients.filter((el) => el._id !== id);
    setPacients(newPacients);
  }

  return (
    <div style={{marginTop: "110px"}}>
      <br></br>
      <br></br>
      <h3>Pacientes recientes</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>R.U.T</th>
            <th>Fecha de nacimiento</th>
            <th>Sexo</th>
            <th>Direccion</th>
            <th>Comuna</th>
            <th>Movil</th>
            <th>Prevision</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
};

export default PacientList;