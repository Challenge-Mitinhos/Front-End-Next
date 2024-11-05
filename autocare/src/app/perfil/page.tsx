"use client";

import Header from '@/components/Header'
import * as yup from "yup";
import { ErrorMessage, Field, FieldProps, Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react'
import Axios from "axios";
import { toast } from 'react-toastify';
import { ProtectedRoute } from '../protected';
import Car from '@/components/perfil/Car';
import PageCars from '@/components/perfil/PageCars';
import AdicionarVeiculos from '@/components/perfil/AdicionarVeiculos';

interface ProfileValues {
    nome: string,
    sobrenome: string,
    email: string,
    cpf: string,
    telefone: string,
    senha: string,
    confirmSenha: string;
}

interface CustomFieldProps {
    className: string,
    value?:string|number;
}

const TelField = ({ className,value }:CustomFieldProps) => {
    const { setFieldValue } = useFormikContext<ProfileValues>();

    const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        if (value.length > 10) value = `${value.slice(0, 10)}-${value.slice(10)}`;

        setFieldValue("telefone", value);
    };

    return (
        <Field name="telefone">
        {({ field }: FieldProps) => (
            <input
            {...field}
            placeholder="Telefone (Opcional)"
            className={className}
            onChange={handleTelChange}
            maxLength={15}
            />
        )}
        </Field>
    );
}

type TipoCliente = {
    id:number,
    nome:string,
    sobrenome:string,
    email:string,
    cpf:number,
    telefone:string,
    senha:string,
}



const validationUpdate = yup.object().shape({
    nome: yup
    .string()
    .min(2,"Mínimo 2 letras")
    .max(30)
    .required("Campo obrigatório")
    .matches(/^[A-Za-zÀ-ÖØ-ÿ\s]+$/, "Deve conter apenas letras"),
    sobrenome: yup
    .string()
    .min(2,"Mínimo 2 letras")
    .max(50)
    .required("Campo obrigatório")
    .matches(/^[A-Za-zÀ-ÖØ-ÿ\s]+$/, "Deve conter apenas letras"),
    email: yup
    .string()
    .email("Favor digitar um email válido")
    .required("Campo obrigatório")
    .max(60)
    .matches(/\./,"Favor digitar um email válido"),
    cpf: yup
    .string()
    .required("Campo obrigatório"),
    senha: yup
    .string()
    .min(8, "A senha deve conter ao menos 8 caracteres")
    .required("Campo obrigatório"),
    confirmSenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas não são iguais")
    .required("Campo obrigatório")
})

