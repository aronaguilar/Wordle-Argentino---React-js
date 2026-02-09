import React, { useState, useEffect } from 'react';
import "../ESTILOS PAGINAS/Home.css";
import Header from '../COMPONENTES/Header';
import ContLetra from '../COMPONENTES/ContLetra';

const FILAS_TECLADO = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Borrar"]
];

const Home = () => {
  const palabrasArgentas = ["LABURAR", "CHAMUYAR", "POSTA", "BONDI", "MORFAR", "PIBE", "COPADO", "TRUCHO", "BIRRA", "QUILOMBO", "BOLUDO", "TOMATELA", "ORTIVA","SALAME", "MOROCHO", "PICANTE", "MATE", "CHORIPAN", "ASADO","FACHA", "BOLICHE", "PELOTUDO", "PUCHERO", "MATEADA", "GUARANGO", "CHAPAR", "CHIMICHURRI", "YERBA", "COLIMBA", "PATOVA", "PELUDO", "MERCA", "CHETO", "PREVIA", "MILANGA", "PANCHO", "BAGAYO", "PAVADA", "ROCHO", "TIMBA", "VIOLIN", "CHARANGO", "GORRUDO", "CORNUDO", "VIGILANTE"];
  
  const [palabraObjetivo, setPalabraObjetivo] = useState([]);
  const [intentos, setIntentos] = useState([]); 
  const [actual, setActual] = useState(""); 
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const iniciarJuego = () => {

    const elegida = palabrasArgentas[Math.floor(Math.random() * palabrasArgentas.length)].toUpperCase();
    setPalabraObjetivo([...elegida]);
    setIntentos([]);
    setActual("");
    setJuegoTerminado(false);
    setMensaje("");

  };

  useEffect(() => { iniciarJuego(); }, []);

  const obtenerEstadosTeclas = () => {

      const mapaEstados = {};

      intentos.forEach((intento) => {

        [...intento].forEach((letra, i) => {

            if (letra === palabraObjetivo[i]) mapaEstados[letra] = "verde";

            else if (palabraObjetivo.includes(letra)) {

                if (mapaEstados[letra] !== "verde") mapaEstados[letra] = "amarillo";
            } 
            else {
              
                if (!mapaEstados[letra]) mapaEstados[letra] = "gris-oscuro";
            }
        });
      });
      
      return mapaEstados;
  };

  const procesarEntrada = (tecla) => {

    if (juegoTerminado) return;
    if (tecla === "BACKSPACE" || tecla === "BORRAR") setActual(prev => prev.slice(0, -1));

    else if (tecla === "ENTER") {

        if (actual.length === palabraObjetivo.length) {

            const nuevosIntentos = [...intentos, actual];
            setIntentos(nuevosIntentos);

            if (actual === palabraObjetivo.join("")) {
                setMensaje("¡SOS UN GENIO! 🎉");
                setJuegoTerminado(true);
            }
            else if (nuevosIntentos.length === 6) {
                setMensaje(`¡Qué bajón! La palabra era: ${palabraObjetivo.join("")}`);
                setJuegoTerminado(true);
            }
            setActual(""); 
        }
    } 

    else if (/^[A-ZÑ]$/.test(tecla) && actual.length < palabraObjetivo.length) setActual(prev => prev + tecla);
  };

  useEffect(() => {
    
    const manejarTeclado = (e) => procesarEntrada(e.key.toUpperCase());

    window.addEventListener("keydown", manejarTeclado);

    return () => window.removeEventListener("keydown", manejarTeclado);

  }, [actual, palabraObjetivo, juegoTerminado, intentos]);

  return (
    <div className='cont-pagina-home'>

        <Header />

      <section className='home-seccion'>

          <div className='home-cont-cuadrilla'>

              {[0, 1, 2, 3, 4, 5].map((filaIndex) => {

                const palabraFila = filaIndex < intentos.length ? intentos[filaIndex] : (filaIndex === intentos.length ? actual : "");
                const esConfirmada = filaIndex < intentos.length;

                    return (

                        <div key={filaIndex} className='home-fila'>

                              {palabraObjetivo.map((letraOriginal, i) => {

                                  const letraChar = palabraFila[i] || "";
                                  let estado = "";

                                  if (esConfirmada) {

                                      if (letraChar === letraOriginal) estado = "verde";

                                      else if (palabraObjetivo.includes(letraChar)) {
                                        
                                          const aparicionesTotales = palabraObjetivo.filter(l => l === letraChar).length;
                                          const verdesEnIntento = [...palabraFila].filter((l, idx) => l === letraChar && palabraObjetivo[idx] === letraChar).length;
                                          const amarillasPrevias = [...palabraFila].slice(0, i).filter((l, idx) => l === letraChar && palabraObjetivo[idx] !== letraChar && palabraObjetivo.includes(l)).length;
                                          estado = amarillasPrevias < (aparicionesTotales - verdesEnIntento) ? "amarillo" : "gris";
                                      } 
                                      else estado = "gris";

                                  }
                                  return <ContLetra key={i} letra={letraChar} estado={estado} />;
                              })}

                        </div>

                    );

              })}

          </div>

          <div className='home-teclado'>

              {FILAS_TECLADO.map((fila, i) => (

                  <div key={i} className='teclado-fila'>

                      {fila.map((tecla) => (

                          <button 
                            key={tecla} 
                            className={`tecla ${tecla.length > 1 ? 'tecla-especial' : ''} ${obtenerEstadosTeclas()[tecla.toUpperCase()] || ""}`}
                            onClick={() => procesarEntrada(tecla.toUpperCase())}
                          >
                            {tecla}
                          </button>
                      ))}

                  </div>

              ))}

          </div>

          {mensaje && juegoTerminado && 
              
              <div className='home-footer-juego'>

                  <div className="home-mensaje">{mensaje}</div>
                  <button className="btn-reinicio" onClick={iniciarJuego}>Jugar de nuevo</button>

              </div>
          }

      </section>
    </div>
  );
};

export default Home;;