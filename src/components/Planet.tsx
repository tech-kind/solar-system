import React from "react";
import {
  N_PLANETS,
  PlanetName,
  getPlanetColor,
  getPlanetRadius,
} from "../domain/planets";
import { useDate, useOptions } from "../context/AppContext/hooks";
import { invoke } from "@tauri-apps/api";

type Coordinates = {
  rotation: number;
};

type PlanetProps = {
  name: PlanetName;
  width: number;
  height: number;
  position: number;
};

const Planet = ({ name, width, height, position }: PlanetProps) => {
  const date = useDate();
  const { planetNames, orbitalLines } = useOptions();
  const [degrees, setDegrees] = React.useState(0);
  const centerX = React.useMemo(() => width / 2, [width]);
  const centerY = React.useMemo(() => height / 2, [height]);
  const planetRadius = React.useMemo(
    () => (height / 2 / (N_PLANETS + 1)) * position,
    [height, position]
  );
  const planetY = React.useMemo(
    () => height / 2 - planetRadius,
    [height, planetRadius]
  );
  const orbitPathId = React.useMemo(() => `orbit-path-${name}`, [name]);

  React.useEffect(() => {
    invoke<Coordinates>("rotation", { date, planet: name })
      .then((res) => setDegrees(-1 * res.rotation))
      .catch((e) => console.error(e));
  }, [date, name]);

  return (
    <g transform={`rotate(${degrees}, ${centerX}, ${centerY})`}>
      {orbitalLines && (
        <circle
          cx={centerX}
          cy={centerY}
          r={planetRadius}
          fill="transparent"
          stroke="#969696"
          strokeWidth="1px"
        />
      )}
      {planetNames && (
        <>
          <circle
            id={orbitPathId}
            cx={centerX}
            cy={centerY}
            r={planetRadius + 2}
            fill="transparent"
            stroke="transparent"
          />
          <text fill="#969696">
            <textPath href={`#${orbitPathId}`} fontSize={12}>
              {name}
            </textPath>
          </text>
        </>
      )}
      <circle
        cx={centerX}
        cy={planetY}
        r={getPlanetRadius(name)}
        fill={getPlanetColor(name)}
      />
      {name === "Saturn" && (
        <circle
          cx={centerX}
          cy={planetY}
          r="10"
          fill="transparent"
          stroke={getPlanetColor(name)}
          strokeWidth="4px"
          strokeOpacity="50%"
        />
      )}
    </g>
  );
};

export default Planet;
