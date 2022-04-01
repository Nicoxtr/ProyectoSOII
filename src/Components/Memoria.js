import { generarId } from "../Helpers"

export default function Memoria({mapaBits,memoria}) {
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
              {memoria.map((bit)=>{
                  return(<th scope="col" key={generarId()}>{bit.contenido}</th>)
              })}
             
            </tr>
            
          </tbody>
        </table>
        
        </div>
    )
}