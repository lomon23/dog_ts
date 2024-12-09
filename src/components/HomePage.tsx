import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem('token', ''); 
        setIsLoggedIn(false);
        navigate('/login'); 
    };

    const addDogs = async () => {
        const dogData = {
            "name": "Buddy",
            "breed": "Golden Retriever",
            "age": 12,
            "color": "Golden",
            "image": "https://example.com/path/to/dog-image.jpg" 
        };

        try {
            const response = await fetch('https://dogs.kobernyk.com/api/v1/dogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(dogData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to add dog:', response.status, response.statusText, errorData);
                alert(`Failed to add dog: ${errorData.message || 'Unknown error'}`);
                return;
            }

            const data = await response.json();
            console.log('Dog added successfully:', data);
            alert('Dog added successfully!');
        } catch (error) {
            console.error('Error while adding dog:', error);
            alert('Error while adding dog. Please try again.');
        }
    };

    return (
        <>
            <div>
                <h1>Welcome to Dog Lovers App</h1>
                <Link to="/dogs">Link to dogs list</Link>
                <button onClick={addDogs}>Add dogs</button>
                {isLoggedIn ? (
                    <div>
                        <p>You are logged in! Enjoy browsing the app.</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <p>You need to log in to access this app.</p>
                        <Link to="/login">Login</Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default HomePage;
