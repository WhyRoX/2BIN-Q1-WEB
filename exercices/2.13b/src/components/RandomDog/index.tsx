import { useState, useEffect } from 'react';

interface Dog {
    message: string;
    status: string;
}

const RandomDog = () => {
    const [dog, setDog] = useState<Dog | undefined>(undefined);
    
    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDog({
          message: data.message ?? "No dog found",
          status: data.status ?? "Error",
        });
      });
    }, []);
    
    return (
        <div>
            {dog ? <img src={dog.message} alt="A random dog" style={{ maxHeight: 300 }} /> : 'Loading...'}
        </div>
    );
};

export default RandomDog;
