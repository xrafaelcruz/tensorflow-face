import * as tf from '@tensorflow/tfjs';

import { createDetector } from './utils'

import { TWorkerOnMessageParams, TWorkerPostMessageData } from './types';

tf.setBackend('webgl');

(async () => {
    try {
        const detector = await createDetector();

        postMessage({ detectorIsReady: true } as TWorkerPostMessageData);

        onmessage = async (params) => {
            const { data } = params as TWorkerOnMessageParams;
        
            try {
                if (!data?.videoFrame) throw new Error('videoFrame is required!');
        
                const faces = await detector.estimateFaces(data.videoFrame, { flipHorizontal: true });
        
                postMessage({ faces } as TWorkerPostMessageData);

                // @TODO - Normalizar os dados dos olhos para poder executar a função do cálculo de blink;
            } catch (e) {
                console.error(e);
            }
        }
    } catch (e) {
        console.error(e);
    }
})();

export {}