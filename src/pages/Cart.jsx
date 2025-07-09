import { useOutletContext } from "react-router-dom"
import './Cart.css'
import { CartCard } from "../components/CartCard"

export default function Cart() {
    const [cart] = useOutletContext()

    if(cart.length === 0) return (<div>Nothing added to cart.</div>)

    return (
        <main className="cart-page">
            <h1>Your Cart</h1>
            <div className="cart-items-container"> {
                cart &&
                    cart.map((item) => (
                        <CartCard item={item} key={item.id}/>
                ))
            }
            </div>
        </main>
    )
}