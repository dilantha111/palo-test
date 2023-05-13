import { render, screen } from '@testing-library/react';
import NotAvailable from './NotAvailable';

describe('NotAvailable', () => {
    it('renders the correct message', () => {
        render(<NotAvailable />);
        const message = screen.getByText(
            'No Weather forecast or Traffic cam is available. Please select a different date and time.'
        );
        expect(message).toBeInTheDocument();
    });
});
