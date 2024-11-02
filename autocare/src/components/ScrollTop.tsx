import React, { useEffect, useState } from 'react'
import { scrollTop } from "@/util/util";

export default function ScrollTop() {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
    if (window.scrollY >= 140) {
        setScrolled(true);
    } else {
        setScrolled(false);
    }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return(
        <>
            <button className={`arrowButton ${scrolled? 'visible' : ''}`} onClick={scrollTop}></button>
        </>
    )
}
