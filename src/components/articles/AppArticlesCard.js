import Link from "next/link";

const AppArticlesCard = ({ card }) => {
    return (
        <div className="mtp__news-item">
            <div className="mtp__news-head">
                <Link href={`/${card.full_slug}/`} className="mtp__news-link">
                    {card.title &&
                        <h5 className="mtp__news-title"
                        dangerouslySetInnerHTML={{ __html: card.title }}
                        >
                           
                        </h5>
                    }
                </Link>
            </div>
            {card.short_text &&
                <div
                    className="mtp__news-txt"
                    dangerouslySetInnerHTML={{ __html: card.short_text }}
                >                    
                </div>
            }
        </div>
    );
};

export default AppArticlesCard;