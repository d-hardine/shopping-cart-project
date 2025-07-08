import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import { useOutletContext } from "react-router-dom"

export default function ProductPage() {
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    const { productId} = useParams()

    const [cart, setCart] = useOutletContext()

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

        const addedToCart = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        }

        setCart([
            ...cart, addedToCart
        ])

        setQuantity(1)
        e.target.reset()
    }

    if(loading) return <LoadingSpinner />
    if(error) return <p>A network error has encountered</p>

    return (
        product && (
            <>
                <img src={product.image} alt={"placeholder text"} width={400} />
                <h1>{product.title}</h1>
                <h2>${product.price}</h2>
                <p>{product.description}</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="total-products"></label>
                    <button type="button" onClick={handleDecrement}>-</button>
                    <input type="tel" id="total-products" onKeyDown={handleNonNumericPrevention} min={1} value={quantity} onChange={handleChange}/>
                    <button type="button" onClick={handleIncrement}>+</button>
                    <br />
                    <button type="submit">Add to Cart</button>
                </form>
                <button onClick={() => console.log(cart)}>console log cart</button>
            </>
        )
    )
}