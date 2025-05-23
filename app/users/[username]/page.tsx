import { notFound } from 'next/navigation';

async function getUser(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function UserPage({ params }: { params: { username: string } }) {
  const user = await getUser(params.username);
  if (!user) return notFound();

  return (
    <div className="bg-white p-6 rounded shadow">
      <img src={user.avatar_url} alt={user.login} className="rounded-full w-24 h-24 mx-auto" />
      <h2 className="text-center text-2xl mt-4 font-bold">{user.name}</h2>
      <p className="text-center text-gray-600">@{user.login}</p>
      <div className="mt-4 space-y-2">
        {user.name && <p><strong>Name:</strong> {user.name}</p>}
        {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
        {user.location && <p><strong>Location:</strong> {user.location}</p>}
        {user.followers && <p><strong>Followers:</strong> {user.followers}</p>}
        {user.following && <p><strong>Following:</strong> {user.following}</p>}
      </div>
    </div>
  );
}