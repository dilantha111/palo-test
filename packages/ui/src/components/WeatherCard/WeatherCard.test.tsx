import { render, screen } from '@testing-library/react';
import WeatherCard, { Props } from './WeatherCard';

describe('WeatherCard', () => {
    const mockProps: Props = {
        forecastItem: {
            locationName: 'New York',
            whetherForecast: 'Sunny',
            screenShotUrl: 'https://image.jpeg'
        },
    };

    it('renders the correct location name', () => {
        render(<WeatherCard {...mockProps} />);
        const locationName = screen.getByRole('heading', { level: 3 });
        expect(locationName).toHaveTextContent(`Weather in ${mockProps.forecastItem.locationName}`);
    });

    it('renders the correct weather forecast', () => {
        render(<WeatherCard {...mockProps} />);
        const weatherForecast = screen.getByText(mockProps.forecastItem.whetherForecast);
        expect(weatherForecast).toBeInTheDocument();
    });
});
