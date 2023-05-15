import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from "@testing-library/react";
import ForecastList, { Props } from "./ForecastList";
import { ForeCastItem } from "../../types/ForeCastItem.type";

describe("ForecastList component", () => {
    const mockOnClick = vi.fn();

    const forecastItems: ForeCastItem[] = [
        {
            locationName: "Location 1",
            screenShotUrl: "https://location1.com",
            whetherForecast: "Sunny",
        },
        {
            locationName: "Location 2",
            screenShotUrl: "https://location2.com",
            whetherForecast: "Rainy",
        },
    ];

    const defaultProps: Props = {
        forecastItems: forecastItems,
        onClick: mockOnClick,
    };

    it("should render correctly", () => {
        const { container } = render(<ForecastList {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("should select the clicked item and call onClick", () => {
        const { getByText } = render(<ForecastList {...defaultProps} />);
        const item2 = getByText("Location 2");

        fireEvent.click(item2);

        expect(item2.parentNode?.parentNode).toHaveClass("Mui-selected");
        expect(mockOnClick).toHaveBeenCalledWith(forecastItems[1]);
    });
});
