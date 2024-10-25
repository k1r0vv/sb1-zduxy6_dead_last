export type NodeType = 'normal' | 'boss' | 'checkpoint';
export type NodeStatus = 'locked' | 'available' | 'completed';

export interface MapNode {
  id: string;
  type: NodeType;
  status: NodeStatus;
}

export interface PathSection {
  nodes: MapNode[][];
}

export interface MapSection {
  id: number;
  paths: PathSection[];
}