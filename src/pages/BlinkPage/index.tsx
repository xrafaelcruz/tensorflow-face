import { useGetElementById } from 'hooks/useGetElementById';
import { useCamera } from 'hooks/useCamera';
import { useBlinkWorker } from 'workers/blink/hook';

export const BlinkPage = () => {
  const video = useGetElementById<HTMLVideoElement>('video');
  const canvas = useGetElementById<HTMLCanvasElement>('canvas');

  useCamera(video);
  useBlinkWorker({ video, canvas });

  return (
    <div>
      <h1>Blink page</h1>

      <video 
        id="video"
        width={320} 
        height={240} 
        style={{ transform: 'scaleX(-1)' }} 
      />

      <canvas 
        id="canvas" 
        width={320} 
        height={240} 
        style={{ transform: 'scaleX(-1)' }} 
      />
    </div>
  );
}
