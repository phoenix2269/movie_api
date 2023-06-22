import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const ProfileView = ({ user, token, movies, onLoggedOut, updateUser }) => {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("");
    // const [birthday, setBirthday] = useState("");

    const [username, setUsername] = useState(user.Username ? user.Username : null);
    const [password, setPassword] = useState(user.Password ? user.Password : null);
    const [email, setEmail] = useState(user.Email ? user.Email : null);
    const [birthday, setBirthday] = useState(user.Birthday ? user.Birthday.substring(0, 10) : null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        // Update/Edit Account
        fetch(`https://movie-api-cf.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then ((response) => {
            if (response.ok) {
                alert("Update successful!");
                updateUser(user);
            } else {
                alert("Update failed!");
            }
        });
    };

    const deleteAccount = () => {
        fetch(`https://movie-api-cf.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then ((response) => {
            if (response.ok) {
                alert("Account Deleted!");
               onLoggedOut();
            } else {
                alert("Account delete failed!");
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>
                <Button variant="primary" type="submit">Update</Button>
                {/* <Link to={`/signup`}> */}
                    <Button variant="danger" onClick={() => {
                        if (confirm("Are you sure you want to delete your account?")) {
                            deleteAccount();
                        }
                    }}>Delete Account</Button>
                {/* </Link> */}
            {/* <Button variant="primary" type="submit"> Submit</Button> */}
        </Form>
    );
};