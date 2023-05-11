import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { ForeCastItem } from "../../types/ForeCastItem.type";
import React from "react";

export type Props = {
    forecastItems: ForeCastItem[],
    onClick: (forecastItem: ForeCastItem) => void
};

export default function ForecastList({ forecastItems, onClick }: Props) {
    const [selectedItem, setSelectedItem] = React.useState<ForeCastItem>();

    const handleListItemClick = (
        _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        forecastItem: ForeCastItem,
    ) => {
        setSelectedItem(forecastItem);
        onClick(forecastItem);
    };

    return <Box sx={{
        width: '100%', bgcolor: 'background.paper',
        maxHeight: '400px', overflow: 'scroll', borderColor: 'black', borderWidth: '1px'
    }}>
        <List component="nav" aria-label="main mailbox folders">
            {forecastItems.map(forecastItem => (
                <ListItemButton
                    key={forecastItem.locationName}
                    selected={selectedItem?.locationName === forecastItem.locationName}
                    onClick={(event) => handleListItemClick(event, forecastItem)}
                >
                    <ListItemText primary={forecastItem.locationName} />
                </ListItemButton>
            ))}
        </List>
    </Box>;
}