import React from 'react'
import { generarId } from '../Helpers';
function MemoriaVirtual({mapaBits,listaProcesosVirtual,setListaProcesosVirtual,mVirtual,setMVirtual}) {
  return (
    <div className='container'>
        <table className="table table-bordered">
          <thead>
            <tr>
                {mapaBits.map((bit,index)=>(
                    <th scope="col" key={generarId()}>{index}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            <tr>
            {mVirtual.map((bit)=>{
                  return(<th scope="col" key={generarId()}>{bit.contenido}</th>)
              })}
             
            </tr>
            
          </tbody>
        </table>
        
        </div>
  )
}

export default MemoriaVirtual