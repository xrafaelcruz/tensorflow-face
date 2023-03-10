import { useEffect, useRef, useMemo, useCallback } from 'react';

import { getVideoFrame } from './utils';

import { TWorkerPostMessageData, TWorkerOnMessageParams } from '../types';
import { TUseBlinkWorker } from './types'

export const useBlinkWorker = ({ video, canvas }: TUseBlinkWorker) => {
  const isStartedBlinkWorker = useRef(false);

  const blinkWorker = useMemo(() => {
    return new Worker(new URL('./../worker.ts', import.meta.url), { type: 'module' })
  }, []);

  const canvasContext = useMemo(() => canvas ? canvas.getContext('2d', { willReadFrequently: true }) : null, [canvas]);

  const sendVideoFrameToWorker = useCallback(() => {    
    try {
      const videoFrame = getVideoFrame({ video, canvas, canvasContext });
      blinkWorker.postMessage({ videoFrame } as TWorkerOnMessageParams);
    } catch(e) {
      console.error(e);
    }
  }, [blinkWorker, canvas, canvasContext, video]);

  useEffect(() => {
    const startBlinkWorker = () => {
      if (!window.Worker || isStartedBlinkWorker.current || !video || !canvas) return;

      isStartedBlinkWorker.current = true;

      blinkWorker.onmessage = ({ data }) => {
        const { detectorIsReady, faces } = data as TWorkerPostMessageData;

        if (detectorIsReady) {
          sendVideoFrameToWorker();
        }

        if (faces && canvasContext) {
          console.log('startBlinkWorker', faces)

          faces[0].keypoints.forEach(keypoint => {
            if (keypoint.name?.includes('right')) {
              canvasContext.fillStyle = "#0000FF";
              canvasContext.fillRect(keypoint.x, keypoint.y, 1, 1);
            } else if (keypoint.name?.includes('left')) {
              canvasContext.fillStyle = "#00FF00";
              canvasContext.fillRect(keypoint.x, keypoint.y, 1, 1);
            } else if (keypoint.name?.includes('lips')) {
              canvasContext.fillStyle = "#FF0000";
              canvasContext.fillRect(keypoint.x, keypoint.y, 1, 1);
            }

            // canvasContext.fillStyle = "#000000";
            // canvasContext.fillRect(keypoint.x, keypoint.y, 1, 1);
          })
        }
      }
    }

    startBlinkWorker();
  }, [blinkWorker, canvas, canvasContext, sendVideoFrameToWorker, video])
}
