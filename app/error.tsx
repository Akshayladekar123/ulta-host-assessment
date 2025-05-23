'use client';
export default function Error({ error }: { error: Error }) {
  return <div className="text-red-600 py-10 text-center">Error: {error.message}</div>;
}