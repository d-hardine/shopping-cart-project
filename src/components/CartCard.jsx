import { useOutletContext } from "react-router-dom"

export function CartCard({item}) {
    const [cart, setCart] = useOutletContext()

    function handleChange(e) {
        const idCache = item.id
        setCart(cart.map(product => {
            if(product.id === idCache) {
                return {...product, quantity: Number(e.target.value)}
            }
            else
                return product
        }))
    }

    function handleDecrement() {
        const idCache = item.id
        setCart(cart.map(product => {
            if(product.id === idCache) {
                return {...product, quantity: product.quantity - 1}
            }
            else
                return product
        }))
    }

    function handleIncrement() {
        const idCache = item.id
        setCart(cart.map(product => {
            if(product.id === idCache) {
                return {...product, quantity: product.quantity + 1}
            }
            else
                return product
        }))
    }

    return (
        <>
            <div key={item.id} className="cart-item">
                <div className="cart-item-left-info">
                    <img src={item.image} alt="item-image" className="cart-item-image" />
                    <div className="cart-item-title">{item.title}</div>
                </div>
                <div className="cart-item-right-info">
                    <div><b>${(item.price * item.quantity).toFixed(2)}</b></div>
                    <div className="quantity-control">
                        <button onClick={handleDecrement}>-</button>
                            <input type="tel" id="total-products" min={1} value={item.quantity} onChange={handleChange}/>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                </div>
            </div>
        </>
    )
}