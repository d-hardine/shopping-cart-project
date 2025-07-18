import { useOutletContext, Link } from "react-router-dom"
import './Cart.css'
import { CartCard } from "../components/CartCard"

export default function Cart() {
    const [cart, setCart, checkId, setCheckId, setCartNotification, subTotal, setSubTotal] = useOutletContext()

    if(cart.length === 0) return (
        <div className="cart-empty-page">
            <div className="cart-empty-message">Nothing added to cart.</div>
            <Link to="/store">
                <button className="cart-empty-button">Shop Now</button>
            </Link>
        </div>
    )

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
                            <div>Subtotal </div>
                            <div className="cart-summary-numbers">${subTotal.toFixed(2)}</div>
                            <div>Shipping</div>
                            <div className="cart-summary-numbers">$14.99</div>
                            <div>Taxes</div>
                            <div className="cart-summary-numbers">${(subTotal * 0.075).toFixed(2)}</div>
                            <div><b>Total</b></div>
                            <div className="cart-summary-numbers"><b>${((subTotal * 0.075) + 14.99 + subTotal).toFixed(2)}</b></div>
                        </div>
                        <br />  
                        <button className="cart-buy-button">CHECKOUT</button>
                    </div>
                </div>
            </div>
        </main>
    )
}