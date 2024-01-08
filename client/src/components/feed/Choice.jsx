import React from 'react';
import './../../css/enter/enter.css'
import { useNavigate } from 'react-router-dom'
import bg from './../../img/guitar.jpg'
const Choice = () => {
    const navigate = useNavigate()
    const onChoose = (choose) => {
        navigate('/feed', { state: choose })
    }
    return (
        <div className="container-fluid">
            <div className="row" >
                <div className="image-container col-md-4 p-0 position-relative" onClick={() => onChoose('academic')}>
                    <img
                        src="https://www.collegemagazine.com/wp-content/uploads/2022/02/charl-folscher-BylGq6lh6fE-unsplash.jpg"
                        alt="Image 1"
                        className="image img-fluid"
                        style={{ height: '100vh', width: '100%',border:'solid', borderRight:'none', borderColor:'gray' }}
                    />
                    <div className="overlay position-absolute top-50 start-50 translate-middle text-white">
                        <h1>ACADEMIC</h1>
                    </div>
                </div>
                <div className="image-container col-md-4 p-0 position-relative" onClick={() => onChoose('non-academic')}>
                    <img
                        src="https://wallpapers-clan.com/wp-content/uploads/2023/04/soccer-player-background.jpg"
                        alt="Image 2"
                        className="image img-fluid"
                        style={{ height: '100vh', width: '100%',border:'solid',borderRight:'none', borderColor:'gray' }}
                    />
                    <div className="overlay position-absolute top-50 start-50 translate-middle text-white">
                        <h1>NON ACADEMIC</h1>
                    </div>
                </div>
                <div className="image-container col-md-4 p-0 position-relative" onClick={() => onChoose('co-curricular')}>
                    <img
                        src={bg} 
                        alt="Image 3"
                        className="image img-fluid"
                        style={{ height: '100vh', width: '100%',border:'solid', borderColor:'gray', backgroundColor:'black'  }}
                    />
                    <div className="overlay position-absolute top-50 start-50 translate-middle text-white">
                        <h1>CO-CURRICULAR</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Choice;
