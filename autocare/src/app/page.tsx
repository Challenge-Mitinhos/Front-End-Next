"use client";

import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { LoginContext } from '@/context/LoginContext';
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth<821)
  const context = useContext(LoginContext);
  const { toggleLogin } = context;

  const handleResize = () => {
      setIsMobile(window.innerWidth<821);
  };

  useEffect(() => {
      if (localStorage.getItem("id") && context?.login != "logado") {
        toggleLogin();
      }
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
  return (
    <div>
      <Header primeiroLink="Time" segundoLink="ChatBot" ultimoLink="Entrar" primeiroLinkDestino="/time" segundoLinkDestino="/chatbot" ultimoLinkDestino="/login"/>
      <div className="background">
        <div className="glass">
          <Image src={"/img/Robotics-cuate.svg"} alt={"RobotIMG"} width="1" height="1" style={{height:"32vw", width:"32vw"}} className="imgRobot"/>
          <div className="content flex flex-col gap-2">
            <h1 className="text-5xl font-bold">AutoCare Bot</h1>
            <p>Seu assistente virtual especializado em mecânica automotiva, impulsionado por tecnologia de {isMobile?<br/>:""}<a className="Ai">Inteligência Artificial.</a></p>
            <Link href={"/chatbot"}><button className="buttonChat">Inicie uma conversa</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
