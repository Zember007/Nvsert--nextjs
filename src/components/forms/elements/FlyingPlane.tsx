import { motion } from "framer-motion";

export default function FlyingPlane() {

    const lineAnimation = {
        x: "-1000%",
        y: "1000%",
    };

    const lineTransitions = {
        duration: 2,
        repeat: Infinity,
        ease: "linear",

    }

    return (
        <div className="relative w-full overflow-hidden h-[220px] flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="absolute top-0 left-0 w-full h-full z-[-1]"
                    style={{ transform: `translate(${i * 100}%, -${i * 100}%)` }}
                >
                    <motion.div
                        className="absolute top-0 left-[0]"
                        initial={{ x: `0%`, y: `0%` }}
                        animate={lineAnimation}
                        transition={{
                            ...lineTransitions,
                            delay: 0,
                        }}
                    >
                        <svg width="87" height="53" viewBox="0 0 87 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.5" x2="98.549" y2="-0.5" transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)" stroke="url(#paint0_linear_2430_1018)" />
                            <defs>
                                <linearGradient id="paint0_linear_2430_1018" x1="0" y1="0.5" x2="98.549" y2="0.5" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white" stop-opacity="0" />
                                    <stop offset="0.495" stop-color="white" />
                                    <stop offset="1" stop-color="white" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </motion.div>

                    <motion.div
                        className="absolute top-[15%] left-[20%]"
                        initial={{ x: `0%`, y: `0%` }}
                        animate={lineAnimation}
                        transition={{
                            ...lineTransitions,
                            delay: 0.3,
                        }}
                    >
                        <svg width="87" height="53" viewBox="0 0 87 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.5" x2="98.549" y2="-0.5" transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)" stroke="url(#paint0_linear_2430_1018)" />
                            <defs>
                                <linearGradient id="paint0_linear_2430_1018" x1="0" y1="0.5" x2="98.549" y2="0.5" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white" stop-opacity="0" />
                                    <stop offset="0.495" stop-color="white" />
                                    <stop offset="1" stop-color="white" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </motion.div>

                    <motion.div
                        className="absolute top-[15%] left-[50%]"
                        initial={{ x: `0%`, y: `0%` }}
                        animate={lineAnimation}
                        transition={{
                            ...lineTransitions,
                            delay: 0.6,
                        }}
                    >
                        <svg width="87" height="53" viewBox="0 0 87 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.5" x2="98.549" y2="-0.5" transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)" stroke="url(#paint0_linear_2430_1018)" />
                            <defs>
                                <linearGradient id="paint0_linear_2430_1018" x1="0" y1="0.5" x2="98.549" y2="0.5" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white" stop-opacity="0" />
                                    <stop offset="0.495" stop-color="white" />
                                    <stop offset="1" stop-color="white" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </motion.div>

                    <motion.div
                        className="absolute bottom-0 left-[0]"
                        initial={{ x: `0%`, y: `0%` }}
                        animate={lineAnimation}
                        transition={{
                            ...lineTransitions,
                            delay: 0.9,
                        }}
                    >
                        <svg width="87" height="53" viewBox="0 0 87 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.5" x2="98.549" y2="-0.5" transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)" stroke="url(#paint0_linear_2430_1018)" />
                            <defs>
                                <linearGradient id="paint0_linear_2430_1018" x1="0" y1="0.5" x2="98.549" y2="0.5" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white" stop-opacity="0" />
                                    <stop offset="0.495" stop-color="white" />
                                    <stop offset="1" stop-color="white" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </motion.div>

                    <motion.div
                        className="absolute bottom-[15%] left-[20%]"
                        initial={{ x: `0%`, y: `0%` }}
                        animate={lineAnimation}
                        transition={{
                            ...lineTransitions,
                            delay: 1.2,
                        }}
                    >
                        <svg width="87" height="53" viewBox="0 0 87 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.5" x2="98.549" y2="-0.5" transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)" stroke="url(#paint0_linear_2430_1018)" />
                            <defs>
                                <linearGradient id="paint0_linear_2430_1018" x1="0" y1="0.5" x2="98.549" y2="0.5" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white" stop-opacity="0" />
                                    <stop offset="0.495" stop-color="white" />
                                    <stop offset="1" stop-color="white" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </motion.div>

                    <motion.div
                        className="absolute bottom-[15%] left-[50%]"
                        initial={{ x: `0%`, y: `0%` }}
                        animate={lineAnimation}
                        transition={{
                            ...lineTransitions,
                            delay: 1.5,
                        }}
                    >
                        <svg width="87" height="53" viewBox="0 0 87 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.5" x2="98.549" y2="-0.5" transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)" stroke="url(#paint0_linear_2430_1018)" />
                            <defs>
                                <linearGradient id="paint0_linear_2430_1018" x1="0" y1="0.5" x2="98.549" y2="0.5" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white" stop-opacity="0" />
                                    <stop offset="0.495" stop-color="white" />
                                    <stop offset="1" stop-color="white" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </motion.div>

                    <motion.div
                        className="absolute bottom-[50%] right-[5%]"
                        initial={{ x: `0%`, y: `0%` }}
                        animate={lineAnimation}
                        transition={{
                            ...lineTransitions,
                            delay: 1.3,
                        }}
                    >
                        <svg width="87" height="53" viewBox="0 0 87 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.5" x2="98.549" y2="-0.5" transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)" stroke="url(#paint0_linear_2430_1018)" />
                            <defs>
                                <linearGradient id="paint0_linear_2430_1018" x1="0" y1="0.5" x2="98.549" y2="0.5" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white" stop-opacity="0" />
                                    <stop offset="0.495" stop-color="white" />
                                    <stop offset="1" stop-color="white" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </motion.div>
                </div>
            ))}





            {/* Самолёт */}
            <motion.div
                initial={{ y: "0%", rotate: 0 }}
                animate={{ y: "10%", rotateX: -40 }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            >
                <svg width="165" height="165" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50.5292 97.6636L164.206 0.0678711L60.4308 71.4479L50.5292 97.6636Z" fill="url(#paint0_linear_2430_1009)" />
                    <path d="M164.206 0.0676575L40.6276 60.0055L0.0264282 36.5543L164.206 0.0676575Z" fill="url(#paint1_linear_2430_1009)" />
                    <path d="M164.206 0.0678711L60.431 71.4479L101.032 94.8991L164.206 0.0678711Z" fill="url(#paint2_linear_2430_1009)" />
                    <path d="M60.4306 71.4479L164.206 0.0678711L40.6273 60.0057L50.529 97.6636L60.4306 71.4479Z" fill="url(#paint3_linear_2430_1009)" />
                    <path opacity="0.4" d="M137.899 100.403L26.3309 125.202L52.6933 140.429L53.9208 141.134L68.6568 140.076L75.7636 153.754L94.9689 164.844L137.899 100.403Z" fill="#090A0C" />
                    <defs>
                        <linearGradient id="paint0_linear_2430_1009" x1="104.519" y1="44.4639" x2="107.37" y2="97.6635" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#34446D" />
                            <stop offset="1" stop-color="#000A25" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_2430_1009" x1="115.535" y1="94.2125" x2="75.5954" y2="2.2441" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#34446D" />
                            <stop offset="0.697295" stop-color="#4A5D8E" />
                            <stop offset="1" stop-color="#5F72A6" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_2430_1009" x1="190" y1="83.5" x2="139.265" y2="14.9139" gradientUnits="userSpaceOnUse">
                            <stop offset="0.410421" stop-color="#5F72A6" />
                            <stop offset="1" stop-color="#34446D" />
                        </linearGradient>
                        <linearGradient id="paint3_linear_2430_1009" x1="101.372" y1="31.2396" x2="102.418" y2="97.6636" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#253458" />
                            <stop offset="1" stop-color="#000831" />
                        </linearGradient>
                    </defs>
                </svg>

            </motion.div>
        </div>
    );
}
