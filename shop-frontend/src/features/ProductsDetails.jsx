// ProductDetails.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';

const ProductDetails = ({ match }) => {
    // Пример данных продукта (замените на реальные данные)
    const product = {
        id: match.params.id,
        name: 'Product 1',
        image: '/images/product1.jpg',
        price: 99.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id est ac eros eleifend semper.',
    };

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Price:</strong> ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description:</strong> {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>In Stock</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className="btn-block" type="button">
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ProductDetails;
