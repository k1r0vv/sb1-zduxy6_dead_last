import React from 'react';
import { PathSection } from './types';
import { MapNode } from './MapNode';
import { NodeConnection } from './NodeConnection';

interface MapSectionProps {
  paths: PathSection[];
  className?: string;
  sectionIndex: number;
  nodeTactics?: Record<string, string>;
}

export const MapSection: React.FC<MapSectionProps> = ({ 
  paths, 
  className = '',
  sectionIndex,
  nodeTactics = {}
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-3 gap-24">
        {paths.map((path, pathIndex) => (
          <div key={pathIndex} className="flex flex-col gap-8 relative">
            {path.nodes.map((nodeRow, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-8 relative">
                {nodeRow.map((node) => (
                  <div key={node.id} className="relative">
                    <MapNode
                      id={node.id}
                      type={node.type}
                      status={node.status}
                      tactic={nodeTactics[node.id]}
                    />
                    {sectionIndex === 0 && rowIndex === 0 && (
                      <NodeConnection
                        startNodeId={node.id}
                        endNodeId={(parseInt(node.id) + 9).toString()}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};