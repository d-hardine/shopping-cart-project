import './AddedToCartPopup.css'

export default function AddedToCartPopup() {
    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <svg fill="#000000" width="100px" height="100px" viewBox="0 0 24 24" id="check-mark-circle" xmlns="http://www.w3.org/2000/svg" className="icon line"><path id="primary" d="M12,21h0a9,9,0,0,1-9-9H3a9,9,0,0,1,9-9h0a9,9,0,0,1,9,9h0A9,9,0,0,1,12,21ZM8,11.5l3,3,5-5" style={{fill: 'none', stroke: 'rgb(0, 0, 0)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 1.5}}></path></svg>
                <div>Item added to cart</div>
            </div>
        </div>
    )
}