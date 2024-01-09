import './App.css';
import { Map } from './components/Map/Map.tsx'
import { useJsApiLoader } from '@react-google-maps/api';
import  Nav  from './components/Nav/Nav.tsx';

const API_KEY = process.env.REACT_APP_API_KEY

console.log(API_KEY)

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
