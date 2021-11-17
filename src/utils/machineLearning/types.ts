import { NormalizedFace } from '@tensorflow-models/blazeface';
import {
    FaceDetection,
    FaceLandmarks68,
    WithFaceDescriptor,
    WithFaceLandmarks,
} from 'face-api.js';
import { DebugInfo } from 'hdbscan';

import { Point, RawNodeDatum } from 'react-d3-tree/lib/types/common';
import { Box } from 'face-api.js/build/es6/classes';

export interface MLSyncResult {
    allFaces: FaceWithEmbedding[];
    clustersWithNoise: ClustersWithNoise;
    tree: RawNodeDatum;
    tsne: TSNEData;
}

export interface AlignedFace extends NormalizedFace {
    alignedBox: Box;
}

export declare type FaceEmbedding = Array<number>;

export declare type FaceImage = Array<Array<Array<number>>>;

export declare type FaceApiResult = WithFaceDescriptor<
    WithFaceLandmarks<
        {
            detection: FaceDetection;
        },
        FaceLandmarks68
    >
>;

export declare type FaceDescriptor = Float32Array;

export declare type ClusterFaces = Array<number>;

export interface Cluster {
    faces: ClusterFaces;
    summary?: FaceDescriptor;
}

export interface ClustersWithNoise {
    clusters: Array<Cluster>;
    noise: ClusterFaces;
}

export interface ClusteringResults {
    clusters: Array<ClusterFaces>;
    noise: ClusterFaces;
}

export interface HdbscanResults extends ClusteringResults {
    debugInfo?: DebugInfo;
}

export interface NearestCluster {
    cluster: Cluster;
    distance: number;
}

export interface FaceWithEmbedding {
    fileId: string;
    // face: FaceApiResult;
    face: AlignedFace;
    embedding: FaceEmbedding;
    faceImage: FaceImage;
}

export interface TSNEData {
    width: number;
    height: number;
    dataset: Point[];
}
