'use client'

import Link from "next/link";
import React, { useEffect, useRef } from "react";

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './styles.css';

function MapboxMap(){
	const mapRef = useRef<any>(null);
	const mapContainerRef = useRef<any>(null);

	useEffect(() => {
	  mapboxgl.accessToken = 'pk.eyJ1IjoicWJpdDExMDMiLCJhIjoiY204cDIxanUzMDVxdTJwczg5aG1kYWtnayJ9.2Zn2YLEtvMlbRwxnDTAOnQ'
	  mapRef.current = new mapboxgl.Map({
		container: mapContainerRef.current,
	  });

	  return () => {
		mapRef.current.remove()
	  }
	}, [])

	return (
	  <>
		<div className='map-container' ref={mapContainerRef}/>
	  </>
	)
}

function Map(){
	return <>
		<MapboxMap/>
	</>;
}

export default Map;