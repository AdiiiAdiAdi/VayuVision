// //     const cells: GridCell[] = [];
// //     const topLat = PUNE_BOUNDS.topLeft[0];
// //     const bottomLat = PUNE_BOUNDS.bottomRight[0];
// //     const leftLng = PUNE_BOUNDS.topLeft[1];
// //     const rightLng = PUNE_BOUNDS.bottomRight[1];

// //     const latStep = (topLat - bottomLat) / GRID_SIZE;
// //     const lngStep = (rightLng - leftLng) / GRID_SIZE;

// //     for (let row = 0; row < GRID_SIZE; row++) {
// //       for (let col = 0; col < GRID_SIZE; col++) {
// //         const cellTopLat = topLat - row * latStep;
// //         const cellBottomLat = topLat - (row + 1) * latStep;
// //         const cellLeftLng = leftLng + col * lngStep;
// //         const cellRightLng = leftLng + (col + 1) * lngStep;

// //         const bounds: [[number, number], [number, number]] = [
// //           [cellBottomLat, cellLeftLng],
// //           [cellTopLat, cellRightLng]
// //         ];

// //         cells.push({
// //           row,
// //           col,
// //           cellId: `${col}-${row}`,
// //           bounds
// //         });
// //       }
// //     }

// //     return cells;
// //   };

// //   const getCellEmission = (row: number, col: number): number =>
// //     cellEmissions?.[row]?.[col] ?? 0;

// //   const getEmissionColor = (emission: number): string => {
// //     if (emission >= 250) return "#dc2626";
// //     if (emission >= 150) return "#ea580c";
// //     if (emission >= 50) return "#eab308";
// //     return "#22c55e";
// //   };

// //   const gridCells = createGridCells();

// //   return (
// //     <>
// //       {gridCells.map(cell => {
// //         const isSelected = cell.cellId === selectedCellId;
// //         const isAffected = affectedCellIds?.includes(cell.cellId);

// //         return (
// //           <Rectangle
// //             key={cell.cellId}
// //             bounds={cell.bounds}
// //             pane="gridPane"
// //             pathOptions={{
// //               fillOpacity: isAffected ? 0.6 : 0.35, // More opaque if affected
// //               color: isSelected ? "#2563eb" : isAffected ? "#f59e0b" : "#ffffff", // Blue if selected, orange if affected, white otherwise
// //               weight: isSelected ? 3 : isAffected ? 2 : 0.7, // Thicker border if selected or affected
// //               fillColor: getEmissionColor(getCellEmission(cell.row, cell.col)),
// //             }}
// //             eventHandlers={{
// //               click: () => {
// //                 onCellSelect?.({
// //                   row: cell.row,
// //                   col: cell.col,
// //                   cellId: cell.cellId,
// //                   bounds: cell.bounds
// //                 });
// //               },
// //             }}
// //           />
// //         );
// //       })}
// //     </>
// //   );
// // }

// // // Main FixedGridMap component
// // export function FixedGridMap({ cellEmissions, onCellSelect, selectedCellId, affectedCellIds }: FixedGridMapProps) {
// //   // Calculate center of the bounding box
// //   const center: [number, number] = [
// //     (PUNE_BOUNDS.topLeft[0] + PUNE_BOUNDS.bottomRight[0]) / 2,
// //     (PUNE_BOUNDS.topLeft[1] + PUNE_BOUNDS.bottomRight[1]) / 2,
// //   ];

// //   return (
// //     <div className="bg-white p-6 rounded-lg border">
// //       {/* TITLE + LEGEND */}
// //       <div className="flex justify-between items-center mb-4">
// //         <h3 className="text-lg">Neighborhood CO₂ Emissions Map</h3>

// //         <div className="flex items-center gap-3 text-xs">
// //           {[
// //             ["#22c55e", "<50 (Low)"],
// //             ["#eab308", "50-150 (Medium)"],
// //             ["#ea580c", "150-250 (High)"],
// //             ["#dc2626", "≥250 (Very High)"],
// //           ].map(([color, label]) => (
// //             <div key={label} className="flex items-center gap-1">
// //               <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
// //               <span>{label}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* MAP CONTAINER */}
// //       <div className="relative w-full" style={{ height: 560 }}>
// //         <MapContainer
// //           center={center}
// //           zoom={13}
// //           scrollWheelZoom={true}
// //           style={{ height: "100%", width: "100%" }}
// //           className="rounded-lg"
// //         >
// //           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

