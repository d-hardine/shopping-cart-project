import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import { useOutletContext } from "react-router-dom"
import './ProductPage.css'

export default function ProductPage() {
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    const { productId} = useParams()

    const [cart, setCart, checkId, setCheckId, setCartNotification, grandTotal, setGrandTotal] = useOutletContext()

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
            console.log('product is already added to cart')
            const idCache = product.id

            setCart(cart.map(item => {
                if(item.id === idCache) {
                    return {...item, quantity: item.quantity + quantity}
                }
                else
                    return item
            }))
        }

        //cart notification and grand total handler
        if(cart.length === 0) {
            setCartNotification(prev => prev + quantity) //for cart notification
            setGrandTotal(prev => prev + (quantity * product.price)) //for grand total
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
            setGrandTotal(Number(prevGrandTotal + (quantity * product.price)))
        }

        setQuantity(1)
        e.target.reset()
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
                            <h1>{product.title}</h1>
                            <h2>${product.price}</h2>
                            <p>{product.description}</p>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="total-products"></label>
                                <button className="product-decrement-button" type="button" onClick={handleDecrement}>-</button>
                                <input type="tel" id="total-products" onKeyDown={handleNonNumericPrevention} min={1} value={quantity} onChange={handleChange}/>
                                <button className='product-increment-button' type="button" onClick={handleIncrement}>+</button>
                                <br /> <br />
                                <button className="product-submit-button" type="submit">Add to Cart</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}