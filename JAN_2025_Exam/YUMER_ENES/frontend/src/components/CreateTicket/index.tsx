import { useState } from 'react';

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setResult('You must be logged in to create a ticket');
      return;
    }

    const response = await fetch('/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      const data = await response.json();
      setResult(
        `Ticket created successfully with:
        <ul>
          <li>ID: ${data.id}</li>
          <li>Title: ${data.title}</li>
          <li>Description: ${data.description}</li>
          <li>Creator: ${data.user}</li>
          <li>Created at: ${data.creationDate}</li>
        </ul>`
      );
    } else if (response.status === 409) {
      setResult('Another ticket exists with the same name');
    } else {
      setResult('Failed to create ticket');
    }
  };

  return (
    <div>
      <h1>Create Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit ticket</button>
      </form>
      {result && <div dangerouslySetInnerHTML={{ __html: result }} />}
    </div>
  );
};

export default CreateTicket;