// //           {/* Fixed Geographic Grid */}
// //           <FixedGridOverlay
// //             cellEmissions={cellEmissions}
// //             onCellSelect={onCellSelect}
// //             selectedCellId={selectedCellId}
// //             affectedCellIds={affectedCellIds}
// //           />

// //         </MapContainer>
// //       </div>
// //     </div>
// //   );
// // }




// import React, { useEffect } from "react";
// import { MapContainer, TileLayer, Rectangle, useMap } from "react-leaflet";
// import L from "leaflet";

// // Define the fixed bounding box for Pune
// const PUNE_BOUNDS = {
//   topLeft: [18.5600, 73.8000] as [number, number],     // [lat, lng]
//   bottomRight: [18.5000, 73.9000] as [number, number], // [lat, lng]
// };

// const GRID_SIZE = 12;

// interface GridCell {
//   row: number;
//   col: number;
//   cellId: string;
//   bounds: [[number, number], [number, number]];
// }

// interface FixedGridMapProps {
//   cellEmissions?: number[][];
//   onCellSelect?: (data: { row: number; col: number; cellId: string; bounds: [[number, number], [number, number]] }) => void;
//   selectedCellId?: string | null;
//   affectedCellIds?: string[];
//   // NEW props so Floating widget can show Before/After precisely:
//   selectedCellEmission?: number | null;      // current emission (after interventions)
//   selectedCellBaseEmission?: number | null;  // baseline / before interventions
// }

// /* ---------------------
//    Shared grid generator
//    --------------------- */
// const createGridCells = (): GridCell[] => {
//   const cells: GridCell[] = [];
//   const topLat = PUNE_BOUNDS.topLeft[0];
//   const bottomLat = PUNE_BOUNDS.bottomRight[0];
//   const leftLng = PUNE_BOUNDS.topLeft[1];
//   const rightLng = PUNE_BOUNDS.bottomRight[1];

//   const latStep = (topLat - bottomLat) / GRID_SIZE;
//   const lngStep = (rightLng - leftLng) / GRID_SIZE;

//   for (let row = 0; row < GRID_SIZE; row++) {
//     for (let col = 0; col < GRID_SIZE; col++) {
//       const cellTopLat = topLat - row * latStep;
//       const cellBottomLat = topLat - (row + 1) * latStep;
//       const cellLeftLng = leftLng + col * lngStep;
//       const cellRightLng = leftLng + (col + 1) * lngStep;

//       const bounds: [[number, number], [number, number]] = [
//         [cellBottomLat, cellLeftLng],
//         [cellTopLat, cellRightLng],
//       ];

//       cells.push({
//         row,
//         col,
//         cellId: `${col}-${row}`,
//         bounds,
//       });
//     }
//   }

//   return cells;
// };

// /* -------------------------
//    Floating Emission Widget
//    (creates and manages a small DOM node
//     inside the map container)
//    ------------------------- */
// // function FloatingEmissionWidget({
// //   gridCells,
// //   cellEmissions,
// //   selectedCellId,
// //   selectedCellEmission,
// //   selectedCellBaseEmission,
// // }: {
// //   gridCells: GridCell[];
// //   cellEmissions?: number[][];
// //   selectedCellId?: string | null;
// //   selectedCellEmission?: number | null;
// //   selectedCellBaseEmission?: number | null;
// // }) {
// //   const map = useMap();

// //   useEffect(() => {
// //     if (!map) return;
// //     const container = map.getContainer();
// //     const el = document.createElement("div");
// //     el.className = "floating-emission-widget p-2 bg-white rounded-lg shadow-lg text-xs";
// //     // initial hidden
// //     el.style.display = "none";
// //     el.style.pointerEvents = "auto";
// //     el.style.zIndex = "700"; // above gridPane (which used 500)
// //     container.appendChild(el);

