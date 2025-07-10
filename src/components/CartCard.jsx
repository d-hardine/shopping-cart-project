import { useOutletContext } from "react-router-dom"

export function CartCard({item}) {
    const [cart, setCart, checkId, setCheckId, setCartNotification, grandTotal, setGrandTotal] = useOutletContext()

    function handleChange(e) {
        const idCache = item.id
        setCart(cart.map(product => {
            if(product.id === idCache) {
                if(Number(e.target.value) !== 0) //prevents input field to become 0
                    return {...product, quantity: Number(e.target.value)}
                else
                    return {...product, quantity: 1}
            }
            else
                return product
        }))
        if(Number(e.target.value) > 1) { //prevents cart notification and grand total to going crazy
            setCartNotification(prev => prev - item.quantity + Number(e.target.value))
            setGrandTotal(prev => prev - (item.quantity * item.price) + (Number(e.target.value) * item.price))
        } else {
            setCartNotification(prev => prev - item.quantity + 1)
            setGrandTotal(prev => prev - (item.quantity * item.price) + item.price)
        }

    }

    function handleNonNumericPrevention(e) {
        if(e.keyCode < 48 || e.keyCode > 57 && e.keyCode < 97 || e.keyCode > 105) {
            if (e.key !== "Backspace") e.preventDefault();
        }
    }

    function handleDecrement() {
        if(item.quantity > 1) { //prevents the quantity to drops below 1
            const idCache = item.id
            setCart(cart.map(product => {
                if(product.id === idCache) {
                    return {...product, quantity: product.quantity - 1}
                }
                else
                    return product
            }))
            setCartNotification(prev => prev - 1)
            setGrandTotal(prev => prev - (1 * item.price))
        }

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
        setCartNotification(prev => prev + 1)
        setGrandTotal(prev => prev + (1 * item.price))
    }

    function handleDelete(itemToDelete) {
        setCart(cart.filter(item => item !== itemToDelete))
        setCheckId(checkId.filter(theId => theId !== itemToDelete.id))
        setCartNotification(prev => prev - itemToDelete.quantity)
        setGrandTotal(prev => prev - (itemToDelete.quantity * itemToDelete.price))
    }

    return (
        <>
            <div key={item.id} className="cart-item">
                <div className="cart-item-left-info">
                    <img src={item.image} alt="item-image" className="cart-item-image" />
                    <div className="cart-item-title">{item.title}</div>
                </div>
                <div className="cart-item-right-info">
                    <div><b>${item.price.toFixed(2)}</b></div>
                    <div className="quantity-control">
                        <button onClick={handleDecrement}>-</button>
                        <input type="tel" id="total-products" onKeyDown={handleNonNumericPrevention} min={1} value={item.quantity} onChange={handleChange}/>
                        <button onClick={handleIncrement}>+</button>
                        <button onClick={() => handleDelete(item)}>delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}