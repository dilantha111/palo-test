import { render, screen } from '@testing-library/react';
import TrafficCamImg, { Props } from './TrafficCamImg';

describe('TrafficCamImg', () => {
    const mockProps: Props = {
        forecastItem: {
            screenShotUrl: 'https://example.com/image.png',
            locationName: 'LocationA',
            whetherForecast: 'Rainy'
        },
    };

    it('renders the image with the correct URL', () => {
        render(<TrafficCamImg {...mockProps} />);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', mockProps.forecastItem.screenShotUrl);
    });

    it('renders the correct heading', () => {
        render(<TrafficCamImg {...mockProps} />);
        const heading = screen.getByRole('heading', { level: 3 });
        expect(heading).toHaveTextContent('Traffic Cam Screenshot');
    });
});
