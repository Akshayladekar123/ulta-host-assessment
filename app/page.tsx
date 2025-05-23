'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import debounce from 'lodash.debounce';

interface User {
  login: string;
  avatar_url: string;
  id: number;
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch('https://api.github.com/users');
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  const searchUsers = async (query: string) => {
    setLoading(true);
    const res = await fetch(`https://api.github.com/search/users?q=${query}`);
    const data = await res.json();
    setUsers(data.items);
    setLoading(false);
  };

  const handleSearch = useCallback(
    debounce((value: string) => {
      if (value) searchUsers(value);
      else fetchUsers();
    }, 300),
    []
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">GitHub Users Dashboard</h1>
      <input
        type="text"
        placeholder="Search users"
        className="mb-4 p-2 border rounded w-full"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {users?.map(user => (
          <Link href={`/users/${user.login}`} key={user.id} className="bg-white p-4 rounded shadow hover:shadow-lg">
            <img src={user.avatar_url} alt={user.login} className="rounded-full w-16 h-16 mx-auto" />
            <p className="text-center mt-2 font-medium">{user.login}</p>
          </Link>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
}