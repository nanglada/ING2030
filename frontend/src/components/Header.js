import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Headers() {
    return (
        <header>
            <div className='header-container'>
                <h3 className='headerTitle'>
                    <Link id='logo' to='/'>ForesTrade</Link>
                </h3>
                <ul>
                <li className="botones">
                    Iniciar sesión
                    <ul className="dropdown">
                        <li><Link id="opcion" to="/login-sell">Como vendedor</Link></li>
                        <li><Link id="opcion" to="/login-buy">Como comprador</Link></li>
                    </ul>
                </li>
                <li className="botones">
                    Regístrate
                    <ul className="dropdown">
                        <li><Link id="opcion" to="/signup-sell">Como vendedor</Link></li>
                        <li><Link id="opcion" to="/signup-buy">Como comprador</Link></li>
                    </ul>
                </li>
                </ul>
            </div>

        </header>
    );

}

