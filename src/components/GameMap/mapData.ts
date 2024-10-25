import { MapSection, MapNode, NodeStatus } from './types';

const createNode = (id: string | number, type: MapNode['type'] = 'normal', status: NodeStatus = 'available'): MapNode => ({
  id: id.toString(),
  type,
  status
});

export const mapData: MapSection[] = [
  // Section 1 (Bottom)
  {
    id: 1,
    paths: [
      { nodes: [[createNode(1), createNode(2), createNode(3)], [createNode(10), createNode(11), createNode(12)]] },
      { nodes: [[createNode(4), createNode(5), createNode(6)], [createNode(13), createNode(14), createNode(15)]] },
      { nodes: [[createNode(7), createNode(8), createNode(9)], [createNode(16), createNode(17), createNode(18)]] }
    ]
  },
  // Section 2 (Middle)
  {
    id: 2,
    paths: [
      { nodes: [[createNode(19), createNode(20), createNode(21)], [createNode(28), createNode(29), createNode(30)]] },
      { nodes: [[createNode(22), createNode(23), createNode(24)], [createNode(31), createNode(32), createNode(33)]] },
      { nodes: [[createNode(25), createNode(26), createNode(27)], [createNode(34), createNode(35), createNode(36)]] }
    ]
  },
  // Section 3 (Islands)
  {
    id: 3,
    paths: [
      { nodes: [[createNode(37, 'checkpoint'), createNode(38, 'checkpoint'), createNode(39, 'checkpoint')]] },
      { nodes: [[createNode(40, 'checkpoint'), createNode(41, 'checkpoint'), createNode(42, 'checkpoint')]] },
      { nodes: [[createNode(43, 'checkpoint'), createNode(44, 'checkpoint'), createNode(45, 'checkpoint')]] }
    ]
  },
  // Section 4 (Boss)
  {
    id: 4,
    paths: [
      { nodes: [[createNode(46), createNode(47)]] },
      { nodes: [[createNode(48), createNode(49)]] },
      { nodes: [[createNode('boss', 'boss')]] }
    ]
  }
];