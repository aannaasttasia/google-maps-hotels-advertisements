import './App.css';
import { Map } from './components/Map/Map.tsx'
import { useJsApiLoader } from '@react-google-maps/api';
import  Nav  from './components/Nav/Nav.tsx';

const API_KEY = process.env.REACT_APP_API_KEY

console.log(API_KEY)

const contacts = [
  { title: 'Spiderman', lat: 41.529616, lng: 2.434130 },
  { title: 'Iron Man', lat: 41.528103, lng: 2.433834 },
  { title: 'Hulk', lat: 41.530192, lng: 2.422994 }
];

const App= () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  })

  return (
    <section>
      < Nav/>
    <form className="App">
      {isLoaded? <Map/>: <h2>Loading</h2> }
    </form>
    </section>
    
  );
}

export default App;
