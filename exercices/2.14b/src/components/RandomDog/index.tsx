import { useState, useEffect } from 'react';

interface Dog {
  message: string;
  status: string;
}

const RandomDog = () => {
  const [dog, setDog] = useState<Dog | undefined>(undefined);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchDog();
    const intervalId = setInterval(() => {
      if (!isHovered) {
        fetchDog();
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [isHovered]);

  const fetchDog = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random")
      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const dogs = await response.json();
      setDog(dogs);

    } catch (err) {
      console.error("HomePage::error: ", err);
    }
  }

  return (
    <div>
      {dog ? <img src={dog.message} alt="A random dog" style={{ maxHeight: 300 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      /> : 'Loading...'}
    </div>
  );
};

export default RandomDog;
