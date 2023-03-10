import { useEffect } from "react"

export const useCamera = (video?: HTMLVideoElement | null) => {
    useEffect(() => {
        const startCamera = async () => {
            if (!video || (video && !!video.srcObject)) return;

            try {
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    throw new Error('Browser API navigator.mediaDevices.getUserMedia not available!');
                }
            
                const stream = await navigator.mediaDevices.getUserMedia({ video: true })
                video.srcObject = stream;
                video.play();
            } catch (e) {
                console.error(e);
            }
        }

        startCamera();
    }, [video])
}