// //     const updatePositionAndContent = () => {
// //       if (!selectedCellId) {
// //         el.style.display = "none";
// //         return;
// //       }
// //       const cell = gridCells.find((c) => c.cellId === selectedCellId);
// //       if (!cell) {
// //         el.style.display = "none";
// //         return;
// //       }

// //       // compute center lat/lng and container point
// //       const bounds = cell.bounds;
// //       const centerLat = (bounds[0][0] + bounds[1][0]) / 2;
// //       const centerLng = (bounds[0][1] + bounds[1][1]) / 2;
// //       const pt = map.latLngToContainerPoint([centerLat, centerLng]);

// //       // position above the cell center
// //       el.style.position = "absolute";
// //       el.style.left = `${pt.x}px`;
// //       // place slightly above center
// //       el.style.top = `${pt.y - 60}px`;
// //       el.style.transform = "translate(-50%, -100%)";

// //       // get values to display
// //       const before = selectedCellBaseEmission ?? (cellEmissions?.[cell.row]?.[cell.col] ?? 0);
// //       const after = selectedCellEmission ?? (cellEmissions?.[cell.row]?.[cell.col] ?? 0);

// //       // small inline bars (keeps dependencies minimal - no chart lib required)
// //       const maxBarRef = 600; // adjust scale (tons) to fit visual; you can compute dynamic scale if needed
// //       const beforePct = Math.min(100, (before / Math.max(1, maxBarRef)) * 100);
// //       const afterPct = Math.min(100, (after / Math.max(1, maxBarRef)) * 100);

// //       el.style.display = "block";
// //       el.innerHTML = `
// //         <div style="font-weight:600;margin-bottom:6px">Emission Impact</div>
// //         <div style="display:flex;gap:8px;align-items:end;height:56px;">
// //           <div style="width:20px;background:#ef4444;border-radius:4px;height:${beforePct}%;" title="Before"></div>
// //           <div style="width:20px;background:#22c55e;border-radius:4px;height:${afterPct}%;" title="After"></div>
// //         </div>
// //         <div style="display:flex;justify-content:space-between;font-size:11px;margin-top:6px">
// //           <div style="display:flex;gap:6px;align-items:center"><div style="width:10px;height:10px;background:#ef4444;border-radius:2px"></div>Before</div>
// //           <div style="font-weight:700">${before.toFixed(1)}t</div>
// //         </div>
// //         <div style="display:flex;justify-content:space-between;font-size:11px;margin-top:4px">
// //           <div style="display:flex;gap:6px;align-items:center"><div style="width:10px;height:10px;background:#22c55e;border-radius:2px"></div>After</div>
// //           <div style="font-weight:700">${after.toFixed(1)}t</div>
// //         </div>
// //       `;
// //     };

// //     // update on selection change, move or zoom
// //     updatePositionAndContent();
// //     map.on("move", updatePositionAndContent);
// //     map.on("zoom", updatePositionAndContent);

// //     return () => {
// //       map.off("move", updatePositionAndContent);
// //       map.off("zoom", updatePositionAndContent);
// //       if (el.parentNode) el.parentNode.removeChild(el);
// //     };
// //   }, [map, gridCells, cellEmissions, selectedCellId, selectedCellEmission, selectedCellBaseEmission]);

// //   return null;
// // }

// /* Replace the old FloatingEmissionWidget effect with this improved component */
// function FloatingEmissionWidget({
//   gridCells,
//   cellEmissions,
//   selectedCellId,
//   selectedCellEmission,
//   selectedCellBaseEmission,
// }: {
//   gridCells: GridCell[];
//   cellEmissions?: number[][];
//   selectedCellId?: string | null;
//   selectedCellEmission?: number | null;
//   selectedCellBaseEmission?: number | null;
// }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!map) return;
//     const container = map.getContainer();
//     const el = document.createElement("div");
//     el.className = "floating-emission-widget p-3 bg-white rounded-lg shadow-lg text-sm";
//     el.style.display = "none";
//     el.style.pointerEvents = "auto";
//     el.style.zIndex = "700";
//     container.appendChild(el);

