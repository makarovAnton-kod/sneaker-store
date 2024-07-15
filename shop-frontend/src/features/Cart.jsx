// Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';

const Cart = () => {
    // Пример данных корзины (замените на реальные данные)
    const cartItems = [
        {
            id: 1,
            name: 'Product 1',
            image: '/images/product1.jpg',
            price: 99.99,
            quantity: 2,
        },
        {
            id: 2,
            name: 'Product 2',
            image: '/images/product2.jpg',
            price: 129.99,
            quantity: 1,
        },
    ];

    const removeFromCartHandler = (id) => {
        // Логика удаления товара из корзины
    };

    const checkoutHandler = () => {
        // Логика оформления заказа
    };

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div>
                        Your cart is empty <Link to="/">Go Back</Link>
                    </div>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={item.quantity}
                                            onChange={(e) => console.log(e.target.value)}
                                        >
                                            {[...Array(5).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() => removeFromCartHandler(item.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default Cart;
