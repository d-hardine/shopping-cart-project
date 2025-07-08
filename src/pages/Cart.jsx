import { useOutletContext } from "react-router-dom"

export default function Cart() {
    const [cart, setCart] = useOutletContext()

    return (
    <>
        <div className="cart-page"> {
            cart &&
            cart.map((item) => (
                <div key={item.id}>
                    <div>{item.title}</div>
                    <div>${item.price}</div>
                    <div>qty: {item.quantity}</div>
                </div>
            ))
        }
        </div>
    </>
    )
}