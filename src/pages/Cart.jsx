import { useOutletContext } from "react-router-dom"
import './Cart.css'
import { CartCard } from "../components/CartCard"

export default function Cart() {
    const [cart, setCart, checkId, setCheckId, setCartNotification, grandTotal, setGrandTotal] = useOutletContext()

    if(cart.length === 0) return (<div>Nothing added to cart.</div>)

    return (
        <main className="cart-page">
            <h1 align="center">Your Cart</h1>
            <div className="cart-summary">
                <div className="cart-items-container"> {
                    cart &&
                        cart.map((item) => (
                            <CartCard item={item} key={item.id}/>
                    ))
                }
                </div>
                <div className="shopping-summary">
                    <h2 className="shopping-summary-title">
                        Shopping Summary
                    </h2>
                    <div className="shopping-summary-content">
                        <div className="cart-total-container">
                            <div>Total </div>
                            <div><b>${grandTotal.toFixed(2)}</b></div>
                        </div>
                        <button>BUY</button>
                    </div>
                </div>
            </div>
        </main>
    )
}