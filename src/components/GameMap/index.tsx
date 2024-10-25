import React from 'react';
import { mapData } from './mapData';
import { MapSection } from './MapSection';
import { Separator } from './Separator';
import { useMapSetup } from '../../hooks/useMapSetup';

export const GameMap: React.FC = () => {
  const { nodeTactics } = useMapSetup();

  return (
    <div className="p-16 scale-110 transform origin-top">
      {mapData.map((section, index) => (
        <React.Fragment key={section.id}>
          <MapSection 
            paths={section.paths} 
            className={`section-${section.id}`}
            sectionIndex={index}
            nodeTactics={nodeTactics}
          />
          {index < mapData.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};