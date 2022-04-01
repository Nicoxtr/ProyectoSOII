import React from 'react';
import { generarId } from '../Helpers';
export default function ListaLigada({listaProcesos,byteConfig,setByteConfig,reduceProceso,extiendeProceso,eliminaProceso}) {
    
  return (
    <div className='container'>
        
        <nav aria-label="...">
            <ul className="pagination pagination-lg">
                {
                    listaProcesos.map((proceso)=>(
                        <div className='container-xs' key={generarId()+1}>
                        <div className="card border-success ">
                            <div className="card-header bg-transparent border-success text-center"><h5>{proceso.nombreProceso}</h5></div>
                            <div className="card-header bg-transparent border-success">Estado: {proceso.estado}</div>
                            <div className="card-header bg-transparent border-success">Tamanio: {proceso.sizeProceso}</div>
                            <div className="card-header bg-transparent border-success">PID: {proceso.pid}</div>
                            <div className="card-footer bg-transparent border-success">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="`${generarId()}`" data-bs-toggle="dropdown" aria-expanded="false">
                                        Opciones
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="`${generarId()}`">
                                        <li><button type="button" className="btn btn-danger" onClick={()=>{eliminaProceso(proceso)}}>Eliminar</button></li>
                                    </ul>
                                    </div>
                                </div>
                        </div>
                    </div>
                    ))
                }
            </ul>
        </nav>
    </div>
  );
}