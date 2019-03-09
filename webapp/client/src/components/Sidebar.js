import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  showUsers() {
    return(
        <li>
            <Link to="/usuarios">
            <span className="icon">
                <img src="/assets/usuario-icon.png" alt="Usuarios" />
            </span>
            Usuarios
            </Link>
        </li>
    );
  }

  render() {
    return (
      <div className="side-menu">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="Logo" />
            </div>
            <div className="navigation">
                <ul>
                    <li>
                        <Link to="/dashboard">
                        <span className="icon">
                            <img src="/assets/inicio-icon.png" alt="Inicio" />
                        </span>
                        Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/estadisticas">
                        <span className="icon">
                            <img src="/assets/estadistica-icon.png" alt="Estadísticas" />
                        </span>
                        Estadísticas
                        </Link>
                    </li>
                    <li>
                        <Link to="/movimientos">
                        <span className="icon">
                            <img src="/assets/mov-icon.png" alt="Movimientos" />
                        </span>
                        Movimientos
                        </Link>
                    </li>
                    { this.props.auth.authenticaded.user_type == 'Admin' ? this.showUsers() : '' }
                    <li>
                        <Link to="/ajustes">
                        <span className="icon">
                            <img src="/assets/settings-icon.png" alt="Ajustes" />
                        </span>
                        Ajustes
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
  }
}

function mapStateToProps({ auth }) {
    console.log(auth);
    return { auth };
}

export default connect(mapStateToProps)(Sidebar);