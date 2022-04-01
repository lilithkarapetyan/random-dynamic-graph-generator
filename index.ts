import Graph from "./src/Graph";
import { getRandomVertex, repeat } from "./src/utils";

export function createSnapshots({
  vertexCount,
  snapshotCount,
  densityIndex,
}:{
  vertexCount: number,
  snapshotCount: number,
  densityIndex: number
}) {
  const g = new Graph({ directed: false });

  const MAX_EDGE_COUNT = vertexCount * vertexCount;

  repeat(() => g.addVertex(), vertexCount);

// repeat(() => g.addEdge(getRandomVertex(VERTEX_COUNT), getRandomVertex(VERTEX_COUNT)), Math.random() * VERTEX_COUNT);

  g.takeSnapshot();

  repeat(() => {
    g.clearEdges();
    for(let i = 0; i < vertexCount; i++) {
      // if(i % densityIndex === 0)
      for(let j = 0; j < vertexCount; j++) {
        if (Math.random() * 100 <= densityIndex)
          g.addRandomEdge(i, j);
        // else
      }
        // g.removeRandomEdge(getRandomVertex(vertexCount), getRandomVertex(vertexCount));
    }
    g.takeSnapshot();
  }, snapshotCount);

  return {
    snapshots: g.getSnapshots(),
    snapshotStrings: g.snapshotsToString(),
    snapshotMatrices: g.getSnapshots(true),
  };
}

export function createFromSnapshots(snapshots: number[][][]) {
  const g = new Graph({
    data: snapshots[0],
    snapshots,
  });

  return {
    snapshots: g.getSnapshots(),
    snapshotStrings: g.snapshotsToString(),
    snapshotMatrices: g.getSnapshots(true),
  };
}
