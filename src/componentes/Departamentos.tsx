import React, { useState } from "react";

interface Departamento {
  id: number;
  nombre: string;
}

interface PropsDepartamento {
  departamentos: Departamento[];
  setDepartamentos: React.Dispatch<React.SetStateAction<Departamento[]>>;
  empleados: { idDepartamento: number }[]; // Para validar asociación
}

const Departamentos: React.FC<PropsDepartamento> = ({
  departamentos,
  setDepartamentos,
  empleados,
}) => {
  const [nombreDepartamento, setNombreDepartamento] = useState<string>("");
  const [editarId, setEditarId] = useState<number | null>(null); // Para rastrear el ID del departamento a editar

  const agregarDepartamento = () => {
    if (nombreDepartamento.trim() !== "") {
      setDepartamentos([
        ...departamentos,
        { id: departamentos.length + 1, nombre: nombreDepartamento },
      ]);
      setNombreDepartamento("");
    }
  };

  const eliminarDepartamento = (id: number) => {
    const asociado = empleados.some((empleado) => empleado.idDepartamento === id);
    if (asociado) {
      alert("No se puede eliminar el departamento porque está asociado a empleados.");
      return;
    }
    setDepartamentos(departamentos.filter((dep) => dep.id !== id));
    alert("Departamento eliminado correctamente.");
  };

  const actualizarDepartamento = () => {
    if (nombreDepartamento.trim() !== "") {
      setDepartamentos(
        departamentos.map((dep) =>
          dep.id === editarId ? { ...dep, nombre: nombreDepartamento } : dep
        )
      );
      setNombreDepartamento("");
      setEditarId(null);
      alert("Departamento actualizado correctamente.");
    }
  };

  return (
    <div>
      <h1>Departamentos</h1>
      <input
        type="text"
        value={nombreDepartamento}
        onChange={(e) => setNombreDepartamento(e.target.value)}
        placeholder="Nombre del departamento"
      /> &nbsp;
      {editarId === null ? (
        <button onClick={agregarDepartamento}>Agregar Departamento</button>
      ) : (
        <button onClick={actualizarDepartamento}>Actualizar Departamento</button>
      )}

      <table border={1} style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {departamentos.map((departamento) => (
            <tr key={departamento.id}>
              <td>{departamento.id}</td>
              <td>{departamento.nombre}</td>
              <td>
                <button onClick={() => eliminarDepartamento(departamento.id)}>
                  Eliminar
                </button> &nbsp;
                <button
                  onClick={() => {
                    setEditarId(departamento.id);
                    setNombreDepartamento(departamento.nombre);
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Departamentos;


