# Astronomy Dashboard V2

## Description
This is a modern Astronomy Dashboard built with Next.js, designed to provide users with various astronomical data and features, including the Astronomy Picture of the Day (APOD), International Space Station (ISS) location, Moon phase, Near-Earth Objects (NEOs) data, Mars Rover photos, and NASA image/video search.

## Features
*   **Astronomy Picture of the Day (APOD):** Displays NASA's Astronomy Picture of the Day with details and options to add to favorites or share.
*   **International Space Station (ISS) Location:** Shows the current latitude and longitude of the ISS, updated every 5 seconds.
*   **Moon Phase:** Calculates and displays the current phase of the Moon.
*   **User Location:** Automatically detects and displays the user's current latitude and longitude (with an option for manual input).
*   **Celestial Events:** Fetches and displays celestial events from the last 30 days.
*   **Near Earth Objects (NEOs):** Provides data on potentially hazardous Near-Earth Objects from the last 7 days.
*   **Mars Rover Photos:** Displays the latest photos from NASA's Mars Rovers with navigation.
*   **Earth Polychromatic Imaging Camera (EPIC) Images:** Shows daily images of Earth from NASA's EPIC camera.
*   **Astronomy Fact of the Day:** Presents a random interesting astronomy fact.
*   **NASA Image and Video Library Search:** Allows users to search NASA's extensive image and video library.
*   **Favorites:** Users can save their favorite APOD images.
*   **Manual Location Input:** Allows users to manually set their latitude and longitude.

## Technologies Used
*   **Next.js:** React framework for building server-side rendered and static web applications.
*   **React:** JavaScript library for building user interfaces.
*   **TypeScript:** Typed superset of JavaScript that compiles to plain JavaScript.
*   **CSS:** For styling the application.
*   **NASA APIs:** Utilized for fetching astronomical data (APOD, EPIC, ISS, Mars Rover, NEO, Image/Video Search).

## Setup

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/AstronomyDashboardV2.git
    cd AstronomyDashboardV2
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root of the project and add your NASA API key:
    ```
    NASA_API_KEY=YOUR_NASA_API_KEY
    ```
    You can obtain a NASA API key from [https://api.nasa.gov/](https://api.nasa.gov/).

## Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  **Open in your browser:**
    The application will be accessible at `http://localhost:3000` (or another port if 3000 is in use).
