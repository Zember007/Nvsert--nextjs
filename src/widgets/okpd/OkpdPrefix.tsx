import React from 'react';

type OkpdPrefixState = 'default' | 'active' | 'ancestor';

const BLUE = '#34446D';
const GREY = '#93969D';

const OkpdPrefix = ({
    position,
    hasChild = true,
    expanded = false,
    state = 'default',
}: {
    position: 'middle' | 'bottom';
    hasChild?: boolean;
    expanded?: boolean;
    state?: OkpdPrefixState;
}) => {
    const showTriangle = hasChild && expanded;

    const splitAt =
        position === 'middle'
            ? 'calc(50% - 3px)'
            : 'calc(100% - 3px)'; // примерно перед кончиком треугольника

    const lineStyle: React.CSSProperties =
        state === 'ancestor'
            ? {
                  backgroundImage: `linear-gradient(to bottom, ${BLUE} 0%, ${BLUE} ${splitAt}, ${GREY} ${splitAt}, ${GREY} 100%)`,
              }
            : {
                  backgroundColor: state === 'active' ? BLUE : GREY,
              };

    const triangleFill = state === 'active' || state === 'ancestor' ? BLUE : GREY;
    const dashStroke = state === 'active' ? BLUE : GREY;

    return (
        <>
            {hasChild ? (
                <span aria-hidden className="absolute left-0 top-0 bottom-0 z-10">
                    {/* вертикальная линия */}
                    <span className="absolute left-0 top-0 bottom-0 w-[1px]" style={lineStyle} />

                    {/* треугольник появляется только при раскрытии */}
                    {showTriangle && (
                        <svg
                            className={`absolute left-0 ${
                                position === 'middle' ? 'top-1/2 -translate-y-1/2' : 'bottom-0'
                            }`}
                            width="5"
                            height="6"
                            viewBox="0 0 5 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 2.88672L0 -3.26633e-05V5.77347L5 2.88672ZM0 2.88672V3.38672H0.5V2.88672V2.38672H0V2.88672Z"
                                fill={triangleFill}
                            />
                        </svg>
                    )}
                </span>
            ) : (
                <span className="absolute top-0 left-0 h-[20px] z-10 flex items-center">
                    <svg width="4" height="1" viewBox="0 0 4 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="0.5" x2="4" y2="0.5" stroke={dashStroke} />
                    </svg>
                </span>
            )}
        </>
    );
};

export default OkpdPrefix;