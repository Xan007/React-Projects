import { useState, useEffect } from "react";
import DogBreeds from "../constants/DogBreeds.json";

import ListSelect from "./ListSelect";
import Dog from "./Dog";

import { useDogImageUrl, useDogFact } from "../hooks/dogHooks";

export default function DogSelect() {
    const [selectedBreed, setSelectedBreed] = useState({});

    const { dogImageUrl, refreshDogImage } = useDogImageUrl({breed_info: selectedBreed});
    const { dogFact, refreshDogFact }  = useDogFact();

    const subBreeds = selectedBreed.breed ? DogBreeds[selectedBreed.breed] : [];

    function handleBreed(newBreed) {
        setSelectedBreed({ breed: newBreed });
    }

    function handleSubBreed(newBreed) {
        const newSelectedBreed = { ...selectedBreed, sub_breed: newBreed };
        setSelectedBreed(newSelectedBreed);
    }

    if (subBreeds.length === 1) handleSubBreed(subBreeds[0]);

    useEffect(() => {
        refreshDogFact();
    }, [refreshDogFact, dogImageUrl]);

    return (
        <>
            <ListSelect
                labelText="Selecciona la raza"
                arrayToMap={Object.keys(DogBreeds)}
                initialValue={selectedBreed.breed}
                handleChange={handleBreed}
            ></ListSelect>

            {subBreeds.length > 0 && (
                <ListSelect
                    labelText="Selecciona la sub-raza"
                    arrayToMap={subBreeds}
                    initialValue={selectedBreed.sub_breed}
                    handleChange={handleSubBreed}
                ></ListSelect>
            )}

            {selectedBreed.breed && (
                <>
                    <Dog dogImageUrl={dogImageUrl} dogFact={dogFact}></Dog>
                    <button onClick={() => refreshDogImage()}>Actualizar</button>
                </>
            )}
        </>
    );
}
