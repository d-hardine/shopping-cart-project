import { useState, useEffect } from "react"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import { Link } from "react-router-dom"
import './Store.css'

export default function Store() {
    const [products, setProducts] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

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
                    </div>
                ))
            )}
        </div>
    </>
    )
}