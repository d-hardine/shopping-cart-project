import { useState, useEffect } from "react"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import { Link } from "react-router-dom"
import './Store.css'

export default function Store() {
    const [products, setProducts] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [initialTotal, setInitialTotal] = useState(1)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products', {mode: 'cors'})
            .then((response) => {
                if(response.status >= 400)
                    throw new Error('Server Error')
                else
                    return response.json()
            })
            .then((response) => setProducts(response))
            .finally(() => setLoading(false))
            .catch((error) => setError(error));
    }, [])

    function handleNonNumericPrevention(e) {
        if(e.keyCode < 48 || e.keyCode > 57) {
            if (e.key !== "Backspace") e.preventDefault();
        }
    }

    function handleChange(e) {
        setInitialTotal(Number(e.target.value))
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(initialTotal)
        setInitialTotal(1)
        e.target.reset()
    }

    if(loading) return <LoadingSpinner />
    if(error) return <p>A network error has encountered</p>

    return (
    <>
        <div className="items-container">
            {products && (
                products.map((item) => (
                    <div key={item.id} className="item-card">
                        <Link to={`/product/${item.id}`}>
                            <img src={item.image} width={300} alt="product-image" />
                        </Link>
                        <div>{item.title}</div>
                        <div>${item.price}</div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="total-items"></label>
                            <input type="number" id="total-items" onKeyDown={handleNonNumericPrevention} min={1} defaultValue={1} onChange={handleChange}/>
                            <br />
                            <button type="submit">Add to Cart</button>
                        </form>
                    </div>
                ))
            )}
        </div>
    </>
    )
}