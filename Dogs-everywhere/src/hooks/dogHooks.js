import { useCallback, useState, useRef, useEffect } from "react";

import {
    getDogImageByBreed,
    getDogFact,
    getDogRandomImage,
} from "../services/dogService.js";

export function useDogImageUrl({ breed_info }) {
    const [dogImageUrl, setDogImageUrl] = useState();
    const abortControllerRef = useRef();

    const refreshDogImage = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        let retrieveFunction;

        if (breed_info && breed_info.breed !== undefined) {
            retrieveFunction = () =>
                getDogImageByBreed({
                    ...breed_info,
                    signal: controller.signal,
                });
        } else {
            retrieveFunction = () =>
                getDogRandomImage({ signal: controller.signal });
        }

        retrieveFunction().then((url) => {
            if (controller.signal.aborted) return;
            setDogImageUrl(url);
        });
    }, [breed_info]);

    useEffect(() => {
        refreshDogImage()
    }, [refreshDogImage])

    return { dogImageUrl, refreshDogImage };
}

export function useDogFact() {
    const [dogFact, setDogFact] = useState();
    const abortControllerRef = useRef();

    const refreshDogFact = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        getDogFact({ signal: controller.signal }).then((dogFact) => {
            if (controller.signal.aborted) return;
            setDogFact(dogFact);
        });
    }, []);

    return { dogFact, refreshDogFact };
}
