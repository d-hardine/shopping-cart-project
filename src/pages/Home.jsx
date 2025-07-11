import { Link } from 'react-router-dom'
import homepageImage from '../assets/homepage-image-resized.jpg'
import './Home.css'

export default function Home() {
    return (
        <main className='home-page'>
            <h1 className='welcome-header'>Welcome to our online store! We're so glad you're here.</h1>
            <img className='welcome-image' src={homepageImage} alt="homepage image"/>
            <div className="bottom-welcome-container">
                <h2>Discover Your Perfect Finds</h2>
                <p>Step into a world of endless possibilities, where quality meets convenience. Whether you're searching for the latest trends, everyday essentials, or unique gifts, we've carefully curated a collection that we know you'll love.</p>                
                <Link to="/store">
                    <button>Shop Now</button>
                </Link>
            </div>
        </main>
    )
}