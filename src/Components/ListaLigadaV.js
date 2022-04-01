import React from 'react';
import { generarId } from '../Helpers';

export default function ListaLigadaV({
    listaProcesosVirtual,
    setListaProcesosVirtual,
    mVirtual,
    setMVirtual,
    eliminaProcesoV
    }) {
    
  return (
    <div className='container'>
        
        <nav aria-label="...">
            <ul className="pagination pagination-lg">
                {
                    listaProcesosVirtual.map((proceso)=>(
                        <div className='container-xs' key={generarId()+1}>
                            <div className="card border-info ">
                                <div className="card-header bg-transparent border-info text-center"><h5>{proceso.nombreProceso}</h5></div>
                                <div className="card-header bg-transparent border-info">Estado: {proceso.estado}</div>
                                <div className="card-header bg-transparent border-info">Tamanio: {proceso.sizeProceso}</div>
                                <div className="card-header bg-transparent border-info">PID: {proceso.pid}</div>
                                <div className="card-footer bg-transparent border-info">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="`${generarId()}`" data-bs-toggle="dropdown" aria-expanded="false">
                                        Opciones
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="`${generarId()}`">
                                        <li><button type="button" className="btn btn-danger" onClick={()=>{eliminaProcesoV(proceso)}}>Eliminar</button></li>
                                    </ul>    
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