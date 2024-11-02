"use client"
import Header from '@/components/Header'
import Link from 'next/link';
import Image from "next/image";
import React from 'react'
import ScrollTop from '@/components/ScrollTop';

const scrollToFunction = (selected:string): (() => void) => {
    return () => {
        const element = document.querySelector(selected);
        if (element) {
            element.scrollIntoView({behavior:"smooth"});
        }
    }
}

export default function page() {
    const logged = false;

    return (
        <>
            <Header primeiroLink="Início" segundoLink="ChatBot" ultimoLink="" primeiroLinkDestino="/"/>
            <div className="Content">
                <ScrollTop/>
                <div className="FirstSection">
                    <div className="glass glass-time">
                        <div className="text">
                            <h1 className="font-bold">Nosso Time</h1>
                            <p>Conecte-se diretamente com os desenvolvedores do projeto para suporte e esclarecimentos.</p>
                            <button className="buttonChat" onClick={scrollToFunction(".SecondSection")}>Conheça nossa equipe</button>
                        </div>
                        <Image src={"/img/meeting-cuate.svg"} alt={"RobotIMG"} width="1" height="1" style={{height:"32vw", width:"32vw"}} className="imgRobot"/>
                    </div>
                </div>
                <div className="SecondSection">
                    <h1 className="titleDevs font-bold">Desenvolvedores</h1>
                    <div className="timeWrapper">
                        <div className="card">
                            <div className="social">
                                <Link href="https://github.com/MikaelDv" target="_blank">
                                    <div>
                                        <Image src={"/img/github-brands-solid.svg"} alt={"GitHub icon"} width="1" height="1" style={{height: "27.42px", width: "24px"}}/>
                                    </div>
                                </Link>
                                <Link href="https://instagram.com/011mikael" target="_blank" >
                                    <div>
                                        <img style={{height: "27.42px", width: "24px"}} src="/img/instagram-brands-solid.svg" alt="Instagram icon" />
                                    </div>
                                </Link>
                                <Link href="https://www.linkedin.com/in/mikael-sanches/" target="_blank">
                                    <div>
                                        <img style={{height: "27.42px", width: "24px"}} src="/img/linkedin-in-brands-solid.svg" alt="Linkedin icon" />
                                    </div>
                                </Link>
                            </div>
                            <img src="/img/cards/CardMikael.png" alt="foto do colaborador Mikael" className="photo" />
                            <i/>
                            <div className="textBlock">
                                <h1>Mikael Sanches</h1>
                                <p>1TDSPM - RM558887</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="social">
                                <Link href="https://github.com/Murilo-Capristo" target="_blank">
                                    <div>
                                        <img style={{height: "27.42px", width: "24px"}} src="/img/github-brands-solid.svg" alt="GitHub icon"/>
                                    </div>
                                </Link>
                                <Link href="https://instagram.com/capristin" target="_blank" >
                                    <div>
                                        <img style={{height: "27.42px", width: "24px"}} src="/img/instagram-brands-solid.svg" alt="Instagram icon" />
                                    </div>
                                </Link>
                                <Link href="https://www.linkedin.com/in/murilo-capristo-78809a306" target="_blank">
                                    <div>
                                        <img style={{height: "27.42px", width: "24px"}} src="/img/linkedin-in-brands-solid.svg" alt="Linkedin icon" />
                                    </div>
                                </Link>
                            </div>
                            <img src="/img/cards/CardMurilo.png" alt="foto do colaborador Murilo" className="photo" />
                            <div className="textBlock">
                                <h1>Murilo Capristo</h1>
                                <p>1TDSPM - RM556794</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="social">
                                <Link href="https://github.com/StaniukaitisPaula" target="_blank">
                                    <div>
                                        <img style={{height: "27.42px", width: "24px"}} src="/img/github-brands-solid.svg" alt="GitHub icon"/>
                                    </div>
                                </Link>
                                <Link href="https://instagram.com/p_blesaa" target="_blank" >
                                    <div>
                                        <img style={{height: "27.42px", width: "24px"}} src="/img/instagram-brands-solid.svg" alt="Instagram icon" />
                                    </div>
                                </Link>
                                <Link href="https://www.linkedin.com/in/paula-blesa-staniukaitis-5ab53224a/" target="_blank">
                                    <div>
                                        <img style={{height: "27.42px", width: "24px"}} src="/img/linkedin-in-brands-solid.svg" alt="Linkedin icon" />
                                    </div>
                                </Link>
                            </div>
                            <img src="/img/cards/CardPaula.png" alt="foto do colaborador Paula" className="photo" />
                            <div className="textBlock">
                                <h1>Paula Blesa</h1>
                                <p>1TDSPM - RM558277</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