//     const updatePositionAndContent = () => {
//       if (!selectedCellId) {
//         el.style.display = "none";
//         return;
//       }
//       const cell = gridCells.find((c) => c.cellId === selectedCellId);
//       if (!cell) {
//         el.style.display = "none";
//         return;
//       }

//       const bounds = cell.bounds;
//       const centerLat = (bounds[0][0] + bounds[1][0]) / 2;
//       const centerLng = (bounds[0][1] + bounds[1][1]) / 2;
//       const pt = map.latLngToContainerPoint([centerLat, centerLng]);

//       el.style.position = "absolute";
//       // position above the cell with slight offset; tweak -70 to move up/down
//       el.style.left = `${pt.x}px`;
//       el.style.top = `${pt.y - 74}px`;
//       el.style.transform = "translate(-50%, -100%)";

//       const before = selectedCellBaseEmission ?? (cellEmissions?.[cell.row]?.[cell.col] ?? 0);
//       const after = selectedCellEmission ?? (cellEmissions?.[cell.row]?.[cell.col] ?? 0);

//       // dynamic scale (slightly above max for breathing room)
//       const maxVal = Math.max(before, after, 1) * 1.15;

//       // SVG dimensions
//       const w = 120;
//       const h = 90;
//       const padding = { top: 12, right: 8, bottom: 30, left: 28 };
//       const chartW = w - padding.left - padding.right;
//       const chartH = h - padding.top - padding.bottom;

//       // convert value to height (pixels)
//       const toY = (val: number) => {
//         const ratio = Math.min(1, val / maxVal);
//         return padding.top + (chartH * (1 - ratio));
//       };

//       const beforeY = toY(before);
//       const afterY = toY(after);
//       const baselineY = padding.top + chartH; // y position for zero (x-axis)

//       // Build inner HTML using SVG for axes + two vertical bars
//       el.style.display = "block";
//       el.innerHTML = `
//         <div style="font-weight:700; margin-bottom:6px; text-align:center;">Emission Impact</div>
//         <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block">
//           <!-- Y axis labels (3 ticks: 0, mid, max) -->
//           <g font-size="10" fill="#374151">
//             <text x="6" y="${padding.top + 4}" text-anchor="start">${maxVal.toFixed(0)}</text>
//             <text x="6" y="${padding.top + (chartH/2) + 4}" text-anchor="start">${(maxVal/2).toFixed(0)}</text>
//             <text x="6" y="${baselineY + 4}" text-anchor="start">0</text>
//           </g>

//           <!-- X and Y axis lines -->
//           <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${baselineY}" stroke="#e5e7eb" stroke-width="1"/>
//           <line x1="${padding.left}" y1="${baselineY}" x2="${w - padding.right}" y2="${baselineY}" stroke="#e5e7eb" stroke-width="1"/>

//           <!-- Bars (Before - red, After - green) -->
//           <rect x="${padding.left + chartW * 0.2 - 12}" y="${beforeY}" width="24" height="${baselineY - beforeY}" rx="3" fill="#ef4444"></rect>
//           <rect x="${padding.left + chartW * 0.8 - 12}" y="${afterY}" width="24" height="${baselineY - afterY}" rx="3" fill="#22c55e"></rect>

//           <!-- Small value labels above bars -->
//           <text x="${padding.left + chartW * 0.2}" y="${Math.max(beforeY - 6, padding.top)}" font-size="10" text-anchor="middle" fill="#111">${before.toFixed(1)}</text>
//           <text x="${padding.left + chartW * 0.8}" y="${Math.max(afterY - 6, padding.top)}" font-size="10" text-anchor="middle" fill="#111">${after.toFixed(1)}</text>

//           <!-- X axis labels -->
//           <text x="${padding.left + chartW * 0.2}" y="${h - 6}" font-size="10" text-anchor="middle" fill="#374151">Before</text>
//           <text x="${padding.left + chartW * 0.8}" y="${h - 6}" font-size="10" text-anchor="middle" fill="#374151">After</text>
//         </svg>

