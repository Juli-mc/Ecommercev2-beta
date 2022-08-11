import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCategoryThunk, filterSearchThunk, getProductsThunk, setProducts } from '../store/slices/products.slice';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, InputGroup, ListGroup, Row, Col } from 'react-bootstrap';
import { LoadingScreen } from '../components';
import axios from 'axios';

const Home = () => {

    const isLoading = useSelector(state => state.isLoading)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products = useSelector(state => state.products)
    const [searchValue, setSearchValue] = useState("")
    const [categories, setCategories] = useState([])

    useEffect(() => {
        dispatch(getProductsThunk())
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
        .then(res=>setCategories(res.data.data.categories))
    }, [])

    console.log(categories)

    return (
        <div>
            <h1>Home</h1>
            <ListGroup as="ul">
                {categories.map(category=>(
                    <ListGroup.Item as="li" key={category.id} onClick={()=>dispatch(filterCategoryThunk(category.id))} active>
                        {category?.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={() => dispatch(filterSearchThunk(searchValue))} >
                    Search
                </Button>
            </InputGroup>
            {isLoading && <LoadingScreen />}
            <Row lg={3} xs={1} >
                {products.map(products => (
                    <Col>
                        <Card.Img  variant="top" src={products.productImgs} /><Card.Body>
                        <Card.Title>{products.Title}</Card.Title>
                        <Card.Text> <h3>Price</h3> <p>{products.price} $</p>
                        </Card.Text>
                        <Button variant="primary" onClick={() => navigate(`/product/${products.id}`)}>Add to cart</Button>
                    </Card.Body>
                    </Col>
                ))}
            </Row>
        </div>
    );
};




export default Home;