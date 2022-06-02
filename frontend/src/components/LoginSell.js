import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginSell({ setToken }) {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const userValidation = async (e) => {
        e.preventDefault();
        const response = await axios.get('http://localhost:5000/api/seller/login', {
            "mail": mail,
            "password": password
        }, {
            headers: { "content-type": "application/json" }
        });
        if (response.status == 200) {
            setToken(response.data.accessToken); 
            navigate("/");
        } else {
            setError(response.data.error);  
        }
    };

    return (
        <>
            <Header/>
            <div className="form-entrar">
                <h2 className="title" id="titulo">
                    ¡Bienvenido de vuelta!
                </h2>
                <form className="login" onSubmit={ userValidation }>
                    <p>
                        <input
                            type="text"
                            className="formulario"
                            placeholder="Correo electrónico"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)} required />
                    </p>
                    <p>
                        <input type="password"
                            className="formulario"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                    </p>
                    <input id="submit-login" type="submit" value="Iniciar Sesión" />
                </form>
                <p className="error-msg">{error}</p>
            </div>
        </>
    );

}