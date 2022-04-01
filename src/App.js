import './App.css';
import { useState,useEffect } from 'react';
import {mapa} from "./ArregloMapa";
import Mapa from './Components/Mapa';
import Memoria from './Components/Memoria';
import Formulario from './Components/Formulario';
import MemoriaVirtual from './Components/MemoriaVirtual';
function App() {
  const [mapaBits,setMapaBits]=useState(mapa);
  const [memoria,setMemoria]=useState(mapa);
  const [listaProcesos,setListaProcesos]=useState([]);
  //trabajamos con la Mvirtual
  const [mVirtual,setMVirtual]=useState([]);
  const [listaProcesosVirtual,setListaProcesosVirtual]=useState([]);
  const [primeraBusqueda,setPrimeraBusqueda]=useState(true);
  let espaciosAux=[];

  useEffect(() => {
    console.log("Esta es nuestra MF: ",memoria);
    console.log("Esta es nuestra MV: ",mVirtual);
    console.log("Esta es la lista de procesosVirtual: ",listaProcesosVirtual);
  },[memoria,mVirtual,listaProcesosVirtual,listaProcesos]);

    return (
      <div className='container'>
        <h4>Mapa de bits</h4>
        <Mapa
          mapaBits={mapaBits}
          setMapaBits={setMapaBits}
          setMemoria={setMemoria}
        />
      <h3>Memoria</h3>
      <Memoria
        mapaBits={mapaBits}
        memoria={memoria}
      />
      <h3>MemoriaVirtual</h3>
      <MemoriaVirtual
        mapaBits={mapaBits}
        mVirtual={mVirtual}
        setMVirtual={setMVirtual}
        listaProcesosVirtual={listaProcesosVirtual}
        setListaProcesosVirtual={setListaProcesosVirtual}
      
      />
      <h3>Creacion de procesos</h3>
      <Formulario
        memoria={memoria}
        setMemoria={setMemoria}
        mapaBits={mapaBits}
        setMapaBits={setMapaBits}
        listaProcesos={listaProcesos}
        setListaProcesos={setListaProcesos}
        mapa={mapa}
        espaciosAux={espaciosAux}

        primeraBusqueda={primeraBusqueda}
        setPrimeraBusqueda={setPrimeraBusqueda}
        //MemoriaVirtual
        mVirtual={mVirtual}
        setMVirtual={setMVirtual}
        listaProcesosVirtual={listaProcesosVirtual}
        setListaProcesosVirtual={setListaProcesosVirtual}
      />
      </div>
    );
}

export default App;
