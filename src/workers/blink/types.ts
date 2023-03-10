import { Face } from "@tensorflow-models/face-landmarks-detection";

export type TWorkerOnMessageParams = {
    data?: {
        videoFrame?: ImageData;
    }
}

export type TWorkerPostMessageData = {
    detectorIsReady?: boolean;
    faces?: Face[];
}
