import Dog from "./components/Dog";
import DogSelect from "./components/DogSelect";
import { useDogFact, useDogImageUrl } from "./hooks/dogHooks";

import "./App.css";
import { useEffect } from "react";

const randomBreed = { breed_info: {} };

export default function App() {
    const { dogImageUrl } = useDogImageUrl(randomBreed);
    const { dogFact, refreshDogFact } = useDogFact();

    useEffect(() => {
        refreshDogFact();
    }, [refreshDogFact]);

    return (
        <div className="App">
            <header>
                <h1>Dogs everywhere 🐶❣</h1>
                <br></br>
                <section>
                    <h3>Perrito aleatorio</h3>
                    <Dog dogImageUrl={dogImageUrl} dogFact={dogFact}></Dog>
                </section>
            </header>

            <main>
                <DogSelect></DogSelect>
            </main>
        </div>
    );
}
