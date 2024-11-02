"use client"
import HeaderComponent from "./HeaderComponent"
import { useContext, useState } from "react";
import classNames from 'classnames';
import Link from "next/link";
import { LoginContext } from "../context/LoginContext";
import Logo from "@/svg/Logo";
import MenuButton from "@/svg/MenuButton";
import CloseButton from "@/svg/CloseButton";

type HeaderProps = {
  primeiroLink?: string;
  primeiroLinkDestino?: string;
  segundoLink?: string;
  segundoLinkDestino?: string;
  terceiroLink?: string;
  terceiroLinkDestino?: string;
  ultimoLink?: string;
  ultimoLinkDestino?: string;
};

export default function Header({primeiroLink,primeiroLinkDestino,segundoLink,segundoLinkDestino,terceiroLink,terceiroLinkDestino,ultimoLink,ultimoLinkDestino}: HeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const context = useContext(LoginContext);

  if (!context) {
    throw new Error("LoginComponent LoginProvider");
  }

  const { login, toggleLogin } = context;

  return (
    <div className="header">
      <Link href="/">
        <Logo height="6vh" width="6vh" />
      </Link>
      <nav className="buttons">
        <ul className="flex items-center gap-14">
          {primeiroLink && (
            <li>
              <Link href={primeiroLinkDestino || ""}>
                <HeaderComponent name={primeiroLink} />
              </Link>
            </li>
          )}
          {segundoLink && (
            <li>
              <Link href={segundoLinkDestino || ""}>
                <HeaderComponent name={segundoLink} />
              </Link>
            </li>
          )}
          {terceiroLink && (
            <li>
              <Link href={terceiroLinkDestino || ""}>
                <HeaderComponent name={terceiroLink} />
              </Link>
            </li>
          )}
          {login === "deslogado" && (
            <li>
              <Link href={ultimoLinkDestino || ""}>
                <HeaderComponent name={ultimoLink} strong />
              </Link>
            </li>
          )}
          {login === "logado" && (
            <li>
              <HeaderComponent name="Sair" onClick={() => toggleLogin()} strong />
            </li>
          )}
        </ul>
      </nav>
      <div className="buttonsMobile">
        <HeaderComponent
          icon={<MenuButton height="4.5vh" width="4.5vh" color="var(--foreground)" />}
          onClick={() => setModalOpen(true)}
        />
        {modalOpen && (
          <div className={classNames(
                'fixed top-0 right-0 h-screen w-80 flex flex-col gap-6 p-6',
                {
                    'right-0 shadow-[0_0_20em_20vw_rgba(0,0,0,0.5)]': modalOpen,
                    '-right-full': !modalOpen
                },
                'menuMobile'
          )}>
            <div className={classNames(
              'flex justify-between items-center'
            )}>
              <h1 className="text-5xl font-bold">Menu</h1>
              <HeaderComponent
                icon={<CloseButton height="4.5vh" width="4.5vh" color="var(--foreground)" />}
                onClick={() => setModalOpen(false)}
              />
            </div>
            <ul className="list mt-4">
              {primeiroLink && (
                <li className="self-start">
                  <Link href={primeiroLinkDestino || ""}>
                    <HeaderComponent name={primeiroLink} fontSize="1.4em" />
                  </Link>
                </li>
              )}
              {segundoLink && (
                <li className="self-start">
                  <Link href={segundoLinkDestino || ""}>
                    <HeaderComponent name={segundoLink} fontSize="1.4em" />
                  </Link>
                </li>
              )}
              {login === "deslogado" && (
                <li className="self-start">
                  <Link href={ultimoLinkDestino || ""}>
                    <HeaderComponent name={ultimoLink} strong fontSize="1.7em" />
                  </Link>
                </li>
              )}
              {login === "logado" && (
                <li className="self-start">
                  <HeaderComponent name="Sair" onClick={() => toggleLogin()} strong fontSize="1.7em" />
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
