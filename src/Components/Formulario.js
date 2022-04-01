import React, { memo } from 'react'
import Error from './Error';
import { useState,useEffect } from 'react';
import ListaLigada from './ListaLigada';
import { generarId } from '../Helpers';
import Memoria from './Memoria';
import ListaLigadaV from './ListaLigadaV';
import { type } from '@testing-library/user-event/dist/type';
import Nodo from './Nodo';
import MemoriaVirtual from './MemoriaVirtual';

export default function Formulario({
    memoria,
    setMemoria,
    listaProcesos,
    setListaProcesos,
    espaciosAux,
    listaProcesosVirtual,
    setListaProcesosVirtual,
    mVirtual,
    setMVirtual,
    primeraBusqueda,
    setPrimeraBusqueda}) {

    const [nombreProceso,setNombreProceso]=useState("");
    const [sizeProceso,setSizeProceso]=useState(0);
    const [memoriaLlena,setMemoriaLlena]=useState(false);
    const [memoriaVllena,setMemoriaVllena]=useState(false);
    const [byteConfig,setByteConfig]=useState(0);
    const [limiteProceso,setLimiteProceso]=useState(false);

    
    let espacios=[];
    let espaciosMatrix=[];
    let arregloLista=[];
    let arregloLista2=[];
    useEffect(() => {
        buscaEspacios(espacios);
        console.log("Estos son los espacios por primera vez:",espacios);
        buscaSegmentos(espacios,espaciosMatrix);
        console.log("Esta es la matrix por primera vez: ",espaciosMatrix);
        let suma=0;
        memoria.map((bit)=>{
                suma=suma+bit.contenido;
            return bit;
        });

        console.log(suma);
        if(suma===0 || sizeProceso>suma){
            setMemoriaLlena(true);
        }else{
            setMemoriaLlena(false)
        }
        if(!primeraBusqueda){
            if(((memoria.filter(bit=> bit.contenido===1)).length)===0){
                setMemoriaLlena(true);
            }
        }
        if(mVirtual.length>=32){
            setMemoriaVllena(true);
            console.log("La memoria virtual esta llena");
        }
        console.log("Memoria pricipal llena: ",memoriaLlena);
        console.log("Memoria virtual llena: ",memoriaVllena);
        console.log("Numero de espacios: ",espacios);
        console.log("Matrix de espacios: ",espaciosMatrix);
        
        if(memoriaLlena && memoriaVllena){
            console.log("Ambas memorias estan llenas, favor de eliminar procesos");
        }else if(!memoriaLlena && memoriaVllena){
            console.log("Memoria pricipal disponible");
        }else if(memoriaLlena && !memoriaVllena){
            console.log("Memoria virtual disponible!");
              
        }else if(!memoriaLlena && !memoriaVllena){
            console.log("Ambas memorias disponibles");
            
        }

      },[memoriaLlena,memoriaVllena,espacios,espaciosMatrix,memoria]);
      arregloLista=buscaInicioFin1();  
      //console.log("Esta es nuestra lista de procesos del arregloLista: ",arregloLista);
      arregloLista2=buscaInicioFin2();  
      //console.log("Esta es nuestra lista de procesos del arregloLista2: ",arregloLista2);
    
      

      function handleSubmit(e){
        e.preventDefault();
        setPrimeraBusqueda(false);
        
        

        const estados=["ejecucion","listo","espera","ejecucion","listo","ejecucion"]; 
        //este sera nuestro nuevo proceso
        const nuevoProceso={
            estado:estados[Math.round(Math.random()*(5-0))+0],
            nombreProceso,
            sizeProceso,
            pid:(Math.round(Math.floor(Math.random() * (9999 - 1000)) + 1000))
        }
        espacios=elijeSegmento(espaciosMatrix,sizeProceso);
        console.log("Este sera nuestro segmento a ocupar: ",espacios);
        console.log("Este es tu nuevo proceso:",nuevoProceso)
        
        if(memoriaLlena && memoriaVllena){
            //console.log("Ambas memorias estan llenas, favor de eliminar procesos");
            if(nuevoProceso.estado==='ejecucion'){
                console.log("Este es proceso va a estar en ejecucion",nuevoProceso);
                busca_esperaListo(nuevoProceso);
            }else{
                console.log("%%%%%%%%Este es proceso va a estar en espera/listo",nuevoProceso);
            }
        }else if(!memoriaLlena && memoriaVllena){
            //console.log("Memoria pricipal disponible");
            asignaProcesoAMemoria(nuevoProceso);

        }else if(memoriaLlena && !memoriaVllena){
            //console.log("Memoria virtual disponible!");
            if(nuevoProceso.estado==="espera" || nuevoProceso.estado ==="listo"){
                asignaProcesoAMemoriaV(nuevoProceso);    
            }else if(nuevoProceso.estado==="ejecucion"){
                let procesoAux;
                if(procesoAux=buscaXEstado_Tamanio(nuevoProceso)){
                    //console.log("Este es tu proceso mas pesado en tu memoria: ",procesoAux);
                    swapProcesoListo(procesoAux,nuevoProceso);
                }
            }
        }else if(!memoriaLlena && !memoriaVllena){
            //console.log("Ambas memorias disponibles");
            if(nuevoProceso.estado==='ejecucion' || nuevoProceso.estado==='listo'){
                let existeEspacio=false;

                espaciosMatrix.forEach((espacio)=>{
                    if(nuevoProceso.sizeProceso<=espacio.length){
                        existeEspacio=true;
                    }
                });
                //if(existeEspacio && nuevoProceso.estado==='ejecucion'){
                    asignaProcesoAMemoria(nuevoProceso);
                //}else if(!existeEspacio && nuevoProceso.estado==='listo'){
                    //asignaProcesoAMemoriaV(nuevoProceso);
                //}
            }else if(nuevoProceso.estado==='espera'){
                asignaProcesoAMemoriaV(nuevoProceso);
            }
            
        }

        setSizeProceso(0);
        setNombreProceso("");
        espacios=[];
        espaciosMatrix=[];
    
    }
    function swapProcesoListo(procesoAux,nuevoProceso){
        //buscamos las posiciones del proceso a cambiar
        let espaciosAux=memoria.map((bit,index)=>{
            if(bit.contenido===procesoAux.nombreProceso){
                return index;
            }
        return bit;
        });
        //filtramos que solo se pasen las posiciones
        espacios=espaciosAux.filter((posicion)=>{
            if(typeof(posicion)==='number'){
                //console.log("Encontramos posiciones!: ",posicion );
                return posicion;
            }
        });
        //console.log("ESTOS SON NUESTROS ESPACIOS: ",espacios);
        //eliminamos el proceso-----------------------------------------------------------------------
        //limpiamos la memoria de nuestro espacio
        const arregloAux=memoria.map((bit)=>{
            if(procesoAux.nombreProceso===bit.contenido){
                return{
                    ...bit,
                    contenido:1
                }
            }
            return bit;
        });
        //console.log("ESTA ES NUESTRA MEMORIA LIMPIA: ",arregloAux);
        //Eliminamos el proceso de nuestro registro de procesos---------------------------------------------
        const arregloAux2=listaProcesos.filter((p)=>{
           return p.nombreProceso!==procesoAux.nombreProceso;
        });
        //console.log("ESTA ES NUESTRA LISTA DE PROCESOS SIN EL PROCESO ANTERIOR: ",arregloAux2);
        //agregamos el nuevo proceso a nuestro registro de procesos-------------------------------------------
        const arregloAux3=arregloAux.map((bit,index)=>{
            for(let i=0;i<nuevoProceso.sizeProceso;i++){
                if(espacios[i]===index){
                    return{
                        ...bit,
                        contenido:nuevoProceso.nombreProceso
                    }
                }
            }
        return bit;
        });
        //console.log("ESTA SERA NUESTRA NUEVA MEMORIA: ",arregloAux3);

        asignaProcesoAMemoriaV(procesoAux);
        //seteamos estado
        setListaProcesos([...arregloAux2, nuevoProceso]);
        setMemoria(arregloAux3);
        setNombreProceso('');
        setSizeProceso('');
        espacios=[];
        
    }
    function buscaXEstado_Tamanio(nuevoProceso){
        const procesosParaCambio=[];
        listaProcesos.map((p)=>{
            if(p.estado==="listo" || p.estado==="espera"){
                procesosParaCambio.push(p);
            }
            return p;
        });
        let existeEspacio=false;
        let posicion=0;
        procesosParaCambio.map((p,index)=>{
            if(nuevoProceso.sizeProceso<=p.sizeProceso){
                posicion=index;
                existeEspacio=true;
                //console.log("Este proceso se puede pasar a MV: ",p);
            }
            return p;
        });
        
        if(!existeEspacio){//si no existe espacio para intercambio
            asignaProcesoAMemoriaV(nuevoProceso);
        }else{//si existe espacio para intercambio
            const procesoMasPesado=procesosParaCambio[posicion];
            return procesoMasPesado;
        }
        
    }

    function asignaProcesoAMemoriaV(nuevoProceso){
        //agregamos el nuevo proceso a nuestro registro de procesos
        const limite=32;
        if(nuevoProceso.sizeProceso>32){
            //console.log("Proceso no pudo ser asignado por ser demasiado grande");
            return 
        }
        if(nuevoProceso.sizeProceso+mVirtual.length>limite){
            //console.log("No existe suficiente espacio");
            return
        }
        setListaProcesosVirtual([...listaProcesosVirtual,nuevoProceso]);
        let arregloAux=[];
        const bitAux={
                contenido:nuevoProceso.nombreProceso,
                posicion:generarId(),
                direccion:generarId(),
                pid:(Math.round(Math.floor(Math.random() * (9999 - 1000)) + 1000))
            }
        for(let i=0;i<nuevoProceso.sizeProceso;i++){
            arregloAux.push(bitAux);
        }
        
        setMVirtual([...mVirtual,...arregloAux]);
        
        
    }
    function asignaProcesoAMemoria(nuevoProceso){
        if(nuevoProceso.sizeProceso>32 ){
            //console.log("Proceso no pudo ser asignado por ser demasiado grande");
            return 
        }
        if(espacios===undefined){
            //console.log("Espacios indefinidos!!");
            return
        }
        
        //agregamos el nuevo proceso a nuestro registro de procesos
        setListaProcesos([...listaProcesos, nuevoProceso]);
            const arregloAux=memoria.map((bit,index)=>{
                for(let i=0;i<nuevoProceso.sizeProceso;i++){
                    if(espacios[i]===index){
                        return{
                            ...bit,
                            contenido:nuevoProceso.nombreProceso
                        }
                    }
                }
                return bit;
            });
        setMemoria(arregloAux);
        setNombreProceso('');
        setSizeProceso('');
    }
    
    function buscaEspacios(espacios){
        memoria.map((bit,index)=>{
            if(bit.contenido===1){
                espacios.push(index);   
            }
        });
    }

    function buscaSegmentos(espacios,espaciosMatrix){
        let arregloAux=[];
        //console.log("Estos son los espacios disponibles: ",espacios); 
        for(let i=0;i<espacios.length;i++){
            if(espacios[i]+1===espacios[i+1]){
                //console.log("Estamos haciendo pruebas:",(espacios[i]+1),(espacios[i+1]));
                arregloAux.push(espacios[i]);
                //console.log("Esto llevamos en el arreglo: ",arregloAux);
            }else{
                arregloAux.push(espacios[i]);
                espaciosMatrix.push(arregloAux);
                arregloAux=[];
                //console.log("Estos son los espacios de la matrix:",espaciosMatrix);
            }
        }
    }

    function elijeSegmento(espaciosMatrix,sizeProceso){
        for (let i = 0; i <espaciosMatrix.length ;i++) {
           //console.log("Index: ",i,"tamano es ram: ",espaciosMatrix[i].length);
            if(sizeProceso<=espaciosMatrix[i].length){
                //console.log("Encontramos espacio para el proceso: ",espaciosMatrix[i]);
                
                return espaciosMatrix[i]; 
            }
        }    
    }
    
    function eliminaProceso(proceso,version){
        //limpiamos la memoria de nuestro espacio
        const arregloAux=memoria.map((bit)=>{
            if(proceso.nombreProceso===bit.contenido){
                return{
                    ...bit,
                    contenido:1
                }
            }
            return bit;
        });
        //Eliminamos el proceso de nuestro registro de procesos
        const arregloAux2=listaProcesos.filter((p)=>{
           return p.nombreProceso!==proceso.nombreProceso;
        });
        //seteamos estados
        setListaProcesos(arregloAux2);
        setMemoria(arregloAux);
        setMemoriaLlena(false);
    }
    function eliminaProcesoV(proceso){
        //Eliminamos de memoria
        const arregloAux=mVirtual.filter((bit)=>bit.contenido !== proceso.nombreProceso);
        //Eliminamos de lista de procesosV
        const arregloAux2=listaProcesosVirtual.filter((p)=>p.nombreProceso !== proceso.nombreProceso);
    
        setMVirtual(arregloAux);
        setListaProcesosVirtual(arregloAux2);
    }
    
    function reduceProceso(proceso){
        if(byteConfig>0 && (proceso.sizeProceso+byteConfig<=proceso.sizeMax)){
            setLimiteProceso(false);
            const arregloAux=listaProcesos.map((p,index)=>{
                if(proceso.nombreProceso===p.nombreProceso){
                    return{
                        ...p,
                        sizeRAM:proceso.sizeRAM-byteConfig
                    }
                }
                return p;
            });
            proceso.sizeRAM=proceso.sizeRAM-byteConfig;
            setListaProcesos(arregloAux);
            const arregloAux2=memoria.map((bit,index)=>{
                if(proceso.nombreProceso===bit.contenido){
                    espaciosAux.push(index);
                    return{
                        ...bit,
                        contenido:1
                    }
                }
                return bit;
            });

            for(let i=0;i<byteConfig;i++){
                espaciosAux.pop();
            }
            let posicion;
            const arregloAux3=arregloAux2.map((bit,index)=>{
                for(let i=0;i<espaciosAux.length;i++){
                    posicion=espaciosAux[i];
                    if(posicion===index){
                        return{
                            ...bit,
                            contenido:proceso.nombreProceso
                        }
                    }
                    
                }
                return bit;
            });
            setMemoria(arregloAux3);
            espaciosAux=[];
            setByteConfig(0);
        }else{
            setLimiteProceso(true);
        }
    }

    function extiendeProceso(proceso){
        //console.log("Este es nuestro proceso a modificar: ",proceso);
        if(byteConfig>0 && byteConfig<=proceso.sizeExtra && byteConfig+proceso.sizeProceso<=proceso.sizeRAM+byteConfig){
            setLimiteProceso(false);
            //console.log("Podemos extender nuestro proceso");
            const arregloAux=listaProcesos.map((p)=>{
                if(proceso.nombreProceso===p.nombreProceso){
                    return{
                        ...p,
                        sizeRAM:proceso.sizeRAM+byteConfig
                    }
                }
                return p;
            });
            proceso.sizeRAM=proceso.sizeRAM+byteConfig;
            setListaProcesos(arregloAux);
            console.log(listaProcesos);
            
            //buscamos donde esta el proceso y guardamos indices
            const arregloAux2=memoria.map((bit,index)=>{
                if(proceso.nombreProceso===bit.contenido){
                    espaciosAux.push(index);
                }
                return bit;
            })
            //buscamos si tenemos espacios adyacente disponibles a partir de la ultima posicion
            let ultimaPosicion=espaciosAux[espaciosAux.length-1];
            console.log("Esta es nuestra ultima posicion: ",ultimaPosicion);
            console.log("Estos son nuestros espacios a extender: ",espaciosAux);

            const arregloAux3=memoria.map((bit,index)=>{
                if(index===ultimaPosicion){
                    console.log("encontramos la ultima posicion: ",index,ultimaPosicion);
                    console.log("$$$$$$",memoria[index+1].contenido);
                    for(let i=1;i<=byteConfig;i++){
                        console.log("$$$$$$",memoria[index+i].contenido);
                        if(memoria[index+i].contenido===1){
                            console.log("Encontramos espacio!!!",index+i);
                            espaciosAux.push(index+i);
                        }
                    }
                }
                return bit;
            });
            let posicion;
            const arregloAux4=arregloAux3.map((bit,index)=>{
                for(let i=0;i<espaciosAux.length;i++){
                    posicion=espaciosAux[i];
                    if(posicion===index){
                        return{
                            ...bit,
                            contenido:proceso.nombreProceso
                        }
                    }
                    
                }
                return bit;
            });
            setMemoria(arregloAux4)
            console.log("%%%Estos son nuestros nuevos espacios!!!!",espaciosAux);

        }else{
            console.log("!!!!!No podemos extender este proceso");
            setLimiteProceso(true);
        }
    }
    function buscaInicioFin1(){
        let primeraVez=true;
        let inicio=0;
        let fin=0;   
        const arregloAux=listaProcesos.map((proceso)=>{
                        inicio=0;
                        memoria.map((bit,j)=>{
                            if(primeraVez){
                                if(proceso.nombreProceso===bit.contenido){
                                    inicio=j;
                                    primeraVez=false;
                                }
                            }else{
                                if(proceso.nombreProceso===bit.contenido){
                                    fin=j;
                                }else{
                                    primeraVez=true;
                                    return
                                }
                            }
                            return bit;
                        });
                    const procesoAux={
                        nombreProceso:proceso.nombreProceso,
                        sizeProceso:proceso.sizeProceso,
                        inicio,
                        fin
                    }
                    //console.log("Este es nuestro procesoAux: ",procesoAux);
                    return procesoAux;
        });
        
        return arregloAux;
    }

    function buscaInicioFin2(){
        let primeraVez=true;
        let inicio=0;
        let fin=0;   
        const arregloAux=listaProcesosVirtual.map((proceso)=>{
                        inicio=0;
                        mVirtual.map((bit,j)=>{
                            if(primeraVez){
                                if(proceso.nombreProceso===bit.contenido){
                                    inicio=j;
                                    primeraVez=false;
                                }
                            }else{
                                if(proceso.nombreProceso===bit.contenido){
                                    fin=j;
                                }else{
                                    primeraVez=true;
                                    return
                                }
                            }
                            return bit;
                        });
                    const procesoAux={
                        nombreProceso:proceso.nombreProceso,
                        sizeProceso:proceso.sizeProceso,
                        inicio,
                        fin
                    }
                    //console.log("Este es nuestro procesoAux: ",procesoAux);
                    return procesoAux;
        });
        
        return arregloAux;
    }

    function busca_esperaListo(nuevoProceso){
        listaProcesos.map((proceso)=>{
            if((proceso.estado==='espera' || proceso.estado==='listo')&& (nuevoProceso.sizeProceso<=proceso.sizeProceso)){
                return eliminaProceso(proceso);
            }
        });
    }
    
    function eliminaXCola(){
        const procesoAEliminar = listaProcesos[0];
        eliminaProceso(procesoAEliminar);
    }
    function eliminaXCola2(){
        const procesoAEliminar = listaProcesosVirtual[0];
        eliminaProcesoV(procesoAEliminar);
    }
    return (
        <div className='container row'>
            {memoriaLlena? <Error/>:null}
            <div className='container form-group col-sm-3'>
                <form >    
                    <label>Nombre del proceso</label>
                    <input 
                        className="form-control form-control-sm m-2" 
                        type="text" 
                        placeholder="p.ejem: A" 
                        value={nombreProceso}
                        onChange={(e)=>{setNombreProceso(e.target.value)}}
                        >
                    </input>
                    <label>tamano del proceso</label>
                    <input 
                        className="form-control form-control-sm m-2" 
                        type="number" 
                        placeholder="p.ejem: 3" 
                        value={sizeProceso}
                        onChange={(e)=>{setSizeProceso(parseInt(e.target.value))}}
                        >
                    </input>
                    <div>
                        <button type="submit" className="btn btn-success" onClick={handleSubmit}>Crear proceso</button>
                    </div>
                </form>
            </div>
            
            <h3>Lista de procesos</h3>
            {limiteProceso? <Error/>:null}
            <h4>Lista fisica</h4>
            <div className='container'>
                <button className='btn btn-danger' onClick={eliminaXCola}>eliminaXCola</button>
            </div>
            <ListaLigada
                listaProcesos={listaProcesos}
                setListaProcesos={setListaProcesos}
                memoria={memoria}
                setMemoria={setMemoria}
                byteConfig={byteConfig}
                setByteConfig={setByteConfig}
                reduceProceso={reduceProceso}
                extiendeProceso={extiendeProceso}
                eliminaProceso={eliminaProceso}
                
            />
            <h4>Lista virtual</h4>
            <div className='container'>
                <button className='btn btn-danger' onClick={eliminaXCola2}>eliminaXCola</button>
            </div>
            <ListaLigadaV
                listaProcesosVirtual={listaProcesosVirtual}
                setListaProcesosVirtual={setListaProcesosVirtual}
                mVirtual={mVirtual}
                setMVirtual={setMVirtual}
                eliminaProcesoV={eliminaProcesoV}
                

            />
            <h4>Lista Ligada fisica</h4>
            <h6>
                Nombre[<button className='btn btn-danger'></button>]
                Tamanio[<button className='btn btn-primary'></button>]
                Inicio-Fin[<button className='btn btn-success'></button>]
            </h6>
            <div className='d-flex align-items-start'>
                {arregloLista.map((proceso)=>(
                    <Nodo
                    proceso={proceso}
                    />
                ))}
            </div>
            <h4>Lista Ligada virtual</h4>
            <div className='d-flex align-items-start'>
                {arregloLista2.map((proceso)=>(
                    <Nodo
                    proceso={proceso}
                    />
                ))}
            </div>
        </div>
    )
}