import React, { useState } from 'react';
import logo from './../../assets/Frontend_Assets/logo.png';
import { navItems } from '../../constants';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импорт стилей Bootstrap

const Navbar = () => {
    const [mobileDrawOpen, setMobileDrawOpen] = useState(false);

    const toggleMobileDrawer = () => {
        setMobileDrawOpen(!mobileDrawOpen); // Изменение состояния для открытия/закрытия мобильного меню
    };

    return (
        <nav className="sticky-top navbar navbar-expand-lg navbar-light bg-light border-bottom border-secondary">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img src={logo} className="navbar-logo" alt="logo" />
                    <span className="ml-2 fs-5 fw-bold">SHOPPER</span>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMobileDrawer}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`collapse navbar-collapse ${
                        mobileDrawOpen ? 'show' : ''
                    }`}
                >
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        {navItems.map((item, index) => (
                            <li className="nav-item" key={index}>
                                <a className="nav-link text-uppercase fw-bold px-3" href={item.href}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="d-flex">
                        <a
                            className="btn btn-outline-primary me-2 rounded-pill px-4 py-2"
                            href="/login"
                        >
                            Войти
                        </a>
                        <a
                            className="btn btn-primary rounded-pill px-4 py-2"
                            href="/register"
                        >
                            Создать аккаунт
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
