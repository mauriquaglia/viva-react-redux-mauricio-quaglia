import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';

import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {

        const { alert } = this.props;
        return (
            <div className="jumbotron">


                <div className="container text-center">
                        <Router history={history}>
                        <div className="row">
                            <div className="container bg-light">
                                <nav className="bg-primary navbar navbar-expand navbar-light text fixed-top" id="mainNav">
                                    <div className="container">
                                        <a className="navbar-brand" href="#page-top">Viva Quiz</a>
                                        <div className="collapse navbar-collapse" id="navbarResponsive">
                                            <ul className="navbar-nav ms-auto">
                                            <li className="nav-item text-white"><Link className="nav-link" to="/login">{localStorage.getItem('user') ? 'Logout' : 'Login'}</Link></li>
                                            {!localStorage.getItem('user') ?
                                            <li className="nav-item text-white"><Link className="nav-link" to="/register">Registro</Link></li>
                                            : ''}
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div className="h-40 d-inline-block" >
                        {alert.message && alert.type != "alert-success" &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        </div>
                        <div className="row">
                            <div className="container-fluid">
                            <Routes>
                                <Route  path="/" element={< PrivateRoute /> } />
                                <Route  path="/login" element={ < LoginPage /> } />
                                <Route  path="/register" element={ < RegisterPage /> } />
                                <Route  path="/*" element={< PrivateRoute />} />
                            </Routes>
                            </div>
                        </div>
                        <br/>
                        </Router>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };