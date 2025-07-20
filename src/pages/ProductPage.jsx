import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import { useOutletContext } from "react-router-dom"
import './ProductPage.css'
import AddedToCartPopup from "../components/AddedToCartPopup"

export default function ProductPage() {
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [showPopup, setShowPopup] = useState(false)

    const { productId } = useParams()

    const navigate = useNavigate()

    const [cart, setCart, checkId, setCheckId, setCartNotification, subTotal, setSubTotal] = useOutletContext()

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`, {mode: 'cors'})
            .then((response) => {
            if(response.status >= 400)
                throw new Error('Server Error')
            else
                return response.json()
            })
            .then((response) => setProduct(response))
            .finally(() => setLoading(false))
            .catch((error) => setError(error));
    }, [])

    //timeout popup for 1 sec
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [showPopup]);

    function handleNonNumericPrevention(e) {
        if(e.keyCode < 48 || e.keyCode > 57 && e.keyCode < 96 || e.keyCode > 105) {
            if (e.key !== "Backspace") e.preventDefault();
        }
    }

    function handleChange(e) {
        setQuantity(Number(e.target.value))
    }

    function handleDecrement() {
        setQuantity((prev) => Math.max(1, prev - 1))
    }

    function handleIncrement() {
        setQuantity((prev) => prev + 1)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(quantity !== 0) { //if the inputted quantity is not zero
            if(!checkId.includes(product.id)) { //added new products to cart
                const addedToCart = {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                }

                setCheckId([...checkId, product.id])

                setCart([
                    ...cart, addedToCart
                ])
            }
            else { //added existing products to cart
                const idCache = product.id

                setCart(cart.map(item => {
                    if(item.id === idCache) {
                        return {...item, quantity: item.quantity + quantity}
                    }
                    else
                        return item
                }))
            }
        }

        //cart notification and grand total handler
        if(cart.length === 0) {
            setCartNotification(prev => prev + quantity) //for cart notification
            setSubTotal(prev => prev + (quantity * product.price)) //for grand total
        }
        else {
            //for cart notification
            const prevCartNotification = cart.reduce(function(accumulator, item) {
                return accumulator + item.quantity
            }, 0)
            setCartNotification(prevCartNotification + quantity)

            //for grand total
            const prevGrandTotal = cart.reduce(function(accumulator, item) {
                return accumulator + (item.quantity * item.price)
            }, 0)
            setSubTotal(Number(prevGrandTotal + (quantity * product.price)))
        }

        setQuantity(1)

        //trigger popup if "add to cart" button is clicked
        if(e.target.id === 'buy-now')
            navigate('/cart')
        else
            setShowPopup(true)
    }

    if(loading) return <LoadingSpinner />
    if(error) return <p>A network error has encountered</p>

    return (
        <div className="product-page">
            {
                product && (
                    <div className="product-page-info-container">
                        <div className="product-info-left">
                            <img className="product-info-image" src={product.image} alt={"product-image"} />
                        </div>
                        <div className="product-info-right">
                            <div className="product-info-right-top">
                                <h1>{product.title}</h1>
                                <div>⭐ {product.rating.rate} &#40;{product.rating.count} sold&#41;</div>
                            </div>
                            <h2>${product.price.toFixed(2)}</h2>
                            <div className="product-info-right-middle">
                                <h3>Description</h3>
                                <p>{product.description}</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="product-quantity-control">
                                    <label htmlFor="total-products"></label>
                                    <button className="product-decrement-button" type="button" onClick={handleDecrement}>-</button>
                                    <input type="tel" id="total-products" onKeyDown={handleNonNumericPrevention} min={1} value={quantity} onChange={handleChange}/>
                                    <button className='product-increment-button' type="button" onClick={handleIncrement}>+</button>
                                </div>
                                <br /> <br />
                                <div className="product-button-container">
                                    <button className="product-submit-button" id="buy-now" type="button" onClick={handleSubmit}>Buy Now</button>
                                    <button className="product-submit-button" id="add-to-cart" type="submit">Add to Cart</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {showPopup && (<AddedToCartPopup />)}
        </div>
    )
}