//         <div style="display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:11px;color:#374151">
//           <div style="display:flex;align-items:center;gap:6px"><span style="width:10px;height:10px;background:#ef4444;display:inline-block;border-radius:2px"></span>Before</div>
//           <div style="display:flex;align-items:center;gap:6px"><span style="width:10px;height:10px;background:#22c55e;display:inline-block;border-radius:2px"></span>After</div>
//         </div>
//       `;
//     };

//     updatePositionAndContent();
//     map.on("move", updatePositionAndContent);
//     map.on("zoom", updatePositionAndContent);

//     return () => {
//       map.off("move", updatePositionAndContent);
//       map.off("zoom", updatePositionAndContent);
//       if (el.parentNode) el.parentNode.removeChild(el);
//     };
//   }, [map, gridCells, cellEmissions, selectedCellId, selectedCellEmission, selectedCellBaseEmission]);

//   return null;
// }


// /* -------------------------
//    FixedGridOverlay (unchanged)
//    ------------------------- */
// function FixedGridOverlay({ cellEmissions, onCellSelect, selectedCellId, affectedCellIds }: FixedGridMapProps) {
//   const map = useMap();
//   const [paneReady, setPaneReady] = React.useState(false);

//   useEffect(() => {
//     if (!map) return;
//     if (!map.getPane("gridPane")) {
//       map.createPane("gridPane");
//       map.getPane("gridPane")!.style.zIndex = "500";
//     }
//     setPaneReady(true);
//   }, [map]);

//   if (!paneReady) return null;

//   const getCellEmission = (row: number, col: number): number => cellEmissions?.[row]?.[col] ?? 0;

//   const getEmissionColor = (emission: number): string => {
//     if (emission >= 250) return "#dc2626";
//     if (emission >= 150) return "#ea580c";
//     if (emission >= 50) return "#eab308";
//     return "#22c55e";
//   };

//   const gridCells = createGridCells();

//   return (
//     <>
//       {gridCells.map(cell => {
//         const isSelected = cell.cellId === selectedCellId;
//         const isAffected = affectedCellIds?.includes(cell.cellId);

//         return (
//           <Rectangle
//             key={cell.cellId}
//             bounds={cell.bounds}
//             pane="gridPane"
//             pathOptions={{
//               fillOpacity: isAffected ? 0.6 : 0.35,
//               color: isSelected ? "#2563eb" : isAffected ? "#f59e0b" : "#ffffff",
//               weight: isSelected ? 3 : isAffected ? 2 : 0.7,
//               fillColor: getEmissionColor(getCellEmission(cell.row, cell.col)),
//             }}
//             eventHandlers={{
//               click: () => {
//                 onCellSelect?.({
//                   row: cell.row,
//                   col: cell.col,
//                   cellId: cell.cellId,
//                   bounds: cell.bounds
//                 });
//               },
//             }}
//           />
//         );
//       })}
//     </>
//   );
// }

// /* -------------------------
//    Main FixedGridMap component
//    ------------------------- */
// export function FixedGridMap({
//   cellEmissions,
//   onCellSelect,
//   selectedCellId,
//   affectedCellIds,
//   selectedCellEmission,
//   selectedCellBaseEmission,
// }: FixedGridMapProps) {
//   const center: [number, number] = [
//     (PUNE_BOUNDS.topLeft[0] + PUNE_BOUNDS.bottomRight[0]) / 2,
//     (PUNE_BOUNDS.topLeft[1] + PUNE_BOUNDS.bottomRight[1]) / 2,
//   ];

//   // create gridCells once and pass into overlay & widget
//   const gridCells = createGridCells();

//   return (
//     <div className="bg-white p-6 rounded-lg border">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg">Neighborhood CO₂ Emissions Map</h3>
//         <div className="flex items-center gap-3 text-xs">
//           {[
//             ["#22c55e", "<50 (Low)"],
//             ["#eab308", "50-150 (Medium)"],
//             ["#ea580c", "150-250 (High)"],
//             ["#dc2626", "≥250 (Very High)"],
//           ].map(([color, label]) => (
//             <div key={label} className="flex items-center gap-1">
//               <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
//               <span>{label}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="relative w-full" style={{ height: 560 }}>
//         <MapContainer
//           center={center}
//           zoom={13}
//           scrollWheelZoom={true}
//           style={{ height: "100%", width: "100%" }}
//           className="rounded-lg"
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//           <FixedGridOverlay
//             cellEmissions={cellEmissions}
//             onCellSelect={onCellSelect}
//             selectedCellId={selectedCellId}
//             affectedCellIds={affectedCellIds}
//           />

