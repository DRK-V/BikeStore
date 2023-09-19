import React, { useEffect, useState } from 'react';
import '../css/Actualizar_productos_admin.css';
import { useParams } from 'react-router-dom';

export const Actualizar_productos_admin = () => {
    const { id } = useParams();
    const [reloadPage, setReloadPage] = useState(null); // para controlar la carga de la página
    const [imagenes, setImagenes] = useState([]);
    const [producto, setProducto] = useState({
        id_producto: '',
        nombre_producto: '',
        tipo: '',
        color: '',
        precio: '',
        descripcion_producto: '',
        stock_disponible: '',
        // otros campos del producto
    });
    const [images, setImages] = useState([]); // Estado para almacenar las imágenes seleccionadas

    // controla para cargar la página
    useEffect(() => {
        if (reloadPage) {
            // Recargar la página
            alert('Recargando la página...'); // Reemplazar por la lógica de recarga real si es necesario
            // Establecer reloadPage de nuevo a false para evitar recargas continuas
            // setReloadPage(false);
        }
    }, [reloadPage]);

    const imageInputRef = React.createRef(); // Referencia al input de tipo file

    // Función para manejar cambios en el campo de formulario
    const handleInputChange = (event) => {
        // Actualizar el estado del producto con los nuevos valores
        setProducto({
            ...producto,
            [event.target.name]: event.target.value,
        });
    };
    // console.log(producto)
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
                console.log('Datos del producto obtenidos con éxito.'); // Reemplazar por lógica adecuada si es necesario
                setProducto(data); // Actualizar el estado del producto
                setImagenes(data);
            })
            .catch((error) => {
                console.error('Error al obtener los datos del producto:', error);
                alert('Error al obtener los datos del producto. Por favor, inténtalo de nuevo más tarde.');
            });
    }, [id]);

    useEffect(() => {
        // Función para obtener detalles del producto por ID
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3060/getProductDetails/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    // Establecer el estado del producto con los detalles obtenidos
                    setProducto(data);
                    console.log('Detalles del producto obtenidos con éxito.', producto); // Reemplazar por lógica adecuada si es necesario
                } else {
                    console.error('Error al obtener los detalles del producto');
                    alert('Error al obtener los detalles del producto. Por favor, inténtalo de nuevo más tarde.');
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
                alert('Error al realizar la solicitud. Por favor, inténtalo de nuevo más tarde.');
            }
        };

        // Llamar a la función para obtener los detalles del producto
        fetchProductDetails();
    }, [id]);

    const handleImageAfterClick = async (e) => {
        const idImagen = e.currentTarget.getAttribute('data-id');
        alert(`Eliminando la imagen con ID: ${idImagen}`);

        // Preguntar al usuario si realmente desea eliminar la imagen
        const confirmDelete = window.confirm('¿Desea eliminar esta imagen? Este cambio es irreversible.');

        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3060/deleteImage/${idImagen}`, {
                    method: 'POST',
                });

                if (response.ok) {
                    alert('Imagen eliminada con éxito');
                    // Aquí puedes agregar la lógica para actualizar el estado de tu aplicación si es necesario.
                } else if (response.status === 400) {
                    // Parsea el mensaje de error enviado por el servidor
                    const errorResponse = await response.json();
                    console.error('Error al eliminar la imagen', errorResponse.error);
                    alert(errorResponse.error);
                } else {
                    console.log('Error desconocido al eliminar la imagen');
                    alert('Error desconocido al eliminar la imagen. Por favor, inténtalo de nuevo más tarde.');
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
                alert('Error al realizar la solicitud. Por favor, inténtalo de nuevo más tarde.');
            }
        } else {
            // El usuario canceló la eliminación, no se hace nada.
            alert('Eliminación cancelada');
        }
    };

    const handleUpdateProduct = async (event) => {
        event.preventDefault(); // Evita la recarga de la página por defecto del formulario

        try {
            const formData = new FormData(); // Crea un objeto FormData para enviar los datos y las imágenes
            formData.append('productId', id);
            formData.append('producto', producto.nombre_producto); // Asegúrate de enviar el nombre del producto
            images.forEach((image) => {
                formData.append('images', image.file); // Agrega todas las imágenes al formulario
            });

            const response = await fetch('http://localhost:3060/updateImageProducts', {
                method: 'POST',
                body: formData, // Usa el objeto FormData para enviar los datos y las imágenes
            });

            if (response.ok) {
                alert('Producto actualizado con éxito');
                // Redirige al usuario a la página de gestión después de la actualización
            } else {
                // Maneja errores aquí
                console.error('Error al actualizar el producto');
                alert('Error al actualizar el producto. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            alert('Error al realizar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleSubir = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('nombre_producto', producto.nombre_producto);
            formData.append('tipo', producto.tipo);
            formData.append('color', producto.color);
            formData.append('precio', producto.precio);
            formData.append('descripcion_producto', producto.descripcion_producto);
            formData.append('stock_disponible', producto.stock_disponible);

            const response = await fetch(`http://localhost:3060/actualizar_producto/${id}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Producto actualizado con éxito');
            } else {
                console.error('Error al actualizar el producto');
                alert('Error al actualizar el producto. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            alert('Error al realizar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <>
            <div className='custom-container'>
                <div className='custom-image-section'>
                    {imagenes.map((imagen, index) => (
                        <div key={index} className='custom-image-container'>
                            <img
                                src={imagen.ruta_imagen}
                                alt={`Imagen ${index}`}
                                className='custom-img-product'
                            />
                            <div
                                className='custom-img-after'
                                data-id={imagen.id_imagen}
                                onClick={(e) => handleImageAfterClick(e)}
                            ></div>
                        </div>
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
                                    name='nombre_producto'
                                    placeholder='Nombre del producto'
                                    className='custom-p-2'
                                    type='text'
                                    value={producto.nombre_producto || ''} // Usar valor del estado o cadena vacía
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='custom-form-group'>
                                <input
                                    name='tipo'
                                    placeholder='Tipo de Bicicleta'
                                    className='custom-p-2'
                                    type='text'
                                    value={producto.tipo || ''}
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
                                    name='descripcion_producto'
                                    placeholder='Descripción'
                                    className='custom-p-3'
                                    type='text'
                                    value={producto ? producto.descripcion_producto : ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='custom-form-group'>
                                <input
                                    name='stock_disponible'
                                    placeholder='Stock disponible'
                                    className='custom-p-2'
                                    type='number'
                                    value={producto ? producto.stock_disponible : ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* Agrega aquí los demás campos del formulario */}
                        </div>
                        <div className='custom-boton-actualizar'>
                            <button type='button' className='custom-actualizar-p' onClick={() => {
                                handleUpdateProduct();
                                handleSubir();
                            }}>
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
