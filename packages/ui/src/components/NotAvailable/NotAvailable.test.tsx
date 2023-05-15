import { render, screen } from '@testing-library/react';
import NotAvailable, { Props } from './NotAvailable';

describe('NotAvailable component', () => {
    it('should render the default error message when errorMsg prop is not provided', () => {
        render(<NotAvailable />);

        const errorMessage = screen.getByText(
            'No Weather forecast or Traffic cam is available. Please select a different date and time.'
        );

        expect(errorMessage).toBeInTheDocument();
    });

    it('should render the provided error message when errorMsg prop is provided', () => {
        const errorMsg: Props['errorMsg'] = 'Something went wrong';
        render(<NotAvailable errorMsg={errorMsg} />);

        const errorMessage = screen.getByText(errorMsg);

        expect(errorMessage).toBeInTheDocument();
    });
});
