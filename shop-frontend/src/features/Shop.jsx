import React from 'react';
import {Link} from 'react-router-dom';
import { Row, Col, Image, Card, Button } from 'react-bootstrap';

const Shop = () => {
    const products = [
        { id: 1, name: 'Product 1', image: '/images/product1.jpg', price: 99.99 },
        { id: 2, name: 'Product 2', image: '/images/product2.jpg', price: 129.99 },
        { id: 3, name: 'Product 3', image: '/images/product3.jpg', price: 79.99 },
        // Добавьте больше продуктов по мере необходимости
    ];

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Card className="my-3 p-3 rounded">
                            <Link to={`/product/${product.id}`}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Link>
                            <Card.Body>
                                <Link to={`/product/${product.id}`}>
                                    <Card.Title as="div">
                                        <strong>{product.name}</strong>
                                    </Card.Title>
                                </Link>
                                <Card.Text as="h3">${product.price}</Card.Text>
                                <Button>Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Shop;