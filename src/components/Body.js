import './Body.css';
import './Screen.js';

function Body ({children}) {
    return (
        <div className='body'>
            {children}
        </div>
    )
}

export default Body;