import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

export default function ProductPage() {

    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const { productId} = useParams()

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

    if(loading) return <LoadingSpinner />
    if(error) return <p>A network error has encountered</p>

    return (
    product && (
      <>
        <img src={product.image} alt={"placeholder text"} />
        <h1>{product.title}</h1>
        <h2>${product.price}</h2>
        <p>{product.description}</p>
      </>
    )
)
}