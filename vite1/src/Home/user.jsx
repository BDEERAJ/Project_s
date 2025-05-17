import './user.css'
import Navbar from './nav.jsx';

function User() {
    return (
        <>
            <Navbar/>
            <div className="main">
                <div className="info">
                    <h2>Deeraj</h2>
                    <h3>I'm a Web Developer</h3>
                    <p>I specialize in building and developing websites.</p>
                </div>
                <div className="image"></div>
            </div>
        </>
    );
}

export default User;
