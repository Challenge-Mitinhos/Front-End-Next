import React from 'react'

interface ChatMessageProps {
    text: React.ReactNode;
    isUserMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, isUserMessage }) => {
    return (
        <div className={`${isUserMessage?'text-right':'text-left'} mx-2 my-2`}>
            <div className={`inline-block p-2 rounded-lg text-base text-black max-w-[80%] break-words 
                ${isUserMessage?'bg-[#77ccfe]':'bg-white'}`}>
                {text}
            </div>
        </div>
    );
};

export default ChatMessage;