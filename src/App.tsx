import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GestionUsuarios from './componentes/GestionUsuarios'
import './App.css';
import { useEffect, useState } from "react";
import Departamentos from "./componentes/Departamentos";
import Navbar from "./componentes/Navbar";
import Empleados from "./componentes/Empleados";
import Inicio from "./componentes/Inicio";

interface Departamento {
  id: number;
  nombre: string;
}

interface Empleado {
  id: number;
  nombre: string;
  idDepartamento: number;
}

const App: React.FC = () => {

  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  useEffect(() => {
    const storedDepartamentos = localStorage.getItem("departamentos");
    const storedEmpleados = localStorage.getItem("empleados");

    if (storedDepartamentos) {
      setDepartamentos(JSON.parse(storedDepartamentos));
    }

    if (storedEmpleados) {
      setEmpleados(JSON.parse(storedEmpleados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("departamentos", JSON.stringify(departamentos));
  }, [departamentos])

  useEffect(() => {
    localStorage.setItem("empleados", JSON.stringify(empleados));
  }, [empleados])

  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/usuarios" element={<GestionUsuarios />} />
          <Route path="/departamentos"
            element={<Departamentos
              departamentos={departamentos}
              setDepartamentos={setDepartamentos}
              empleados={empleados}
            />}
          />
          <Route
            path="/empleados"
            element={<Empleados
              departamentos={departamentos}
              empleados={empleados}
              setEmpleados={setEmpleados} />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App;

