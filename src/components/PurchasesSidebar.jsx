import React, { useEffect, useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk, goCheckoutThunk } from '../store/slices/cart.slice';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const PourchasesSidebar = ({ show, handleClose, handleShow, token }) => {

    const dispatch = useDispatch()
    const cartProducts = useSelector(state => state.cart)
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    const goCheckout = () =>{
        dispatch(goCheckoutThunk)
        navigate('/purchase')
    }

    return (
        <div>
            {
                token ?
                    (<Offcanvas show={show} onHide={handleClose} placement='end'>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <h2>Productos en tu carrito:</h2>
                            {cartProducts.map(cartProducts => (
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <p>{cartProducts.brand}</p>
                                        <Card.Title href="#" onClick={() => navigate(`/product/${cartProducts.id}`)}>{cartProducts.title}</Card.Title>
                                    </Card.Body>
                                    <Card.Body>
                                        <Card.Link><i class="fa-solid fa-cart-plus"></i></Card.Link>
                                        <Card.Link><i class="fa-solid fa-cart-arrow-down"></i></Card.Link>
                                        <br />
                                        {cartProducts.price * cartProducts.productsInCart.quantity} $ - x{cartProducts.productsInCart.quantity}
                                    </Card.Body>
                                </Card>
                            ))}
                              <Button onClick={()=>dispatch(goCheckoutThunk(navigate('/purchases')))} variant="primary" size="lg" active>
                                        Go to Checkout
                                    </Button>
                        </Offcanvas.Body>
                    </Offcanvas>) : (
                        <Offcanvas show={show} onHide={handleClose} placement='end'>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <h3>Primero, debes iniciar sesión para acceder a tu carrito de compras...</h3>
                                <br />
                                <img src="../src/img/cart-vector.png" style={{ opacity: '20%' }} alt="" srcset="" />
                            </Offcanvas.Body>
                        </Offcanvas>)
            }
        </div>
    );
};

export default PourchasesSidebar;