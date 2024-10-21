import React, { FC, FormEvent, useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.length) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-6 w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-4 py-2 bg-gray-200 outline-0 rounded-full w-2/3 text-gray-900"
        placeholder="Search images..."
      />
    </form>
  );
};

export default SearchBar;