//           <FloatingEmissionWidget
//             gridCells={gridCells}
//             cellEmissions={cellEmissions}
//             selectedCellId={selectedCellId}
//             selectedCellEmission={selectedCellEmission ?? null}
//             selectedCellBaseEmission={selectedCellBaseEmission ?? null}
//           />
//         </MapContainer>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Rectangle, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
  Legend,
} from "recharts";

const PUNE_BOUNDS = {
  topLeft: [18.5600, 73.8000] as [number, number],
  bottomRight: [18.5000, 73.9000] as [number, number],
};

const GRID_SIZE = 12;

interface GridCellBounds {
  row: number;
  col: number;
  cellId: string;
  bounds: [[number, number], [number, number]];
}

interface SelectedCellMini {
  id: string;
  row: number;
  col: number;
  baseEmission: number;
  emission: number;
  bounds: [[number, number], [number, number]];
  // extend if you need more fields
}

interface GridCellData {
  id: string;
  interventions: Array<{
    id: string;
    icon?: string;
    name: string;
  }>;
}

interface FixedGridMapProps {
  cellEmissions?: number[][];
  onCellSelect?: (data: { row: number; col: number; cellId: string; bounds: [[number, number], [number, number]] }) => void;
  selectedCellId?: string | null;
  affectedCellIds?: string[];
  /** Pass currently selected cell's emissions (base + current) for the floating chart */
  selectedCellData?: SelectedCellMini | null;
  /** control whether floating emission impact is shown on this map instance */
  showFloatingImpact?: boolean;
  /** Grid data with interventions for each cell */
  gridData?: GridCellData[];
}

