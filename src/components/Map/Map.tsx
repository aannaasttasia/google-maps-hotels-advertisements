import React, { useState, useEffect, Ref, useRef, useId } from "react";
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
import Tip from "./Tip";

export const Map = () => {
  const [activeMarker, setActiveMarker] = useState<MarkerType | null>(null);
  const [maps, setMaps] = useState<any>(null);
  const [visibleMarkers, setVisibleMarkers] = useState<MarkerType[]>([]);
  const [position, setPosition] = useState<CoordinatesType | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [allMarkers, setAllMarkers] = useState<MarkerType[]>(markers);
  const [markerSelectedId, setMarkerSelectedId] = useState<number | null>(null);
  const [lastAssignedId, setLastAssignedId] = useState<number>(5);
  const [allowToAdd, setAllowToAdd] = useState<boolean>(false);
  const [addBtnClk, setAddBtnClk] = useState<boolean>(false);


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
    const zoomChangedListener = maps.addListener(
      "zoom_changed",
      updateVisibleMarkers
    );

    return () => {
      google.maps.event.removeListener(idleListener);
      google.maps.event.removeListener(zoomChangedListener);
    };
  }, [maps, allMarkers]);

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
    const markerWithId = { ...markerData, id: lastAssignedId + 1 };
    console.log(markerWithId);
    setVisibleMarkers([...visibleMarkers, markerWithId]);
    setAllMarkers((prevMarkers) => [...prevMarkers, markerWithId]);
    setIsFormVisible(false);
    setLastAssignedId(lastAssignedId + 1);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setPosition(null);
    handleActiveMarker(null);
  };

  const handleCloseHotel = () => {
    handleActiveMarker(null);
  };

  const handleCloseTip = () => {
    setAddBtnClk(false);
  };

  const handleAddAnnouncment = (ev:any) => {
    console.log("start")
    if(allowToAdd){
        setPosition({ lat: ev.latLng.lat(), lng: ev.latLng.lng() });
        setIsFormVisible(true);
        setAllowToAdd(false); 
        handleActiveMarker(null);
    } 
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
                handleAddAnnouncment(ev)
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
                  onMouseOver={() => {
                    setMarkerSelectedId(contact.id);
                    console.log("here", contact.id);
                  }}
                  onMouseOut={() => {
                    setMarkerSelectedId(null);
                  }}
                >
                  <div>{contact.title}</div>
                </MarkerF>
              ))}
            </GoogleMap>
          </article>
        </article>
        <aside className="map__hotel-list">
          {visibleMarkers.map((markerItem, id) => {
            const isActive =
              markerItem.id === (markerSelectedId ? markerSelectedId : null);
            return (
              <motion.div
                whileHover={{ scale: 1.07 }}
                key={id}
                onClick={() => {
                  setActiveMarker(markerItem);
                }}
              >
                <ul key={id} className={isActive ? "active-marker" : ""}>
                  <MarkerComponent marker={markerItem} />
                </ul>
              </motion.div>
            );
          })}
        </aside>
        <button className="map__addNewHotel" onClick={(e)=>{e.preventDefault(); setAllowToAdd(true); setAddBtnClk(true)}}>add</button>
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
        {activeMarker && (
          <ActiveMarker marker={activeMarker} onClose={handleCloseHotel} />
        )}
      </div>
      <div className="map__tip">
        {addBtnClk && (
          <Tip onClose={handleCloseTip} />
        )}
      </div>
      <div className={activeMarker ? "color" : ""}></div>
    </div>
  );
};
