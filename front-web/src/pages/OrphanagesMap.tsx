import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import api from '../services/api';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/orphanages-map.css';

import mapMarkerImg from '../images/map-marker.svg';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={mapMarkerImg} alt='Happy' />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Monsenhor Hipólito</strong>
          <span>Piauí</span>
        </footer>
      </aside>

      <Map
        center={[-7.0885857, -41.4650352]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup
              closeButton={false}
              maxWidth={240}
              minWidth={240}
              className='map-popup'
            >
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color='#fff' />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to='/orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color='#fff' />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
