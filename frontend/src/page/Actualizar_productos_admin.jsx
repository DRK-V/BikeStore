import React, { useEffect, useState } from 'react';
import '../css/Actualizar_productos_admin.css';
import { useParams } from 'react-router-dom';

export const Actualizar_productos_admin = () => {
    const { id } = useParams();
    const [imagenes, setImagenes] = useState([]);
    const [producto, setProducto] = useState({
        nombre: '',
        tipo: '',
        color: '',
        precio: '',
        descripcion: '',
        stock: '',
        // otros campos del producto
    });

    const [images, setImages] = useState([]); // Estado para almacenar las imágenes seleccionadas

    const imageInputRef = React.createRef(); // Referencia al input de tipo file

    // Función para manejar cambios en el campo de formulario
    const handleInputChange = (event) => {
        // Actualizar el estado del producto con los nuevos valores
        setProducto({
            ...producto,
            [event.target.name]: event.target.value,
        });
    };

    // Función para manejar la carga de imágenes
    const handleImageUpload = (event) => {
        const newImages = [...images];
        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            const reader = new FileReader();

            reader.onload = (e) => {
                newImages.push({
                    dataURL: e.target.result,
                    file: file,
                });
                setImages(newImages);
            };

            reader.readAsDataURL(file);
        }
    };

    // Función para eliminar una imagen
    const handleImageDelete = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    useEffect(() => {
        fetch(`http://localhost:3060/getImagesUpdateProduct/${id}`, {
            method: 'POST', // Indica que es una solicitud POST
            // Otros parámetros de la solicitud, como headers o body, si es necesario
        })
            .then((response) => response.json())
            .then((data) => {
                // Manejar los datos JSON devueltos por el servidor
                console.log(data);
                setProducto(data); // Actualizar el estado del producto
                setImagenes(data);
            })
            .catch((error) => {
                console.error('Error al obtener los datos del producto:', error);
            });
    }, [id]);

    return (
        <>
            <div className='custom-container'>
                <div className='custom-image-section'>
                    {imagenes.map((imagen, index) => (
                        <img
                            key={index}
                            src={imagen.ruta_imagen}
                            alt={`Imagen ${index}`}
                            className='custom-img-product'
                        />
                    ))}
                    {images.map((image, index) => (
                        <div key={index} className='custom-image-preview-container'>
                            <img
                                src={image.dataURL}
                                alt={`Imagen ${index}`}
                                className='custom-image-preview'
                            />
                            <button
                                onClick={() => handleImageDelete(index)}
                                className='custom-delete-button'
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <input
                        type='file'
                        accept='image/*'
                        multiple
                        ref={imageInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                    <button
                        onClick={() => imageInputRef.current && imageInputRef.current.click()}
                    >
                        Seleccionar Imágenes
                    </button>
                </div>
                <div className='custom-form-section'>
                    <form action='' className='custom-product-form'>
                        <div className='custom-titulo-p'>
                            <h2>Actualizar</h2>
                        </div>
                        <div className='custom-formu-p'>
                            <div className='custom-form-group'>
                                <input
                                    name='nombre'
                                    placeholder='Nombre del producto'
                                    className='custom-p-2'
                                    type='text'
                                    value={producto ? producto.nombre : ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='custom-form-group'>
                                <input
                                    name='tipo'
                                    placeholder='Tipo de Bicicleta'
                                    className='custom-p-2'
                                    type='text'
                                    value={producto ? producto.tipo : ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='custom-form-group'>
                                <input
                                    name='color'
                                    placeholder='Color'
                                    className='custom-p-2'
                                    type='text'
                                    value={producto ? producto.color : ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='custom-form-group'>
                                <input
                                    name='precio'
                                    placeholder='Precio'
                                    className='custom-p-2'
                                    type='text'
                                    value={producto ? producto.precio : ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='custom-form-group'>
                                <input
                                    name='descripcion'
                                    placeholder='Descripción'
                                    className='custom-p-3'
                                    type='text'
                                    value={producto ? producto.descripcion : ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='custom-form-group'>
                                <input
                                    name='stock'
                                    placeholder='Stock disponible'
                                    className='custom-p-2'
                                    type='text'
                                    value={producto ? producto.stock : ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* Agrega aquí los demás campos del formulario */}
                        </div>
                        <div className='custom-boton-actualizar'>
                            <button className='custom-actualizar-p'>Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
    