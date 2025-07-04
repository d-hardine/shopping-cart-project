import { useState } from "react"
import { Link } from "react-router-dom"

export default function About() {
    const [count, setCount] = useState(0)

    function handleClick() {
        setCount(count + 1)
    }

    return (
        <>
            <p>Why Shop With Us?</p>
            <ul>
                <li>Wide Selection: Explore a diverse range of products across various categories.</li>
                <li>Quality You Can Trust: We partner with reputable brands and suppliers to ensure every item meets our high standards.</li>
                <li>Hassle-Free Shopping: Enjoy a smooth and secure checkout process, with reliable delivery right to your doorstep.</li>
                <li>Customer Satisfaction: Our dedicated support team is always ready to assist you.</li>
                <li>Wide Selection: Explore a diverse range of products across various categories.</li>
                <li>Wide Selection: Explore a diverse range of products across various categories.</li>
            </ul>
            <p>Start Exploring Now!</p>
            <p>Ready to find something amazing? Dive in and discover your new favorites. Happy shopping!</p>
            <Link to="/about/aboutchild">To The Child Component</Link>
            <div>count: {count}</div>
            <button onClick={handleClick}>increment count above</button>
        </>
    )
}