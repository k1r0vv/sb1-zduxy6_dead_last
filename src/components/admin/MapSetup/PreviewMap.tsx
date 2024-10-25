import React from 'react';
import { MapNode } from '../../GameMap/MapNode';
import { mapData } from '../../GameMap/mapData';
import { NodeConnection } from '../../GameMap/NodeConnection';

interface PreviewMapProps {
  onNodeClick: (nodeId: string) => void;
  nodeTactics: Record<string, string>;
}

export const PreviewMap: React.FC<PreviewMapProps> = ({ onNodeClick, nodeTactics }) => {
  return (
    <div className="space-y-16">
      {mapData.map((section, sectionIndex) => (
        <div key={section.id} className="relative">
          <div className="grid grid-cols-3 gap-24">
            {section.paths.map((path, pathIndex) => (
              <div key={pathIndex} className="flex flex-col gap-8 relative">
                {path.nodes.map((nodeRow, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-8 relative">
                    {nodeRow.map((node) => (
                      <div
                        key={node.id}
                        onClick={() => onNodeClick(node.id)}
                        className="cursor-pointer relative group"
                      >
                        <MapNode
                          id={node.id}
                          type={node.type}
                          status="available"
                        />
                        {/* Node connections */}
                        {sectionIndex === 0 && rowIndex === 0 && (
                          <NodeConnection
                            startNodeId={node.id}
                            endNodeId={(parseInt(node.id) + 9).toString()}
                          />
                        )}
                        {/* Tactics tooltip */}
                        {nodeTactics[node.id] && (
                          <div className="absolute z-50 invisible group-hover:visible bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64 -top-2 left-full ml-4">
                            <p className="text-sm">{nodeTactics[node.id]}</p>
                          </div>
                        )}
                        {/* Indicator for nodes with tactics */}
                        {nodeTactics[node.id] && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full" />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full transition-all duration-200" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {sectionIndex < mapData.length - 1 && (
            <div className="flex justify-center my-8">
              <div className="w-12 h-12 border-2 border-yellow-500 bg-yellow-900/50 rotate-45 transform" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};