import React from 'react'
import { generarId } from '../Helpers';

export default function Mapa({mapaBits,setMapaBits,setMemoria}) {
    
    function actualizaBit(contenido,posicion){
        const arregloAux=mapaBits.map((bit)=>{
            if(bit.posicion===posicion){
                if(contenido===1){
                    return{
                       ...bit,
                       contenido:0 
                    }
                }else if(contenido===0){
                    return{
                        ...bit,
                        contenido:1
                    }
                }
            }
            return bit;
        });
        //llenaRef(contenido,posicion);
        setMapaBits(arregloAux);
        setMemoria(arregloAux);
    }
    return (
    <>
    <div className='container'>
        <table className="table table-bordered table-sm ">
            <tbody>
                <tr>
                    <th><h4>0</h4></th>
                    {mapaBits.map((bit,i)=>{
                        if(i>=0 && i<=7 ){
                            return(
                                <td key={generarId()}>
                                    <div className='container'>      
                                        <div className='row'>
                                            <div className='col-sm'>
                                                <h5>{bit.posicion}</h5>
                                            </div>
                                            |
                                            <div className='col-sm'>
                                                <h5>"{bit.direccion}"</h5>
                                            </div>
                                            <button 
                                                type="button" 
                                                className="btn btn-primary btn-lg "
                                                id={bit.posicion}
                                                onClick={()=>{actualizaBit(bit.contenido,bit.posicion)}}
                                                >
                                                {bit.contenido} 
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                )
                            }
                            return
                        })}
                </tr>
                <tr>
                </tr>
                <tr>
                    <th><h4>1</h4></th>
                    {mapaBits.map((bit,i)=>{
                        if(i>7 && i<=15 ){
                            return(
                                <td key={generarId()}>
                                    <div className='container'>      
                                        <div className='row'>
                                            <div className='col-sm'>
                                                <h5>{bit.posicion}</h5>
                                            </div>
                                            |
                                            <div className='col-sm'>
                                                <h5>"{bit.direccion}"</h5>
                                            </div>
                                            <button 
                                                type="button" 
                                                className="btn btn-primary btn-lg "
                                                id={bit.posicion}
                                                onClick={()=>{actualizaBit(bit.contenido,bit.posicion)}}
                                                >
                                                {bit.contenido} 
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                )
                            }
                           return
                        })}
                </tr>
                <tr>
                </tr>
                <tr>
                    <th><h4>2</h4></th>
                    {mapaBits.map((bit,i)=>{
                        if(i>15 && i<=23 ){
                            return(
                                <td key={generarId()}>
                                    <div className='container'>      
                                        <div className='row'>
                                            <div className='col-sm'>
                                                <h5>{bit.posicion}</h5>
                                            </div>
                                            |
                                            <div className='col-sm'>
                                                <h5>"{bit.direccion}"</h5>
                                            </div>
                                            <button 
                                                type="button" 
                                                className="btn btn-primary btn-lg "
                                                id={bit.posicion}
                                                onClick={()=>{actualizaBit(bit.contenido,bit.posicion)}}
                                                >
                                                {bit.contenido} 
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                )
                            }
                        return
                        })}
                </tr>
                <tr>
                </tr>
                <tr>
                    <th><h4>3</h4></th>
                    {mapaBits.map((bit,i)=>{
                        if(i>23 && i<=31 ){
                            return(
                                <td key={generarId()}>
                                    <div className='container'>      
                                        <div className='row'>
                                            <div className='col-sm'>
                                                <h5>{bit.posicion}</h5>
                                            </div>
                                            |
                                            <div className='col-sm'>
                                                <h5>"{bit.direccion}"</h5>
                                            </div>
                                            <button 
                                                type="button" 
                                                className="btn btn-primary btn-lg "
                                                id={bit.posicion}
                                                onClick={()=>{actualizaBit(bit.contenido,bit.posicion)}}
                                                >
                                                {bit.contenido} 
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                )
                            }
                        return
                        })}
                </tr>
                <tr>
                </tr>
            </tbody>
        </table>
    </div>
    </>
    )
}