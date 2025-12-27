import scream from '../assets/startup-page/scream.svg';
import pua from '../assets/startup-page/pua.png';
import magnolia from '../assets/startup-page/magnolia.png';
import './startup-page.css'

export default function StartupPage({onContinue}: {onContinue: () => void}) {
    return (
        <div className="startup-page">
            <h1>✨A Natural Scream✨</h1>
            <p>Hi honey :P</p>
            <img src={scream} alt="scream.svg" className="scream-image" />
            <img src={magnolia} alt="magnolia.png" className="magnolia-image" />
            <div className="bottom">
                <img src={pua} alt="pua.png" className="pua-image" />
                <div className="question">
                    Do you love me?
                    <button className="yes-button" onClick={onContinue}>yes</button>
                </div>
            </div>
        </div>
    );
}