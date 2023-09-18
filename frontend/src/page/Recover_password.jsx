import React, { useState, useEffect } from "react";
import '../css/Recover_password.css'
import { Link } from "react-router-dom";
import copiadoImg from '../assets/icons/copyed.png';
import copiarTextoImg from '../assets/icons/copia.png';

export const Recover_password = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [copiedText, setCopiedText] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(null);

    useEffect(() => {
        if (passwordChanged === true) {
            setCopiedText(newPassword);
        }
    }, [passwordChanged, newPassword]);

    const handleCopyPassword = () => {
        navigator.clipboard.writeText(newPassword)
            .then(() => {
                setIsCopied(true);
            })
            .catch((error) => {
                console.error("No se pudo copiar al portapapeles: ", error);
            });
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        fetch('http://localhost:3060/validatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, newPassword }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Contraseña cambiada exitosamente') {
                setPasswordChanged(true);
                setNewPassword(data.newPassword);
            } else {
                setPasswordChanged(false);
                console.error('Error al recuperar la contraseña');
            }
        })
        .catch(error => {
            console.error('Error al enviar la solicitud: ', error);
        });
    };

    return (
        <div className="main_container_recover_password">
            {passwordChanged === true && (
                <div className="password_changed mostrar">
                    <p>Tu contraseña ha sido cambiada</p>
                    <p>Cópiala e ingrésala</p>
                </div>
            )}
            {passwordChanged === false && (
                <div className="password_no_changed mostrar">
                    <p>Contraseña no cambiada</p>
                </div>
            )}
            <Link to="/Login" className="close_recover_password">X</Link>
            <div className="formContainer">
                <form className="form_recover_password">
                    <h1>Recuperar contraseña</h1>
                    <div className="section_form_recover">
                        <span className="icon email_icon"></span>
                        <input
                            type="text"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="section_form_recover">
                        <span className="icon password_icon"></span>
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={handleChangePassword}>Recuperar contraseña</button>
                </form>
                <div className="container_img">
                    <div className="img_form_recover"></div>
                    <div className={`container_clipboard ${passwordChanged === true ? 'mostrar' : 'no_mostrar'}`}>
                        <input
                            type="text"
                            value={copiedText}
                            onChange={(e) => setCopiedText(e.target.value)}
                            placeholder="Texto a copiar"
                            className={`${passwordChanged === true ? 'mostrar' : 'no_mostrar'}`}
                        />
                        <button
                            onClick={handleCopyPassword}
                            disabled={!newPassword || isCopied}
                            className={`${passwordChanged === true ? 'mostrar' : 'no_mostrar'}`}
                        >
                            {isCopied ? (
                                <img className="icon_clipboard" src={copiadoImg} alt="Copiado" />
                            ) : (
                                <img className="icon_clipboard" src={copiarTextoImg} alt="Copiar texto" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
