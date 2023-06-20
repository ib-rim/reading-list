
export default function Book(props) {

    return (
        <div className={`book ${props.color}`}>
            <p className="title">{props.title}</p>
            <p className="author">{props.author}</p>
        </div>
    )
}