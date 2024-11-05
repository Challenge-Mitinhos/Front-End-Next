"use client";

import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Car from './Car'

export default function PageCars() {
    const [carros, setCarros] = useState<[{
        idVeiculo: 0,
        modeloVeiculo: "",
        placaVeiculo: "",
        marcaVeiculo: "",
        idCliente: 0;
    }]>()

    const chamadaApi = () => {
        Axios.get(`http://localhost:8080/Java_Web/api/veiculos/cliente/${localStorage.getItem("id")}`)
        .then((response) => {
            if (response.status == 200) {
                setCarros(response.data)
            }
        }).catch(function (error) {
            console.log(error)
        })
    }

    useEffect(() => {
        chamadaApi();
    }, [carros]);

    return (
        <div>
            <h1 className="font-bold text-3xl mb-[30px] text-right">Meus Veículos</h1>
            <div className='flex gap-5 flex-wrap'>{carros?.map((carro) => (<Car key={carro.idVeiculo} id={carro.idVeiculo} marca={carro.marcaVeiculo} modelo={carro.modeloVeiculo} placa={carro.placaVeiculo}/>))}</div>
        </div>
    )
}
