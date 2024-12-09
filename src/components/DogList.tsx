import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Dog {
    id: number;
    name: string;
    breed: string;
    age: number;
}

const DogList: React.FC = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDogs = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You are not logged in. Please log in first.');
                return;
            }

            try {
                const response = await axios.get('https://dogs.kobernyk.com/api/v1/dogs', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data); 
                setDogs(response.data.dogs || response.data);
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    setError('Unauthorized. Please log in again.');
                } else {
                    setError('Failed to fetch dogs. Please try again.');
                }
            }
        };

        fetchDogs();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <Link to="/home">Back to home page</Link>
            <h2>Dog List</h2>
            {dogs.length > 0 ? (
                <ul>
                    {dogs.map((dog) => (
                        <li key={dog.id}>
                            {dog.name} - {dog.breed} (Age: {dog.age})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No dogs available.</p>
            )}
        </div>
    );
};

export default DogList;