function FixedGridOverlay({ cellEmissions, onCellSelect, selectedCellId, affectedCellIds, gridData }: FixedGridMapProps) {
  const map = useMap();
  const [paneReady, setPaneReady] = React.useState(false);

  useEffect(() => {
    if (!map) return;
    if (!map.getPane("gridPane")) {
      map.createPane("gridPane");
      map.getPane("gridPane")!.style.zIndex = "500";
    }
    setPaneReady(true);
  }, [map]);

  if (!paneReady) return null;

    const topLat = PUNE_BOUNDS.topLeft[0];
    const bottomLat = PUNE_BOUNDS.bottomRight[0];
    const leftLng = PUNE_BOUNDS.topLeft[1];
    const rightLng = PUNE_BOUNDS.bottomRight[1];

    const latStep = (topLat - bottomLat) / GRID_SIZE;
    const lngStep = (rightLng - leftLng) / GRID_SIZE;

  const cells: GridCellBounds[] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const cellTopLat = topLat - row * latStep;
        const cellBottomLat = topLat - (row + 1) * latStep;
        const cellLeftLng = leftLng + col * lngStep;
        const cellRightLng = leftLng + (col + 1) * lngStep;

        const bounds: [[number, number], [number, number]] = [
          [cellBottomLat, cellLeftLng],
        [cellTopLat, cellRightLng],
        ];

        cells.push({
          row,
          col,
          cellId: `${col}-${row}`,
        bounds,
        });
      }
    }

  const getCellEmission = (row: number, col: number) => cellEmissions?.[row]?.[col] ?? 0;
  const getEmissionColor = (emission: number) => {
    if (emission >= 250) return "#dc2626";
    if (emission >= 150) return "#ea580c";
    if (emission >= 50) return "#eab308";
    return "#22c55e";
  };

  // Get cell data for interventions
  const getCellData = (cellId: string) => {
    return gridData?.find(cell => cell.id === cellId);
  };

  // Calculate center of cell bounds
  const getCellCenter = (bounds: [[number, number], [number, number]]): [number, number] => {
    const [[south, west], [north, east]] = bounds;
    return [(south + north) / 2, (west + east) / 2];
  };

  return (
    <>
      {cells.map((cell) => {
        const isSelected = cell.cellId === selectedCellId;
        const isAffected = affectedCellIds?.includes(cell.cellId);
        const cellData = getCellData(cell.cellId);
        const cellCenter = getCellCenter(cell.bounds);

        return (
          <React.Fragment key={cell.cellId}>
            <Rectangle
              bounds={cell.bounds}
              pane="gridPane"
              pathOptions={{
                fillOpacity: isAffected ? 0.6 : 0.35,
                color: isSelected ? "#2563eb" : isAffected ? "#f59e0b" : "#ffffff",
                weight: isSelected ? 3 : isAffected ? 2 : 0.7,
                fillColor: getEmissionColor(getCellEmission(cell.row, cell.col)),
              }}
              eventHandlers={{
                click: () => {
                  onCellSelect?.({
                    row: cell.row,
                    col: cell.col,
                    cellId: cell.cellId,
                    bounds: cell.bounds,
                  });
                },
              }}
            />
            {/* Render intervention markers */}
            {cellData?.interventions && cellData.interventions.length > 0 && (
              <>
                {cellData.interventions.map((intervention, idx) => {
                  // Offset markers so they don't overlap
                  const offset = idx * 0.001; // Small offset for multiple interventions
                  const position: [number, number] = [
                    cellCenter[0] + offset,
                    cellCenter[1] + offset
                  ];

                  const icon = L.divIcon({
                    className: 'intervention-marker',
                    html: `<div style="
                      background: white;
                      border: 2px solid #3b82f6;
                      border-radius: 50%;
                      width: 32px;
                      height: 32px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 18px;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    ">${intervention.icon || '🔧'}</div>`,
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                  });

                  return (
                    <Marker
                      key={`${cell.cellId}-${intervention.id}`}
                      position={position}
                      icon={icon}
                      pane="markerPane"
                    />
                  );
                })}
              </>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}

/**
 * FloatingChartOverlay component:
 * - computes pixel coordinates of selectedCell center using map.latLngToContainerPoint
 * - renders a small absolutely positioned div over the map container
 * - uses Recharts vertical bars with X and Y axes and labels
 */
function FloatingChartOverlay({
  map,
  selectedCellData,
}: {
  map: L.Map | null;
  selectedCellData?: SelectedCellMini | null;
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = React.useCallback(() => {
    if (!map || !selectedCellData) {
      setPos(null);
      return;
    }
    const b = selectedCellData.bounds;
    // Use top-right corner of the cell instead of center to position away from the grid
    const topRightLat = b[1][0]; // top latitude (bounds[1] is top-right)
    const topRightLng = b[1][1]; // right longitude
    try {
      const topRightPoint = map.latLngToContainerPoint([topRightLat, topRightLng] as L.LatLngExpression);
      // Position to the right and above the top-right corner
      setPos({ 
        x: topRightPoint.x + 20, // 20px to the right of top-right corner
        y: topRightPoint.y - 180  // 180px above the top-right corner
      });
    } catch (e) {
      setPos(null);
    }
  }, [map, selectedCellData]);

  useEffect(() => {
    if (!map || !selectedCellData) {
      setPos(null);
      return;
    }
    
    // Update position immediately
    updatePosition();
    
    // Update position on map move/zoom
    map.on('move', updatePosition);
    map.on('zoom', updatePosition);
    map.on('moveend', updatePosition);
    map.on('zoomend', updatePosition);
    
    return () => {
      map.off('move', updatePosition);
      map.off('zoom', updatePosition);
      map.off('moveend', updatePosition);
      map.off('zoomend', updatePosition);
    };
  }, [map, selectedCellData, updatePosition]);

  if (!map || !selectedCellData || !pos) return null;

  const data = [
    { name: "Before", value: Number((selectedCellData.baseEmission ?? 0).toFixed(1)), color: "#ef4444" },
    { name: "After", value: Number((selectedCellData.emission ?? 0).toFixed(1)), color: "#22c55e" },
  ];

  // Position: offset to top-right of cell to avoid blocking the view
  const style: React.CSSProperties = {
    position: "absolute",
    left: pos.x, // Already calculated in updatePosition (top-right corner + offset)
    top: pos.y, // Already calculated in updatePosition (top-right corner - offset)
    width: 140,
    zIndex: 800,
    pointerEvents: "auto",
  };

  return (
    <div style={style}>
      <div
        style={{
          padding: 10,
          borderRadius: 8,
          background: "white",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 6px 18px rgba(16,24,40,0.12)",
        }}
      >
        <div style={{ textAlign: "center", fontWeight: 600, marginBottom: 6 }}>Emission Impact</div>

        <div style={{ width: "100%", height: 100 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 6, left: 6, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  padding: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: number, name: string, props: any) => {
                  const payload = props.payload;
                  const reduction = payload?.name === 'Before' ? 0 : 
                    (data.find(d => d.name === 'Before')?.value || 0) - value;
                  const reductionPercent = payload?.name === 'Before' ? 0 :
                    (((data.find(d => d.name === 'Before')?.value || 0) - value) / 
                     (data.find(d => d.name === 'Before')?.value || 1)) * 100;
                  
                  if (payload?.name === 'Before') {
                    return [`${value.toFixed(2)} tons CO₂/year`, 'Baseline'];
                  } else {
                    return [
                      [
                        `${value.toFixed(2)} tons CO₂/year`,
                        `Reduction: ${reduction.toFixed(2)} tons (${reductionPercent.toFixed(1)}%)`
                      ],
                      'After Intervention'
                    ];
                  }
                }}
                labelFormatter={(label) => `Status: ${label}`}
              />
              <Bar dataKey="value">
                {data.map((entry, idx) => (
                  <Cell key={`c-${idx}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ width: 10, height: 10, background: "#ef4444", borderRadius: 2 }} />
            <div>Before</div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ width: 10, height: 10, background: "#22c55e", borderRadius: 2 }} />
            <div>After</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FixedGridMap({
  cellEmissions,
  onCellSelect,
  selectedCellId,
  affectedCellIds,
  selectedCellData,
  showFloatingImpact = false,
}: FixedGridMapProps) {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  // compute the center
  const center: [number, number] = [
    (PUNE_BOUNDS.topLeft[0] + PUNE_BOUNDS.bottomRight[0]) / 2,
    (PUNE_BOUNDS.topLeft[1] + PUNE_BOUNDS.bottomRight[1]) / 2,
  ];

  return (
    <div className="bg-white p-4 rounded-lg border relative">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg">Neighborhood CO₂ Emissions Map</h3>
        <div className="flex items-center gap-3 text-xs">
          {[
            ["#22c55e", "<50 (Low)"],
            ["#eab308", "50-150 (Medium)"],
            ["#ea580c", "150-250 (High)"],
            ["#dc2626", "≥250 (Very High)"],
          ].map(([color, label]) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 560, width: "100%", position: "relative" }}>
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          className="rounded-lg"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FixedGridOverlay
            cellEmissions={cellEmissions}
            onCellSelect={onCellSelect}
            selectedCellId={selectedCellId}
            affectedCellIds={affectedCellIds}
          />
          {/* Pass map instance to parent */}
          <MapChildRender selectedCellData={selectedCellData} showFloatingImpact={showFloatingImpact} onMapReady={setMapInstance} />
        </MapContainer>
        {/* Render FloatingChartOverlay outside MapContainer but inside relative div */}
        {showFloatingImpact && selectedCellData && mapInstance && (
          <FloatingChartOverlay map={mapInstance} selectedCellData={selectedCellData} />
        )}
      </div>
    </div>
  );
}

/**
 * MapChildRender: uses useMap() to get map instance and passes it to parent
 */
function MapChildRender({ selectedCellData, showFloatingImpact, onMapReady }: { selectedCellData?: SelectedCellMini | null; showFloatingImpact?: boolean; onMapReady?: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    if (map && onMapReady) {
      onMapReady(map);
    }
  }, [map, onMapReady]);
  return null;
}
