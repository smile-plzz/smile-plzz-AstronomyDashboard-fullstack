import Apod from '../components/Apod';
import IssLocation from '../components/IssLocation';
import MoonPhase from '../components/MoonPhase';
import UserLocation from '../components/UserLocation';
import CelestialEvents from '../components/CelestialEvents';
import NeoData from '../components/NeoData';
import MarsRoverPhotos from '../components/MarsRoverPhotos';
import EpicImages from '../components/EpicImages';
import AstronomyFact from '../components/AstronomyFact';
import NasaImageVideoSearch from '../components/NasaImageVideoSearch';
import StarChart from '../components/StarChart';
import Favorites from '../components/Favorites';
import ManualLocation from '../components/ManualLocation';

export default function Home() {
  return (
    <>
      <header>
        <h1>Astronomy Dashboard</h1>
        <button id="darkModeToggle">Toggle Dark Mode</button>
      </header>
      <main>
        <Apod />
        <IssLocation />
        <MoonPhase />
        <UserLocation />
        <CelestialEvents />
        <NeoData />
        <MarsRoverPhotos />
        <EpicImages />
        <AstronomyFact />
        <NasaImageVideoSearch />
        <StarChart />
        <Favorites />
        <ManualLocation />
      </main>
      <footer>
        <p>&copy; 2025 Astronomy Dashboard</p>
      </footer>
      <div id="offline-banner">You are currently offline. Some features may be limited.</div>
    </>
  );
}
