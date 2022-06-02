import React from "react";
import { Button } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';
import Headers from "./Header";

const Home = () => (
  <div>
        <Headers></Headers>
        <div class="hero-body">
            <div class="container has-text-centered">
                <div id="principal">
                    <div id="texto">
                    <h1 class="title" id="forestrade">
                        ¡Bienvenido a Forestrade!
                    </h1>
                    <h2 class="subtitle">
                        ForesTrade es la única red donde se pueden compartir los despuntes de madera con aquellos que más lo necesiten. 
                    </h2>
                    <h2 class="subtitle">
                        ¿Estás listo para comenzar?
                    </h2>
                    </div>
                    
                </div>
                <div id="principal">
                <h1 class="subtitle" id="titulo-publicaciones">
                    Mira las últimas publicaciones
                </h1>
                </div>
            </div>
        </div>

  </div>
);

export default Home;