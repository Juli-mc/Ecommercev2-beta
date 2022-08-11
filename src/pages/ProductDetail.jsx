import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { getProductsThunk } from '../store/slices/products.slice';
import { Button, Card, Form, InputGroup, ListGroup, Badge } from 'react-bootstrap';
import { addCartThunk } from '../store/slices/cart.slice';
const ProductDetail = () => {
    const allProducts = useSelector(state => state.products)
    const [detailProduct, setdetailProduct] = useState({})
    const [suggestedProducts, setSuggestedProducts] = useState([])
    const [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()
    const [counter, setCounter] = useState(0)
    const increment = () => {
        setCounter(counter + 1)
    }
    const decrement = () => {
        setCounter(counter - 1)
        if(counter === 0){
            setCounter(0)
        }
    }
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])


    useEffect(() => {
        const product = allProducts.find(newsItem => newsItem.id === Number(id))
        setdetailProduct(product)

        const filteredProduct = allProducts.filter(newsItem => newsItem.category.id === product.category.id)
        setSuggestedProducts(filteredProduct)
    }, [allProducts, id])

    const addToCart = (id) => {
        alert("Añadiste al carrito")
        const adding = {
            id: detailProduct?.id,
            quantity: counter
        }
        dispatch(addCartThunk(adding))
        console.log(adding)
    }

    return (
        <div>
            <h1>ProductDetail</h1>
            <div key={detailProduct?.id} className="card-details">
                <h2>{detailProduct?.title}</h2>
                <br />
                <img src={detailProduct?.productImgs} alt="" />
                <br />
                <p>{detailProduct?.description}</p>
                <br />
                <h3>Price: {detailProduct?.price}$</h3>
                <InputGroup className="mb-3">
                    <Button onClick={increment} id="button-addon1"><i class="fa-solid fa-square-plus"></i></Button>
                    <Badge pill bg="light" text="dark">
                        {counter}
                    </Badge>
                    <Button onClick={decrement} id="button-addon1"><i class="fa-solid fa-square-minus"></i></Button>
                    <Button onClick={()=>addToCart(detailProduct?.id)} id="button-addon1"><i class="fa-solid fa-cart-plus"></i></Button>
                </InputGroup>
                <br />
                
                {suggestedProducts.map(suggestedProduct => (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={suggestedProduct.productImgs} />
                        <Card.Body>
                            <Card.Title>{suggestedProduct.title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button onClick={() => navigate(`/product/${suggestedProduct.id}`)} variant="primary">Read More</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProductDetail;