import { useOutletContext } from "react-router-dom"
import './Cart.css'

export default function Cart() {
    const [cart, setCart, checkId, setCheckId, totalProducts, setTotalProducts] = useOutletContext()

    if(cart.length === 0) return (<div>Nothing added to cart.</div>)
    return (
        <main className="cart-page">
            <h1>Your Cart</h1>
            <div className="cart-items-container"> {
                cart &&
                    cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-left-info">
                                <img src={item.image} alt="item-image" className="cart-item-image" />
                                <div className="cart-item-title">{item.title}</div>
                            </div>
                            <div className="cart-item-right-info">
                                <div><b>${item.price.toFixed(2)}</b></div>
                                <div>qty: {item.quantity}</div>
                            </div>
                        </div>
                ))
            }
            </div>
        </main>

    )
}