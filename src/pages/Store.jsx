import { useState, useEffect } from "react"
import LoadingSpinner from "../components/LoadingSpinner"
import ProductCard from "../components/ProductCard"
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
    <main className="store-page">
        <h1 align="center">The Products</h1>
        <div className="products-container">
            {products && (
                products.map((product) => (
                    <ProductCard product={product} key={product.id}/>
                ))
            )}
        </div>
    </main>
   )
}