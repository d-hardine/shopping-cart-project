import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom"
import './ProductCard.css'

export default function ProductCard({product, showPopup, setShowPopup}) {
    const [cart, setCart, checkId, setCheckId, setCartNotification, subTotal, setSubTotal] = useOutletContext()

    //timeout popup for 1 sec
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [showPopup]);

    function handleAddToCart() {

        if(!checkId.includes(product.id)) { //added new products to cart
            const addedToCart = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
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
                    return {...item, quantity: item.quantity + 1}
                }
                else
                    return item
            }))
        }

        //cart notification and grand total handler
        if(cart.length === 0) {
            setCartNotification(prev => prev + 1) //for cart notification
            setSubTotal(prev => prev + (1 * product.price)) //for grand total
        }
        else {
            //for cart notification
            const prevCartNotification = cart.reduce(function(accumulator, item) {
                return accumulator + item.quantity
            }, 0)
            setCartNotification(prevCartNotification + 1)

            //for grand total
            const prevGrandTotal = cart.reduce(function(accumulator, item) {
                return accumulator + (item.quantity * item.price)
            }, 0)
            setSubTotal(Number(prevGrandTotal + (1 * product.price)))
        }

        setShowPopup(true)
    }

    return (
        <>
            <div className="product-card">
                <Link to={`/product/${product.id}`}>
                    <img className="product-image" src={product.image} alt="product-image" loading="lazy" />
                </Link>
                <div className="product-title" title={product.title}>{product.title}</div>
                <div><b>${product.price.toFixed(2)}</b></div>
                <div>⭐ {product.rating.rate} | {product.rating.count} sold</div>
                <button className="product-card-add-button" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </>
    )
}