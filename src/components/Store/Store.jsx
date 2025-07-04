import { useState, useEffect } from "react"
import './Store.css'

export default function Store() {
    const[items, setItems] = useState(null)

    useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then((response) => response.json())
        .then((response) => setItems(response))
        .catch((error) => console.error(error));
    }, [])

    return (
    <>
        <div>This is the Store Page.</div>
        <button onClick={() => console.log(items[0].title)}>console log</button>
        <div className="items-container">
            {items && (
                items.map((item) => (
                    <div key={item.id} className="item-card">
                        <div>item title: {item.title}</div>
                        <div>item price: {item.price}</div>
                    </div>
                ))
            )}
        </div>
    </>
    )
}