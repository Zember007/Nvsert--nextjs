

const Docs = ({ docs }) => {
    return (
        <div className="mtp__document">
            <div className="mtp__document-header">
                <h3>Документы для скачивания</h3>
                {docs.map((doc, index) => <a  
                key={index}
                href={doc.file}
                download
                className="mtp__document-item">
                <div className="mtp__document-content">
                    <i className="icon icon--download"></i>
                    <div className="name">{ doc.title }</div>
                </div>
            </a>)}
        </div>
    </div >
    );
};

export default Docs;