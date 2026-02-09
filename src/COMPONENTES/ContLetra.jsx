import React from 'react'
import "../ESTILOS COMPONENTES/ContLetra.css"

const ContLetra = ({ letra, estado }) => {
  return (
    <div className={`componente-cont-letra ${estado}`}>
      {letra}
    </div>
  )
}

export default ContLetra