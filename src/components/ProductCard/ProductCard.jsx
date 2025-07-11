import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom"
import './ProductCard.css'

export default function ProductCard({product}) {
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart, checkId, setCheckId, setCartNotification, grandTotal, setGrandTotal] = useOutletContext()

    function handleNonNumericPrevention(e) {
        if(e.keyCode < 48 || e.keyCode > 57 && e.keyCode < 96) {
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

    return (
        <>
            <div className="product-card">
                <Link to={`/product/${product.id}`}>
                    <img className="product-image" src={product.image} alt="product-image" loading="lazy" />
                </Link>
                <div className="product-title" title={product.title}>{product.title}</div>
                <div><b>${product.price.toFixed(2)}</b></div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="total-products"></label>
                    <button type="button" onClick={handleDecrement}>-</button>
                    <input type="tel" id="total-products" onKeyDown={handleNonNumericPrevention} min={1} value={quantity} onChange={handleChange}/>
                    <button type="button" onClick={handleIncrement}>+</button>
                    <br />
                    <button type="submit">Add to Cart</button>
                </form>
            </div>
        </>
    )
}