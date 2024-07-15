// UserProfile.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const UserProfile = () => {
    // Здесь можно использовать хук useState для управления состоянием данных пользователя
    const [userData, setUserData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        address: '123 Main St, City, Country',
    });

    // Функция для обновления данных пользователя
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Функция для сохранения изменений (здесь можно добавить логику для отправки на сервер)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Логика сохранения изменений
        console.log('Saved changes:', userData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>User Profile</h2>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    readOnly // В реальном проекте удалите readOnly, если хотите редактировать email
                />
            </Form.Group>

            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Save Changes
            </Button>
        </Form>
    );
}

export default UserProfile;
