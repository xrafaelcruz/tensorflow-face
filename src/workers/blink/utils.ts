import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'

export const createDetector = async () => {
    try {
        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;

        const detectorConfig: faceLandmarksDetection.MediaPipeFaceMeshTfjsModelConfig = {
            runtime: 'tfjs',
            refineLandmarks: true,
            maxFaces: 1
        }
    
        const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);

        return detector;
    } catch (e) {
        console.error(e);
        throw new Error('Fail on create faceLandMarksDetection!');
    }
}