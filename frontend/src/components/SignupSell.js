import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignupSell() {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [region, setRegion] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        let response = await axios.post("http://localhost:5000/api/seller/", {
            "name": name,
            "email": mail,
            "region": region,
            "address": address,
            "password": password
        }).then(response => { 
            console.log(response)
            navigate('/');
        })
        .catch(error => {
            console.log(error.response)
        });
    };

    return (
        <>
            <Header/>
            <div className="form-entrar">
                <h2 className="title" id="titulo">
                    Cuéntanos de tu negocio
                </h2>
                <h3 className="subtitle" id="subtitulo">
                    ¡Regístrate para comenzar el intercambio de despuntes!
                </h3>
                <form className="login" onSubmit={ saveUser }>
                    <p>
                        <input
                            type="text"
                            className="formulario"
                            placeholder="Nombre completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)} required />
                    </p>
                    <p>
                        <input
                            type="text"
                            className="formulario"
                            placeholder="Correo electrónico"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)} required />
                    </p>
                    <p>
                        <input
                            type="text"
                            className="formulario"
                            placeholder="Región"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)} required />
                    </p>
                    <p>
                        <input
                            type="text"
                            className="formulario"
                            placeholder="Dirección"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} required />
                    </p>
                    <p>
                        <input type="password"
                            className="formulario"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                    </p>
                    <input id="submit-login" type="submit" value="Regístrate" />
                </form>
                <p className="error-msg">{error}</p>
            </div>
        </>
    );

}