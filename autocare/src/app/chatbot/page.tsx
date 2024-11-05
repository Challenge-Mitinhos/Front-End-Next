"use client";

import ChatMessage from '@/components/ChatMessage';
import Header from '@/components/Header'
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { ProtectedRoute } from '../protected';
import { toast } from 'react-toastify';

export default function chatbot() {
    const [messages, setMessages] = useState<string[]>(["AutoCare Bot: Olá, eu sou o AutoCare Bot! Como posso te ajudar?"]);
    const [isLoading, setIsLoading] = useState(false);
    const [dots, setDots] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
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

    const sendMessage = async (userInput: string) => {
        const message = userInput;

        setIsLoading(true);
        setDots(0);
        // Faz a requisição
        try {
            const response = await fetch('https://autocareia.azurewebsites.net/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mensagem: message }),
            });

            const data = await response.json();
            setMessages(prevMessages => [...prevMessages, `AutoCare Bot: ${data.resposta}`]);
            setIsLoading(false);
        } catch (error) {
            toast.error("Chatbot indisponível",  {theme: (isDarkMode?"dark":"light")})
            setTimeout(() => setIsLoading(false), 3000);
        }
    };

    const formatMessage = (text: string) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    const scrollToBottom = () => {
        const messagesContainer = messagesEndRef.current?.parentElement;
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isLoading) {
            interval = setInterval(() => {
                setDots(prevDots => (prevDots + 1) % 4);3
            }, 400);

        }
        
        return () => {
            clearInterval(interval);
        };
    }, [isLoading]);
    
    return (
        <ProtectedRoute>
        <>
            <Header primeiroLink='Início' segundoLink='Time' ultimoLink='Entrar' primeiroLinkDestino='/' segundoLinkDestino='/time' ultimoLinkDestino='/login'/> 
            <div className="chatpage">
                <div className="chatbot-box">
                    <div className='messages'>
                        {messages.map((msg, index) => (
                            <ChatMessage
                                key={index}
                                text={formatMessage(msg)}
                                isUserMessage={msg.startsWith('Você')}
                            />
                        ))}
                        {isLoading && <ChatMessage text={`AutoCare Bot: ${'.'.repeat(dots)}`} isUserMessage={false} />} {/* Exibe a animação */}
                        <div ref={messagesEndRef} />
                    </div>
                    <Formik
                        initialValues={{ inputMessage: '' }}
                        onSubmit={(values, { resetForm }) => {
                            setMessages(prevMessages => [...prevMessages, `Você: ${values.inputMessage}`]);
                            sendMessage(values.inputMessage);
                            resetForm();
                        }}
                    >
                        {({ handleSubmit, submitForm }) => (
                            <Form className="send-message" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                <Field
                                    name="inputMessage"
                                    placeholder="Digite sua mensagem"
                                    className="input-message"
                                />
                                <div className="button-send" onClick={submitForm}>
                                    <img src="/img/send-msg.svg" alt="Send Message Button" />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>   
        </>
        </ProtectedRoute>
  )
}
