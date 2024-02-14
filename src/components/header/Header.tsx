'use client'
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
    const [menu, setMenu] = useState(false)
    const local = useLocation();
    const handleMenu = () => {
        console.log(menu)
        setMenu(!menu)
    }
    return (
        <header className="flex items-center p-4  gap-5 justify-between absolute w-full z-10">
            <NavLink to={'/'}>
                <p className="text-darkpurple rounded-lg bg-white items-center w-10 h-10 justify-center flex font-bold shadow-md">K♡</p>
            </NavLink>
            <div className={`flex ${menu ? 'flex' : ''} cursor-pointer md:hidden`}>
                <Menu onClick={() => handleMenu()} size={'32px'} />
            </div>
            <nav className={`${menu ? 'absolute top-4 right-4 bg-white' : 'hidden'} md:flex md:bg-none p-4 md:p-0 shadow-md md:shadow-none rounded-md justify-end`}>
                <X onClick={() => handleMenu()} className='md:hidden cursor-pointer text-right' />
                <div className='flex flex-col md:flex-row  '>
                    <NavLink to={'/about'} className={` uppercase font-bold ${local.pathname === '/about' ? 'text-lightpurple' : 'text-darkpurple  '} p-2`}>
                        Sobre mim
                    </NavLink>
                    <NavLink to={'/projects'} className={` uppercase font-bold ${local.pathname === '/projects' ? 'text-lightpurple' : 'text-darkpurple '} p-2`}>
                        Projetos

                    </NavLink>
                    <NavLink to={'/contact'} className={` uppercase font-bold ${local.pathname === '/contact' ? 'text-lightpurple' : 'text-darkpurple'} p-2`}>
                        Contato
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Header;