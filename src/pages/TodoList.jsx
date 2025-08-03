import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    api.get('/todos/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setTodos(res.data))
      .catch(() => alert('Failed to load todos'));
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        '/todos/',
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos([...todos, res.data]);
      setTitle('');
    } catch {
      alert('Failed to add todo');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Todos</h2>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="New todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.ID}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
