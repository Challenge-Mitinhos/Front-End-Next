import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Axios from 'axios';
import { toast } from 'react-toastify';

type CarType = {
    id:number,
    modelo:string,
    placa:string,
    marca:string;
}

export default function Car({id,modelo,placa,marca}:CarType) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);

        const handleChange = (event: { matches: boolean | ((prevState: boolean) => boolean); }) => {
            setIsDarkMode(event.matches);
        };

        darkModeQuery.addEventListener('change', handleChange);

        return () => {
            darkModeQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const handleDelete = () => {
        Axios.delete(`http://localhost:8080/Java_Web/api/veiculos/${id}`)
        .then((response) => {
            if (response.status == 200) {
                toast.success("Veículo excluído!", {theme: (isDarkMode?"dark":"light")})
            }
        }).catch(function (error) {
            toast.error(error.response.data, {theme: (isDarkMode?"dark":"light")})
        })
    }

    return (
        <div className="flex flex-col gap-2 bg-opacity-15 bg-slate-950 p-4 rounded-2xl shadow[rgba(0,0,0,1)] shadow-md">
            <Image className="rounded-xl" src={"/img/carro-davi.jpeg"} alt="Carro genérico" width={250} height={1}/>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-1'>
                    <p>{marca + " - " + modelo}</p>
                    <h1 className="font-bold">{placa}</h1>
                </div>
                <div className='cursor-pointer bg-red-900 w-12 h-12 rounded-lg flex justify-center items-center' onClick={() => handleDelete()}>
                    <i className='bx bx-trash-alt text-3xl' ></i>
                </div>
            </div>
        </div>
    )
}
