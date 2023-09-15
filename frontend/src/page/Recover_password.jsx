import { useState } from "react";
import '../css/Recover_password.css'
import { Link } from "react-router-dom"
export const Recover_password = () => {
    const [password, setPassword] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyPassword = () => {
        // Copiar el contenido del campo de contraseña al portapapeles
        navigator.clipboard.writeText(password)
            .then(() => {
                // Manejar el éxito de la copia al portapapeles
                setIsCopied(true);
            })
            .catch((error) => {
                console.error("No se pudo copiar al portapapeles: ", error);
            });
    };

    return (
        <>
            <div className="main_container_recover_password">
                <Link to="/Login" className="close_recover_password">X</Link>
                <div className="formContainer">
                    <form action="" className="form_recover_password">
                        <h1>Recuperar contraseña</h1>
                        <div className="section_form_recover">
                            <span className="icon email_icon"></span>
                            <input
                                type="text"
                                placeholder="Correo electrónico"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="section_form_recover">
                            <span className="icon password_icon"></span>
                            <input
                                type="password"
                                placeholder="Nueva contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button>Recuperar contraseña</button>
                    </form>
                    <div className="container_img">
                        <div className="img_form_recover"></div>
                        {/* Botón para copiar al portapapeles */}
                        <button
                            onClick={handleCopyPassword}
                            disabled={!password || isCopied}
                        >
                            {isCopied ? "¡Copiado!" : "Copiar contraseña"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
