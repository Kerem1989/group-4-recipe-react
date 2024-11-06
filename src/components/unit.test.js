import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from './Hero.jsx';
import Categories from './AsideCategories.jsx';
import '@testing-library/jest-dom';

test('renders search input', () => {
    const setSearchQuery = jest.fn();
    render(<Hero searchQuery="" setSearchQuery={setSearchQuery} />);
    const inputElement = screen.getByPlaceholderText(/Sök recept.../i);
    expect(inputElement).toBeInTheDocument();
});

test('renders categories', () => {
    const handleOptionClick = jest.fn();
    render(<Categories label="Kategorier" options={[]} selectedOptions={[]} handleOptionClick={handleOptionClick} />);
    const categoriesElement = screen.getByText(/Kategorier/i);
    expect(categoriesElement).toBeInTheDocument();
});
