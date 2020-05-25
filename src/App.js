import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import ClienteAxios from './config/axios';
//componentes
import Pacientes from './components/Pacientes'
import NuevaCita from './components/NuevaCita';
import Cita from './components/Cita';


function App() {

   //state de la app
   const [citas, guardarCitas] = useState([]);
   const [consultar, guardarConsultar] = useState(true);

   useEffect( () => {
    if(consultar) {
      const consultarAPI = () => {
        ClienteAxios.get('/pacientes')
          .then(respuesta => {
            // console.log(respuesta.data)
            //colocar en el state el resultado
            guardarCitas(respuesta.data)

            //desabilitar la consulta
            guardarConsultar(false);
          })
          .catch(error => {
            console.log(error)
          })
      }
      consultarAPI()
    }
   }, [consultar]);

  return (
    <Router>
      <Switch>
        <Route
          exact 
          path="/"
          component={() => <Pacientes citas={citas}  />}
          />

          <Route
          exact 
          path="/nueva"
          component={() => <NuevaCita guardarCitas={guardarConsultar}/>}
          />

          <Route
          exact 
            path="/cita/:id"
            render={(props) => {
              const cita = citas.filter(cita => cita._id === props.match.params.id);

              console.log(cita)

              return (
                <Cita
                  cita={cita[0]}
                  guardarConsultar={guardarConsultar}
                />
              )
            }}
          />
      </Switch>
    </Router>
  );
}

export default App;
