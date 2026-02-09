import React from 'react'

import "../ESTILOS COMPONENTES/Header.css"

const Header = () => {
  return (

        <div className='componente-header'> 

                <div className='componente-header-cont-imagen'><img src="/informacion.png" alt="info" /></div>
                <h1 className='componenete-header-cont-titulo'>WORDLE</h1>
                <div className='componenete-header-cont-usuario'></div>
        </div>

  )
}

export default Header