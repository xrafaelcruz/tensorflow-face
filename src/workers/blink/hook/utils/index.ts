import { TGetVideoFrameParams } from "./types"

export const getVideoFrame = ({ video, canvas, canvasContext }: TGetVideoFrameParams) => {
    if (!video) throw new Error('video element is required!');
    if (!canvas) throw new Error('canvas element is required!');
    if (!canvasContext) throw new Error('canvasContext is required!');

    canvasContext.drawImage(video, 0, 0, video.width, video.height)
    const imageData = canvasContext.getImageData(0, 0, video.width, video.height)
    
    canvasContext.clearRect(0, 0, video.width, video.height);

    return imageData
  }
