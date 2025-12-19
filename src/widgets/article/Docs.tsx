import { useTranslation } from "react-i18next";

interface Doc {
    file: string;
    title: string;
}

interface DocsProps {
    docs: Doc[];
}

const Docs: React.FC<DocsProps> = ({ docs }) => {
    const { t } = useTranslation();

    return (
        <div className="mtp__document">
            <div className="mtp__document-header">
                <h3>{t('docs.title')}</h3>
                {docs.map((doc, index) => (
                    <a key={index} href={doc.file} download className="mtp__document-item">
                        <div className="mtp__document-content">
                            <i className="icon icon--download"></i>
                            <div className="name">{doc.title}</div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Docs;

