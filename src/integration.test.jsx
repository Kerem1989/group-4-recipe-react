// integration.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom';

test('renders welcome message on home page', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    expect(screen.getByText(/välkomna/i)).toBeInTheDocument(); // Byt ut texten efter vad som visas
});
