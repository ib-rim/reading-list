
export default function Book(props) {

    const randomCoverRadius = () => {
        let randNum = Math.floor(Math.random() * 3);
        let className = 'hard-cover-3';
        if (randNum === 1) {
            className = 'hard-cover-5';
        }
        else if (randNum === 2) {
            className = 'hard-cover-7';
        }
        return className;
    }

    const randomHeight = () => {
        let randNum = Math.floor(Math.random() * 4);
        let height = '190px';
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