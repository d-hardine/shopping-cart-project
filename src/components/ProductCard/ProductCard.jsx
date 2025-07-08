import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom"
import './ProductCard.css'

export default function ProductCard({product}) {
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart, checkId, setCheckId, totalProducts, setTotalProducts] = useOutletContext()

    function handleNonNumericPrevention(e) {
        if(e.keyCode < 48 || e.keyCode > 57 && e.keyCode < 97) {
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

        //cart notification handler
        if(cart.length === 0) {
            setTotalProducts(prev => prev + quantity)
        }
        else {
            const prevTotalProducts = cart.reduce(function(accumulator, item) {
                return accumulator + item.quantity
            }, 0)
            setTotalProducts(prevTotalProducts + quantity)
        }

        setQuantity(1)
        e.target.reset()
    }

    return (
        <>
            <div className="product-card">
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} width={300} alt="product-image" />
                </Link>
                <div>{product.title}</div>
                <div>${product.price}</div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="total-products"></label>
                    <button type="button" onClick={handleDecrement}>-</button>
                    <input type="tel" id="total-products" onKeyDown={handleNonNumericPrevention} min={1} value={quantity} onChange={handleChange}/>
                    <button type="button" onClick={handleIncrement}>+</button>
                    <br />
                    <button type="submit">Add to Cart</button>
                </form>
                <button onClick={() => console.log(cart)}>console log</button>
            </div>
        </>
    )
}