import React, { useState } from "react";
import './header.css';
import { Link } from 'react-router-dom';
import logo from "../img/logo.png";

function Header({ onSearch }) {
    const [inputValue, setInputValue] = useState('');

    const handleSearchClick = () => {
        onSearch(inputValue);
    };

    return (
        <header className="header-geral">
            <section className="wrapper-desktop d-flex justify-content-between align-items-center">
                <div className="d-flex flex-row gap-3 justify-content-center align-items-center">
                    <img src={logo} alt="logo da empresa"/>
                </div>
                <div className="cabecalho__pesquisar">
                    <input 
                        type="search" 
                        placeholder="Pesquisar" 
                        id="pesquisar" 
                        className="pesquisar__input" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button 
                        className="pesquisar__botao" 
                        onClick={handleSearchClick} // Executa a pesquisa ao clicar
                    >
                        Buscar
                    </button>
                </div>
                <div className="links-button">
                    <ul className="d-flex justify-content-between align-items-center gap-3">
                        <li>
                            <Link to="/products/create-product">
                                <button>Adicionar novo produto</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </header>
    );
}

export default Header;
