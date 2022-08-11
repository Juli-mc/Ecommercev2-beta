import React from 'react';
import {Spinner} from 'react-bootstrap'
import '../App.css'

const LoadingScreen = () => {
    return (
        
        <div>
            <Spinner animation="grow" variant="primary" />
        </div>
    );
};

export default LoadingScreen;