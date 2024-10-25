import React from 'react';

interface NodeConnectionProps {
  startNodeId: string;
  endNodeId: string;
}

export const NodeConnection: React.FC<NodeConnectionProps> = ({ startNodeId, endNodeId }) => {
  return (
    <div className="absolute top-1/2 left-1/2 w-24 h-0.5 bg-blue-500 transform -translate-y-1/2 rotate-45 origin-left" />
  );
};