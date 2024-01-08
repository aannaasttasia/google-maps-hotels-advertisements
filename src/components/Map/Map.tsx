import React, { useState, useEffect, Ref, useRef } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import "./css/Map.scss";
import { MarkerComponent } from "../Marker/Marker";
import { CoordinatesType, MarkerType } from "../../dataTypes";
import { markers } from "../../defaultMarkers.js";
import { containerStyle, center } from "../../constants";
import AddMarkerFormComponent from "../AddMarker/AddMarkerForm";
import { motion } from "framer-motion";
import { act } from "react-dom/test-utils";
import { ActiveMarker } from "../ActiveMarker/ActiveMarker";

export const Map = () => {
  const [activeMarker, setActiveMarker] = useState<MarkerType | null>(null);
  const [maps, setMaps] = useState<any>(null);
  const [visibleMarkers, setVisibleMarkers] = useState<MarkerType[]>([]);
  const [position, setPosition] = useState<CoordinatesType | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [allMarkers, setAllMarkers] = useState<MarkerType[]>(markers);
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const markerListFull = allMarkers;

  useEffect(() => {
    console.log(markerListFull);
    if (!maps) return;

    const updateVisibleMarkers = () => {
      const bounds = maps.getBounds();
      if (!bounds) return;

      const visibleMarkers = allMarkers.filter(
        (marker) => bounds && bounds.contains(marker.position)
      );

      setVisibleMarkers(visibleMarkers);
    };

    updateVisibleMarkers();

    const idleListener = maps.addListener("idle", updateVisibleMarkers);

    return () => google.maps.event.removeListener(idleListener);
  }, [maps]);

  const onLoad = React.useCallback(function callback(map: any) {
    setMaps(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMaps(null);
  }, []);

  const handleActiveMarker = (marker: MarkerType | null) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleSaveMarker = (markerData: MarkerType) => {
    console.log("New Marker Data:", markerData);
    setVisibleMarkers([...visibleMarkers, markerData]);
    setAllMarkers((prevMarkers) => [...prevMarkers, markerData]);
    setIsFormVisible(false);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setPosition(null);
    handleActiveMarker(null);
  };

  const handleCloseHotel = () => {
    handleActiveMarker(null);
  };

  return (
    <div className="map__container">
      <section className="map">
        <article className="map__google-map">
          <article className="map__map-frame">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={(ev: any) => {
                setPosition({ lat: ev.latLng.lat(), lng: ev.latLng.lng() });
                setIsFormVisible(true);
                handleActiveMarker(null);
              }}
            >
              {allMarkers.map((contact) => (
                <MarkerF
                  key={contact.id}
                  position={contact.position}
                  onClick={() => {
                    handleActiveMarker(contact);
                    console.log(activeMarker);
                  }}
                  onMouseOver={()=>{setMouseOver(!mouseOver)}}
                  onMouseOut={()=>{setMouseOver(!mouseOver)}}
                >
                  <div>{contact.title}</div>
                </MarkerF>
              ))}
            </GoogleMap>
          </article>
        </article>
        <aside className="map__hotel-list">
          <h1>Available hotels in the area</h1>
          {visibleMarkers.map((markerItem, id) => {
            return (
              <motion.div whileHover={{ scale: 1.07 }} key={id} onClick={()=>{setActiveMarker(markerItem)}}>
                <ul key={id}>
                  <MarkerComponent marker={markerItem} />
                </ul>
              </motion.div>
            );
          })}
        </aside>
        <article className="map__add-marker-form">
          <div>
            {isFormVisible ? (
              position ? (
                <div className="map__form-wrapper">
                  <AddMarkerFormComponent
                    onSave={handleSaveMarker}
                    position={position}
                    onClose={handleCloseForm}
                  />
                </div>
              ) : (
                false
              )
            ) : (
              false
            )}
          </div>
        </article>
      </section>
      <div className="map__active-marker">
        {activeMarker && <ActiveMarker marker={activeMarker} onClose={handleCloseHotel}/>}
      </div>
      <div
          className={
             (activeMarker ? "color" : "")
          }
        ></div>
    </div>
  );
};
