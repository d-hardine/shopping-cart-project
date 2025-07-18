import { useOutletContext } from "react-router-dom"
import { Link } from "react-router-dom"
import './CartCard.css'

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
        if(e.keyCode < 48 || e.keyCode > 57 && e.keyCode < 96 || e.keyCode > 105) {
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
            <div className="cart-item">
                <div className="cart-item-left-info">
                    <Link to={`/product/${item.id}`}>
                        <img src={item.image} alt="item-image" className="cart-item-image" loading="lazy"/>
                    </Link>
                    <div className="cart-title-delete-container">
                        <p className="cart-item-title" title={item.title}>{item.title}</p>
                        <svg onClick={() => handleDelete(item)} className="cart-delete-button" width="800px" height="800px" viewBox="-2 0 24 24" id="meteor-icon-kit__regular-trash" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3 21C3 21.5523 3.44772 22 4 22H16C16.5523 22 17 21.5523 17 21V9H3V21zM15 3H17C18.6569 3 20 4.34315 20 6V8C20 8.55229 19.5523 9 19 9V21C19 22.6569 17.6569 24 16 24H4C2.34315 24 1 22.6569 1 21V9C0.44772 9 0 8.55229 0 8V6C0 4.34315 1.34315 3 3 3H5C5 1.34315 6.34315 0 8 0H12C13.6569 0 15 1.34315 15 3zM5 13C5 12.4477 5.44772 12 6 12C6.55228 12 7 12.4477 7 13V18C7 18.5523 6.55228 19 6 19C5.44772 19 5 18.5523 5 18V13zM9 13C9 12.4477 9.4477 12 10 12C10.5523 12 11 12.4477 11 13V18C11 18.5523 10.5523 19 10 19C9.4477 19 9 18.5523 9 18V13zM13 13C13 12.4477 13.4477 12 14 12C14.5523 12 15 12.4477 15 13V18C15 18.5523 14.5523 19 14 19C13.4477 19 13 18.5523 13 18V13zM8 2C7.44772 2 7 2.44772 7 3H13C13 2.44772 12.5523 2 12 2H8zM2 7H18V6C18 5.44772 17.5523 5 17 5H3C2.44772 5 2 5.44772 2 6V7z" fill="#758CA3"/>
                            <title>remove</title>
                        </svg>
                    </div>
                </div>
                <div className="cart-item-right-info">
                    <div style={{textAlign: 'right'}}><b>${item.price.toFixed(2)}</b></div>
                    <div className="quantity-control">
                        <button className="cart-decrement-button" onClick={handleDecrement}>-</button>
                        <input type="tel" id="total-products" onKeyDown={handleNonNumericPrevention} min={1} value={item.quantity} onChange={handleChange}/>
                        <button className="cart-increment-button" onClick={handleIncrement}>+</button>
                    </div>
                </div>
            </div>
        </>
    )
}