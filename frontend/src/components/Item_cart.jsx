import '../css/carrito_compras.css'

export const Item_cart = ({ item }) => {
  const [additionalProductDetails, setAdditionalProductDetails] = useState(null);
  useEffect(() => {
    const fetchAdditionalProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3060/products-with-images/${item.id}`);
        const data = await response.json();
        setAdditionalProductDetails(data);
      } catch (error) {
        console.error('Error fetching additional product details:', error);
      }
    };

    fetchAdditionalProductDetails();
  }, [item.id]);
  console.log('Item in Item_cart:', item); // Log the item data
  return (
    <div className="Cart_compras_carrito">
      <h2>{item.name}</h2>
      {/* Display the fetched product details */}
      {additionalProductDetails && (
        <div>
          {/* Display images, price, or any other relevant information */}
          <img src={additionalProductDetails.images[0].url} alt="Product" />
          <p>Price: ${additionalProductDetails.product.precio}</p>
          {/* ... */}
        </div>
      )}
      <div className='botones_compra'>
        {/* ... */}
      </div>
    </div>
  );
};