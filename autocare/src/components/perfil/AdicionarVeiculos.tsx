import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from "yup";
import Axios from "axios";
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const validateVeiculo = yup.object().shape({
    marca: yup
    .string()
    .required("Campo obrigatório."),
    modelo: yup
    .string()
    .required("Campo obrigatório."),
    placa: yup
    .string()
    .required("Campo obrigatório.")
})

interface Values {
    marca:string,
    modelo:string,
    placa:string
}


export default function AdicionarVeiculos() {
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

const handleClick = async (values:Values) => {
    Axios.post("http://localhost:8080/Java_Web/api/veiculos/", {
            idCliente: localStorage.getItem("id"),
            modeloVeiculo: values.modelo,
            placaVeiculo: values.placa,
            marcaVeiculo: values.marca
        }).then((response) => {
            if (response.status == 201) {
                toast.success("Veículo cadastrado.", {theme: (isDarkMode?"dark":"light")})
            }
        }).catch(function (error) {
            toast.error(error.response.data, {theme: (isDarkMode?"dark":"light")})
        })
    }

    return (
        <div>
            <h1 className="font-bold text-3xl mb-[20px] text-right">Cadastrar Veículo</h1>
            <Formik 
                initialValues={{
                marca: '',
                modelo: '',
                placa: '',
                }}
                onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                    resetForm();
                }, 200) 
                handleClick(values)}}
                validationSchema={validateVeiculo}
            >
                <Form className="login-form flex flex-col items-center">
                    <div className="login-form-group">
                        <div className="input-box">
                        <Field name="marca" className="form-field" placeholder="Marca"/>
                        </div>

                        <ErrorMessage
                        component="span"
                        name="marca"
                        className="form-error"/>
                    </div>

                    <div className="login-form-group">
                        <div className="input-box">
                        <Field name="modelo" className="form-field" placeholder="Modelo"/>
                        </div>

                        <ErrorMessage
                        component="span"
                        name="modelo"
                        className="form-error"/>
                    </div>

                    <div className="login-form-group">
                        <div className="input-box">
                        <Field name="placa" className="form-field" placeholder="Placa"/>
                        </div>

                        <ErrorMessage
                        component="span"
                        name="placa"
                        className="form-error"/>
                    </div>

                    <button className="button-veiculo mt-2" type="submit">Cadastrar</button>
                </Form>
            </Formik>
        </div>
    )
}
