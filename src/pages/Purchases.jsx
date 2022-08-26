import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../store/slices/products.slice';
import { Button, Card, Form, InputGroup, ListGroup, Row, Col } from 'react-bootstrap';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchases)
    useEffect(() => {
        dispatch(getPurchasesThunk())
        console.log(purchases)
    }, [])
    return (
        <div>
            <h1>Purchases</h1>
            {purchases.map(purchases=>(
                <Card border="primary" style={{ width: '18rem' }}>
                <Card.Header>{purchases.Title}</Card.Header>
                <Card.Body>
                    <Card.Title>{purchases.createdAt}</Card.Title>
                    {purchases.cart.products.map(product => (
                        <div>{product.title}
                        <br />
                        Quantity: {product.productsInCart.quantity}
                        </div>
                    ))}
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            ))}
            
        </div>
    );
};

export default Purchases;