import { useState } from "react";
import { Link } from "react-router-dom"

export default function ProductCard({product}) {
    const [quantity, setQuantity] = useState(1)

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
        console.log(quantity)
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
            </div>
        </>
    )
}