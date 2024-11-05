"use client";

import Header from '@/components/Header'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from "yup";
import Axios from "axios";
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '@/context/LoginContext';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Loading';
import { toast } from 'react-toastify';

interface Values {
  email: string;
  senha: string;
}

export default function login() {
  const navigate = useRouter();
  const context = useContext(LoginContext);
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

  if (!context) {
    throw new Error("LoginComponent LoginProvider")
  } 

  const { toggleLogin } = context;
  const [lockOpen, setLockOpen] = useState(false);

  const handleClick = async (values:Values) => {
    setLoading(true)
    Axios.post("http://localhost:8080/Java_Web/api/clientes/login", {
      email: values.email,
      senha: values.senha
    }).then((response) => {
      if (response.status === 200) {
        toggleLogin();
        toast.success("Usuário logado!", {theme: (isDarkMode?"dark":"light")})
        // if (isChecked) {
          localStorage.setItem("id", JSON.stringify(response.data.clienteId))
        // }
        navigate.replace("/");
      }
    }).catch(function (error) {
      toast.error(error.response.data, {theme: (isDarkMode?"dark":"light")});
    });
  };  

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5000);

      return () => clearTimeout(timer)
    }
  }, [isLoading])

  const validationLogin = yup.object().shape({
    email: yup
    .string()
    .email("Favor digitar um email válido.")
    .required(""),
    senha: yup
    .string()
    .required(""),
  })

  const handleMouseEnter = () => {
    document.getElementById("lock")!.style.cursor = 'pointer';
  };

  const handleMouseLeave = () => {
    document.getElementById("lock")!.style.cursor = 'default';
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    console.log(event.target.checked)
  };

  return (
    <>
      <Header ultimoLink="Início" ultimoLinkDestino="/"/>
      {isLoading? (<Spinner/>) : (<></>)}
      <div className="main">
        <div className="Wrapper container">
            <h1 className="wrapperTitle">Entre</h1>
            <Formik 
              initialValues={{
                email: '',
                senha: ''
              }}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  resetForm();
                }, 200)
                handleClick(values)
              }}
              validationSchema={validationLogin}
            >
              <Form className="login-form">
                <div className="login-form-group">
                  <div className="input-box">
                    <Field name="email" className="form-field" placeholder="Email"/>
                    <i className="bx bx-user"></i>
                  </div>

                  <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"/>
                </div>

                <div className="login-form-group">
                  <div className="input-box">
                    <Field name="senha" className="form-field" placeholder="Senha" type={lockOpen?"text":"password"}/>
                    <i 
                      className={`bx ${lockOpen?"bx-lock-open-alt":"bx-lock-alt"}`}
                      id="lock" 
                      onMouseEnter={handleMouseEnter} 
                      onMouseLeave={handleMouseLeave}
                      onClick={() => (setLockOpen(!lockOpen))}
                    ></i>
                  </div>
                </div>

                <div className="remember-forgot">
                    <label className="check-box">
                      <Field name="remember" className="remember" type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                      Lembrar de mim
                    </label>
                    <Link href={"#"}>Esqueceu a senha?</Link>
                </div>

                <button className="button" type="submit">Entre</button>
              </Form>
            </Formik>
            <div className="linkRegistro">
              <p>Ainda não tem uma conta? <Link href={'/register'}>Registre-se</Link></p>
            </div>
        </div>
      </div>
    </>
  )
}
