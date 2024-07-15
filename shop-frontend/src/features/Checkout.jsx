// Checkout.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Checkout = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const submitHandler = (e) => {
        e.preventDefault();
        // Логика отправки данных оформленного заказа
    };

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
            </Form.Group>

            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                />
            </Form.Group>

            {/* Добавьте остальные поля формы (город, почтовый индекс, страна и т.д.) по необходимости */}

            <Button type="submit" variant="primary">
                Place Order
            </Button>
        </Form>
    );
}

export default Checkout;
