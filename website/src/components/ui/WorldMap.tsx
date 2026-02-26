"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
} from "react-simple-maps";

// Public TopoJSON from unpkg
const GEO_URL =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export interface MapLocation {
    id: string;
    label: string;
    sublabel?: string;
    /** [longitude, latitude] */
    coordinates: [number, number];
}

interface WorldMapProps {
    locations?: MapLocation[];
    title?: string;
    eyebrow?: string;
}

// Manah offices — real coordinates [lon, lat]
const DEFAULT_LOCATIONS: MapLocation[] = [
    { id: "delhi", label: "New Delhi", sublabel: "Corporate HQ", coordinates: [77.209, 28.614] },
    { id: "jaipur", label: "Jaipur", sublabel: "EPC & Projects", coordinates: [75.787, 26.912] },
    { id: "hyderabad", label: "Hyderabad", sublabel: "Aerospace Division", coordinates: [78.487, 17.385] },
    { id: "bangalore", label: "Bangalore", sublabel: "Tech & Manufacturing", coordinates: [77.594, 12.972] },
    { id: "dubai", label: "Dubai", sublabel: "Middle East Office", coordinates: [55.296, 25.276] },
];

export default function WorldMap({
    locations = DEFAULT_LOCATIONS,
    title = "Our Global Presence",
    eyebrow = "Locations",
}: WorldMapProps) {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div className="relative w-full bg-[#0d1e36] overflow-hidden rounded-2xl">
            {/* Header */}
            <div className="absolute top-6 left-8 z-10 pointer-events-none">
                <p className="text-[#c8a96e] text-xs font-semibold tracking-widest uppercase mb-1">
                    {eyebrow}
                </p>
                <h2 className="text-white font-display text-xl md:text-2xl font-bold">
                    {title}
                </h2>
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 right-8 z-10 flex items-center gap-2 pointer-events-none">
                <div className="w-3 h-3 rounded-full bg-[#c8a96e] border-2 border-white" />
                <span className="text-white/50 text-xs">Office Location</span>
            </div>

            {/* Map */}
            <ComposableMap
                projection="geoNaturalEarth1"
                projectionConfig={{ scale: 160 }}
                style={{ width: "100%", height: "auto" }}
                viewBox="0 0 900 480"
            >
                <ZoomableGroup center={[0, 10]} zoom={1} filterZoomEvent={() => false}>
                    {/* Subtle graticule / grid */}
                    <defs>
                        <pattern
                            id="grid"
                            width="50"
                            height="50"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 50 0 L 0 0 0 50"
                                fill="none"
                                stroke="rgba(255,255,255,0.04)"
                                strokeWidth="0.5"
                            />
                        </pattern>
                    </defs>
                    <rect width="900" height="480" fill="url(#grid)" />

                    {/* Countries */}
                    <Geographies geography={GEO_URL}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    style={{
                                        default: {
                                            fill: "#FFFFFF",
                                            fillOpacity: 0.88,
                                            stroke: "#0d1e36",
                                            strokeWidth: 0.5,
                                            outline: "none",
                                        },
                                        hover: {
                                            fill: "#FFFFFF",
                                            fillOpacity: 0.88,
                                            stroke: "#0d1e36",
                                            strokeWidth: 0.5,
                                            outline: "none",
                                        },
                                        pressed: {
                                            fill: "#FFFFFF",
                                            outline: "none",
                                        },
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                    {/* Markers */}
                    {locations.map((loc) => (
                        <Marker
                            key={loc.id}
                            coordinates={loc.coordinates}
                            onMouseEnter={() => setHovered(loc.id)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {/* Outer pulsing ring */}
                            <motion.circle
                                r={6}
                                fill="none"
                                stroke="#c8a96e"
                                strokeWidth={1.5}
                                initial={{ opacity: 0.8, scale: 1 }}
                                animate={{ opacity: 0, scale: 3 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                    delay: Math.random() * 1.5,
                                }}
                            />
                            {/* Inner dot */}
                            <motion.circle
                                r={5}
                                fill="#c8a96e"
                                stroke="white"
                                strokeWidth={1.5}
                                className="cursor-pointer"
                                whileHover={{ scale: 1.6 }}
                            />

                            {/* Tooltip */}
                            <AnimatePresence>
                                {hovered === loc.id && (
                                    <motion.g
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 4 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {/* Box */}
                                        <rect
                                            x={-56}
                                            y={-52}
                                            width={112}
                                            height={38}
                                            rx={6}
                                            fill="#0f2240"
                                            stroke="#c8a96e"
                                            strokeWidth={1}
                                        />
                                        {/* City */}
                                        <text
                                            y={-33}
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize="10"
                                            fontWeight="bold"
                                            fontFamily="Georgia, serif"
                                        >
                                            {loc.label}
                                        </text>
                                        {/* Sublabel */}
                                        {loc.sublabel && (
                                            <text
                                                y={-20}
                                                textAnchor="middle"
                                                fill="#c8a96e"
                                                fontSize="8"
                                                fontFamily="system-ui, sans-serif"
                                            >
                                                {loc.sublabel}
                                            </text>
                                        )}
                                    </motion.g>
                                )}
                            </AnimatePresence>
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
}
