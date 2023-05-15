# Weather Forecast Backend

## prerequisite

- NodeJS latest ( v18.16.0)
- Backend up and running https://github.com/dilantha111/palo-test-backend

## How to run

- git clone https://github.com/dilantha111/palo-test-frontend.git
- cd /palo-test-frontend
- npm install
- npm run dev
- press 'o' in the terminal or access http://localhost:5173/ via browser

## Assumptions

- Users are interested in two hour weather forecast. This can be improved via adding an additional option to choose,
  whether it's 2 hour, 24 hour or 4 day
- When a user land on the page at the first time, they might be interested in the current date and time most of the time.

## Design Decisions

- Adopted a simple design with minimum color variations to keep it more simple.
- Chose Material UI as the component library, since it supports,
  - More advanced functions like theming.
  - It adopts flex-box which is a more modern approach to handle layouts.
  - Support style components for further enhancements
  - Have a flexible API to handle media queries
- Since it's a single page application, for the folder structure, chose a simple approach,
  - Having the App component for the main layout
  - Supporting components in a separate folder
  - Types in a separate folder
  - Apis in a separate folder
- For User Interaction, chose trigger actions against changes to the date and time field, instead adding a
  separate submit button, since it would be less user actions and more interactive.
  - Further enhancement on this would be to throttle calling the API, and cache responses in a selected duration to reduce the load on backend.