export default function perfil() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleUpdate = (values:ProfileValues) => {
        Axios.put(`http://localhost:8080/Java_Web/api/clientes/${localStorage.getItem("id")}`, {
            nome: values.nome,
            sobrenome: values.sobrenome,
            email: values.email,
            cpf: values.cpf,
            telefone: values.telefone,
            senha: values.senha
        }).then((response) => {
            if (response.status === 200) {
                toast.success("Cadastro atualizado.", {theme: (isDarkMode?"dark":"light")})
                return
            }
        })
    }

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

    const [dados, setDados] = useState<TipoCliente>({
        id: 0,
        nome: "",
        sobrenome: "",
        email: "",
        cpf: 0,
        telefone: "",
        senha: ""
    })

    const chamadaApi = async () => {
        Axios.get(`http://localhost:8080/Java_Web/api/clientes/${localStorage.getItem("id")}`)
        .then((response) => {
            if (response.data.telefone === null) {
                    response.data.telefone = "";
                }
            setDados(response.data)
        })
    }

    useEffect(() => {
        chamadaApi();
    }, []);

    function formatarCPF(cpf:number) {
        let cpfString = cpf.toString()
        cpfString = cpfString.replace(/\D/g, "");
        return cpfString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    function formatarTelefone(telefone:string) {
        telefone = telefone.replace(/\D/g, "");
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    
    const ProfileData = () => {
        return (
            <div className="wrapper-perfil">
                <div className="title-box flex justify-between">
                    <div className="title-name">
                        <h1>Bem vindo, {dados.nome}.</h1>
                        <p className='text-xs'>{formattedDate}</p>
                    </div>
                    <h1 className="register-title">Perfil</h1>
                </div>
                
                <Formik 
                        initialValues={{
                            nome: dados.nome,
                            sobrenome: dados.sobrenome,
                            email: dados.email,
                            cpf: formatarCPF(dados.cpf),
                            telefone: formatarTelefone(dados.telefone),
                            senha: '',
                            confirmSenha: ''
                        }}
                        onSubmit={handleUpdate}
                        validationSchema={validationUpdate}
                >
                    {() => (
                        <Form className="register-form">
                            <div className="register-form-group">
                                <Field name="nome" className="form-field" placeholder="Nome" maxLength={30}/>
    
                                <ErrorMessage
                                component="span"
                                name="nome"
                                className="form-error"/>
                            </div>
    
                            <div className="register-form-group">
                                <Field name="sobrenome" className="form-field" placeholder="Sobrenome" maxLength={50}/>
    
                                <ErrorMessage
                                component="span"
                                name="sobrenome"
                                className="form-error"/>
                            </div>
    
                            <div className="register-form-group big-field">
                                <Field name="email" className="form-field" placeholder="Email" maxLength={60}/>
    
                                <ErrorMessage
                                component="span"
                                name="email"
                                className="form-error"/>
                            </div>
    
                            <div className="register-form-group">
                                <Field name="cpf" className="form-field cpf-perfil" readOnly/>
    
                                <ErrorMessage
                                name="cpf"
                                component="span"
                                className="form-error"
                                />
                            </div>
    
                            <div className="register-form-group">
                                <TelField className="form-field"/>
                                <ErrorMessage
                                name="telefone"
                                component="span"
                                className="form-error"/>
                            </div>
    
                            <div className="register-form-group">
                                <Field name="senha" className="form-field" placeholder="Senha" type="password"/>
    
                                <ErrorMessage
                                component="span"
                                name="senha"
                                className="form-error"/>
                            </div>
    
                            <div className="register-form-group">
                                <Field name="confirmSenha" className="form-field" placeholder="Confirme a Senha" type="password"/>
    
                                <ErrorMessage
                                component="span"
                                name="confirmSenha"
                                className="form-error"/>
                            </div>
                            <div className="register-submit">
                                <button className="button" type="submit">Atualizar</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }

    const today = new Date();
    let formattedDate = new Intl.DateTimeFormat('pt-BR', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(today);

    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    formattedDate = formattedDate.slice(0, 3) + formattedDate.slice(4);
    
    const [botao, setBotao] = useState<"Perfil"|"Veiculos"|"AdicionarVeiculo">("Perfil")

    const Carros = [
        {
            id: 2,
            modelo: "HB20",
            placa: "GGR-9C00",
            marca: "Hyundai"
        }
    ]

    return (
        // <ProtectedRoute>
        <>
            <Header primeiroLink='Início' segundoLink='Time' terceiroLink='Chatbot' primeiroLinkDestino='/' segundoLinkDestino='/time' terceiroLinkDestino='/chatbot' ultimoLink='Sair' perfil sair/>
            <div className='background-perfil'>
                <div className='box-perfil'>
                    <div>
                        <ul className='buttons-profile'>
                            <li className={`cursor-pointer button-profile ${botao == "Perfil" ? "bg-[#01a1fd]" : ""}`} onClick={() => setBotao("Perfil")}><i className='bx bx-user text-2xl'></i></li>
                            <li className={`cursor-pointer button-profile ${botao == "Veiculos" ? "bg-[#01a1fd]" : ""}`} onClick={() => setBotao("Veiculos")}><i className='bx bx-car text-2xl' ></i></li>
                            <li className={`cursor-pointer button-profile ${botao == "AdicionarVeiculo" ? "bg-[#01a1fd]" : ""}`} onClick={() => setBotao("AdicionarVeiculo")}><i className='bx bx-plus' ></i></li>
                        </ul>
                    </div>
                    <div className='content-perfil'>
                        <div className='title-perfil'>
                        </div>
                        <div className='option'>
                            {botao == "Perfil" ? <ProfileData/> : botao == "Veiculos" ? <PageCars/> : <AdicionarVeiculos/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
        // </ProtectedRoute>
    )
}
