"use client";

import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, FieldProps, ErrorMessage, useFormikContext } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Spinner from '@/components/Loading';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface RegisterValues {
    nome: string,
    sobrenome: string,
    email: string,
    cpf: string,
    telefone: string,
    senha: string,
    confirmSenha: string;
}

interface CustomFieldProps {
    className: string
}

const CpfField = ({ className }:CustomFieldProps) => {
    const { setFieldValue } = useFormikContext<RegisterValues>();

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 3) value = value.slice(0, 3) + "." + value.slice(3);
        if (value.length > 7) value = value.slice(0, 7) + "." + value.slice(7);
        if (value.length > 11) value = value.slice(0, 11) + "-" + value.slice(11, 14);

        setFieldValue("cpf", value); 
    };

    return (
        <Field name="cpf">
        {({ field }: FieldProps) => (
            <input
            {...field}
            placeholder="CPF"
            className={className}
            onChange={handleCpfChange}
            maxLength={14} 
            />
        )}
        </Field>
    );
}

const TelField = ({ className }:CustomFieldProps) => {
    const { setFieldValue } = useFormikContext<RegisterValues>();

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

export default function register() {
    const navigate = useRouter();
    const [isLoading, setLoading] = useState(false);
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

    const handleClickRegister = (values:RegisterValues) => {
            let nome = values.nome + " " + values.sobrenome
            setLoading(true)
            Axios.post("http://localhost:8080/Java_Web/api/clientes", {
                nome: nome,
                email: values.email,
                cpf: values.cpf.replace(/\D/g, ""),
                telefone: values.telefone.replace(/\D/g, ""),
                senha: values.senha
            }).then((response) => {
                if (response.status === 201) {
                    toast.success("Cadastrado bem sucedido.")
                    navigate.replace('/login')
                    return
                }
            }).catch(function (error) {
                console.log(error)
                toast.error(error.response.data, {
                    theme: (isDarkMode? "dark":"light")
                })
            });
    };

    useEffect(() => {
        if (isLoading) {
          const timer = setTimeout(() => {
            setLoading(false);
          }, 2000);
    
          return () => clearTimeout(timer)
        }
    }, [isLoading])

    const validationRegister = yup.object().shape({
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
    
    return(
        <div>
            <Header ultimoLink="Início" ultimoLinkDestino="/"/>
            {isLoading? (<Spinner/>) : (<></>)}
            <div className="main">
                <div className="wrapper-registro">
                    <h1 className="register-title">Cadastro</h1>
                    <Formik 
                        initialValues={{
                            nome: '',
                            sobrenome: '',
                            email: '',
                            cpf: '',
                            telefone: '',
                            senha: '',
                            confirmSenha: ''
                        }}
                        onSubmit={handleClickRegister}
                        validationSchema={validationRegister}
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
                                    <CpfField className="form-field"/>

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
                                    <button className="button" type="submit">Registrar</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="linkLogin">
                        <p>Já tem uma conta? <Link href='/login'>Entrar</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
