import "./Dog.css";

export default function Dog({ dogImageUrl, dogFact }) {
    return (
        <figure className="dogFigure">
            <img src={dogImageUrl} alt="Imagen de un perro"></img>
            <figcaption>{dogFact}</figcaption>
        </figure>
    );
}
