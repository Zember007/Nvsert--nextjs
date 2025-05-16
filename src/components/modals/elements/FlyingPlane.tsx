import { motion } from "framer-motion";

export default function FlyingPlane() {

    const lineAnimation = {
        x: "-400px",
        y: "200px",
    };

    const lineTransitions = {
        duration: 2,
        repeat: Infinity,
        ease: "linear",

    }



    return (
        <div className="relative w-full overflow-hidden h-[213px] flex items-center justify-center">


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
                <svg width="387" height="216" viewBox="0 0 387 216" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M161.53 134.664L275.207 37.068L171.431 108.448L161.53 134.664Z" fill="url(#paint2_linear_2834_2031)" />
                    <path d="M275.207 37.068L151.628 97.0058L111.027 73.5546L275.207 37.068Z" fill="url(#paint3_linear_2834_2031)" />
                    <path d="M275.206 37.068L171.431 108.448L212.032 131.899L275.206 37.068Z" fill="url(#paint4_linear_2834_2031)" />
                    <path d="M171.431 108.448L275.206 37.068L151.627 97.0058L161.529 134.664L171.431 108.448Z" fill="url(#paint5_linear_2834_2031)" />
                    <path opacity="0.4" d="M248.9 137.403L137.331 162.202L163.694 177.429L164.921 178.134L179.657 177.076L186.764 190.754L205.969 201.844L248.9 137.403Z" fill="#090A0C" />
                    <path d="M157.743 104.934L156.037 98.0931L156.622 97.8081L162.136 101.648L161.929 101.749L160.477 95.9275L161.17 95.59L162.875 102.431L162.3 102.711L156.786 98.8708L156.983 98.7743L158.435 104.596L157.743 104.934Z" fill="#C5C5C5" />
                    <path d="M166.363 100.729L161.898 95.2346L162.698 94.8444L166.698 99.8479L166.419 99.9838L167.345 92.578L168.118 92.201L167.046 100.396L166.363 100.729Z" fill="#C5C5C5" />
                    <path d="M172.546 97.8117C172.037 98.0601 171.564 98.211 171.127 98.2645C170.69 98.318 170.288 98.2852 169.923 98.1661L170.033 97.3942C170.284 97.4601 170.529 97.5001 170.768 97.5143C171.011 97.519 171.263 97.4906 171.523 97.429C171.782 97.3609 172.064 97.2524 172.369 97.1033C172.903 96.8432 173.272 96.5436 173.476 96.2045C173.68 95.8654 173.738 95.5179 173.65 95.1621C173.574 94.8581 173.426 94.6691 173.206 94.595C172.986 94.521 172.639 94.545 172.165 94.6672L171.171 94.9237C170.557 95.0778 170.07 95.0795 169.71 94.9287C169.356 94.7749 169.117 94.449 168.993 93.9509C168.891 93.5434 168.898 93.1409 169.014 92.7433C169.136 92.3429 169.353 91.9723 169.664 91.6317C169.976 91.2911 170.366 91.0068 170.833 90.7789C171.282 90.5597 171.711 90.4339 172.12 90.4015C172.527 90.3626 172.897 90.4179 173.23 90.5675L173.124 91.3156C172.775 91.1813 172.43 91.1319 172.089 91.1674C171.753 91.1936 171.39 91.3016 171 91.4916C170.509 91.7312 170.149 92.0376 169.919 92.4108C169.694 92.7745 169.631 93.1537 169.729 93.5483C169.808 93.8653 169.96 94.0705 170.185 94.1639C170.408 94.2509 170.738 94.2388 171.174 94.1277L172.177 93.8668C172.822 93.7046 173.323 93.6892 173.678 93.8206C174.033 93.952 174.272 94.2635 174.395 94.7551C174.488 95.1303 174.476 95.5102 174.356 95.8948C174.243 96.2765 174.033 96.6329 173.726 96.9641C173.419 97.2953 173.025 97.5779 172.546 97.8117Z" fill="#C5C5C5" />
                    <path d="M175.967 96.0452L174.262 89.2046L178.306 87.2319L178.471 87.8917L175.154 89.5093L175.747 91.8865L178.866 90.3654L179.032 91.0349L175.914 92.556L176.528 95.0206L179.845 93.403L180.012 94.0725L175.967 96.0452Z" fill="#C5C5C5" />
                    <path d="M181.161 93.5119L179.456 86.6713L182.044 85.4088C182.709 85.0844 183.267 85.0045 183.718 85.169C184.168 85.3271 184.468 85.7102 184.62 86.3182C184.72 86.7193 184.721 87.1031 184.624 87.4695C184.532 87.8266 184.355 88.1525 184.092 88.4474C183.836 88.7394 183.51 88.9819 183.114 89.1747L183.244 88.9697L183.424 88.882C183.67 88.7622 183.905 88.7202 184.129 88.7561C184.359 88.789 184.568 88.9297 184.758 89.1782L186.23 91.0394L185.412 91.4384L183.986 89.5984C183.811 89.357 183.612 89.2439 183.387 89.2592C183.161 89.268 182.895 89.3469 182.589 89.496L181.169 90.1886L181.907 93.148L181.161 93.5119ZM181.012 89.5579L182.747 88.7119C183.226 88.4781 183.561 88.1913 183.752 87.8515C183.947 87.5024 183.992 87.1176 183.888 86.6971C183.783 86.2767 183.577 86.0178 183.271 85.9206C182.97 85.8205 182.58 85.8874 182.101 86.1212L180.366 86.9672L181.012 89.5579Z" fill="#C5C5C5" />
                    <path d="M188.656 89.8565L187.119 83.6951L184.882 84.7867L184.712 84.1075L189.925 81.5649L190.095 82.2441L187.865 83.3313L189.402 89.4926L188.656 89.8565Z" fill="#C5C5C5" />
                    <defs>

                        <linearGradient id="paint2_linear_2834_2031" x1="215.52" y1="81.464" x2="218.37" y2="134.664" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#34446D" />
                            <stop offset="1" stop-color="#000A25" />
                        </linearGradient>
                        <linearGradient id="paint3_linear_2834_2031" x1="226.535" y1="131.213" x2="186.596" y2="39.2444" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#34446D" />
                            <stop offset="0.697295" stop-color="#4A5D8E" />
                            <stop offset="1" stop-color="#5F72A6" />
                        </linearGradient>
                        <linearGradient id="paint4_linear_2834_2031" x1="301" y1="120.5" x2="250.265" y2="51.914" gradientUnits="userSpaceOnUse">
                            <stop offset="0.410421" stop-color="#5F72A6" />
                            <stop offset="1" stop-color="#34446D" />
                        </linearGradient>
                        <linearGradient id="paint5_linear_2834_2031" x1="212.372" y1="68.2397" x2="213.417" y2="134.664" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#253458" />
                            <stop offset="1" stop-color="#000831" />
                        </linearGradient>



                    </defs>
                </svg>


            </motion.div>

        </div>
    );
}
