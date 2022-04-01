import React from 'react'
import { generarId } from '../Helpers';
function Nodo({proceso}) {
  return (
    <div className='m-1'>
        <table className="table-sm table-bordered  border  border-3 rounded" key={generarId()}>
                <thead>
                    <tr>
                        <th scope="col"><h6 className='text-danger'>{proceso.nombreProceso}</h6></th>
                        <th scope="col"><h6 className='text-primary'>{proceso.sizeProceso}</h6></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"><h6 className='text-success'>{proceso.inicio}</h6></th>
                        <td><h6 className='text-success'>{proceso.sizeProceso}</h6></td>
                    </tr>
                    
                </tbody>
        </table>
    </div>
  )
}

export default Nodo;