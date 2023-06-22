
export default function Book(props) {

    const randomCoverRadius = () => {
        let randNum = Math.floor(Math.random() * 3);
        let className = 'cover-1';
        if (randNum === 1) {
            className = 'cover-2';
        }
        else if (randNum === 2) {
            className = 'cover-3';
        }
        return className;
    }

    const randomHeight = () => {
        let randNum = Math.floor(Math.random() * 4);
        let height = '200px';
        if (randNum === 1) {
            height = '190px';
        }
        else if (randNum === 2) {
            height = '180px';
        }
        else if (randNum === 3) {
            height = '170px';
        }
        return height;
    }

    return (
        <div className={`book ${props.color} ${randomCoverRadius()}`} style={{ "--book-height": randomHeight() }}>
            <p className="title">{props.title}</p>
            <p className="author">{props.author}</p>
        </div>
    )
}