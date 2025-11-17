
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Mapping of region names to coat of arms files
const coatOfArmsMapping: { [key: string]: string } = {
    'Калининградская область': '/gerbs/Kaliningrad_Oblast.svg',
    'Московская область': '/gerbs/Moscow_Oblast_(large).svg',
    'Москва': '/gerbs/Moscow.svg',
    'Калужская область': '/gerbs/Kaluga_Oblast.svg',
    'Орловская область': '/gerbs/Oryol_Oblast.svg',
    'Владимирская область': '/gerbs/Vladimiri_Oblast.svg',
    'Тульская область': '/gerbs/Tula_Oblast_(large).svg',
    'Тамбовская область': '/gerbs/Tambov_Oblast.svg',
    'Костромская область': '/gerbs/Kostroma_Oblast.svg',
    'Ивановская область': '/gerbs/Ivanovo_Oblast.svg',
    'Рязанская область': '/gerbs/Ryazan_Oblast.svg',
    'Липецкая область': '/gerbs/Lipetsk_oblast.svg',
    'Ростовская область': '/gerbs/Rostov_Oblast.svg',
    'Республика Калмыкия': '/gerbs/Kalmykia.svg',
    'Краснодарский край': '/gerbs/Krasnodar_Krai.svg',
    'Республика Адыгея': '/gerbs/Adygea.svg',
    'Воронежская область': '/gerbs/Voronezh_Oblast.svg',
    'Пензенская область': '/gerbs/Penza_Oblast.svg',
    'Нижегородская область': '/gerbs/Nizhny_Novgorod_Region.svg',
    'Республика Мордовия': '/gerbs/Mordovia.svg',
    'Чувашская Республика': '/gerbs/Chuvashia.svg',
    'Республика Марий Эл': '/gerbs/Mari_El.svg',
    'Удмуртская Республика': '/gerbs/Udmurtia.svg',
    'Республика Татарстан': '/gerbs/Tatarstan.svg',
    'Волгоградская область': '/gerbs/Volgograd_oblast.svg',
    'Ульяновская область': '/gerbs/Ulyanovskaya oblast.svg',
    'Саратовская область': '/gerbs/Saratov_oblast.svg',
    'Ярославская область': '/gerbs/Yaroslavl_Oblast.svg',
    'Тверская область': '/gerbs/Tver_oblast.svg',
    'Новгородская область': '/gerbs/Novgorod_Oblast.svg',
    'Ленинградская область': '/gerbs/Leningrad_Oblast.svg',
    'Санкт-Петербург': '/gerbs/Saint_Petersburg.svg',
    'Республика Крым': '/gerbs/Crimea.svg',
    'Севастополь': '/gerbs/Sevastopol.svg',
    'Белгородская область': '/gerbs/Belgorod_Oblast.svg',
    'Курская область': '/gerbs/Kursk_oblast.svg',
    'Смоленская область': '/gerbs/Smolensk_oblast.svg',
    'Брянская область': '/gerbs/Bryansk_Oblast.svg',
    'Кировская область': '/gerbs/Kirov_Region.svg',
    'Вологодская область': '/gerbs/Vologda_oblast.svg',
    'Псковская область': '/gerbs/Pskov_Oblast_(2018).svg',
    'Ставропольский край': '/gerbs/Stavropol_Krai.svg',
    'Карачаево-Черкесская Республика': '/gerbs/Karachay-Cherkessia.svg',
    'Кабардино-Балкарская Республика': '/gerbs/Kabardino-Balkaria.svg',
    'Республика Северная Осетия - Алания': '/gerbs/Ossetien.svg',
    'Республика Ингушетия': '/gerbs/Ingushetia.svg',
    'Чеченская Республика': '/gerbs/Chechnya.svg',
    'Республика Дагестан': '/gerbs/Dagestan.svg',
    'Астраханская область': '/gerbs/Astrakhan_Oblast.svg',
    'Луганская Народная Республика': '/gerbs/Lugansk_People\'s_Republic.svg',
    'Донецкая Народная Республика': '/gerbs/Donetsk_People\'s_Republic.svg',
    'Запорожская область': '/gerbs/Zaporozhskaja_oblaste_2023.svg',
    'Херсонская область': '/gerbs/Kherson_region.svg',
    'Пермский край': '/gerbs/Perm_Krai.svg',
    'Самарская область': '/gerbs/Samara_Oblast.svg',
    'Республика Башкортостан': '/gerbs/Bashkortostan.svg',
    'Оренбургская область': '/gerbs/Orenburg_Oblast.svg',
    'Челябинская область': '/gerbs/Chelyabinsk_Oblast.svg',
    'Свердловская область': '/gerbs/Sverdlovsk_oblast.svg',
    'Архангельская область': '/gerbs/Arkhangelsk_oblast.svg',
    'Республика Карелия': '/gerbs/Republic_of_Karelia.svg',
    'Мурманская область': '/gerbs/Murmanskaya oblast.svg',
    'Республика Коми': '/gerbs/Komi_Republic.svg',
    'Курганская область': '/gerbs/Kurgan_Oblast.svg',
    'Тюменская область': '/gerbs/Tyumen_Oblast.svg',
    'Ханты-Мансийский автономный округ - Югра': '/gerbs/Yugra_(Khanty-Mansia).svg',
    'Омская область': '/gerbs/Omsk_Oblast.svg',
    'Ямало-Ненецкий автономный округ': '/gerbs/Yamal_Nenetsia.svg',
    'Ненецкий авт. округ': '/gerbs/Nenets_Autonomous_Okrug.svg',
    'Новосибирская область': '/gerbs/Novosibirsk_oblast.svg',
    'Кемеровская область': '/gerbs/Kemerovo_Oblast.svg',
    'Томская область': '/gerbs/Tomsk_Oblast.svg',
    'Алтайский край': '/gerbs/Altai_Krai.svg',
    'Республика Алтай': '/gerbs/Altai_Republic.svg',
    'Республика Хакасия': '/gerbs/Khakassia.svg',
    'Республика Тыва': '/gerbs/Tuva.svg',
    'Красноярский край': '/gerbs/Krasnoyarsk_Krai.svg',
    'Республика Саха (Якутия)': '/gerbs/Sakha_(Yakutia).svg',
    'Магаданская область': '/gerbs/Magadan_oblast.svg',
    'Чукотский автономный округ': '/gerbs/Chukotka.svg',
    'Камчатский край': '/gerbs/Kamchatka_Krai.svg',
    'Приморский край': '/gerbs/Primorsky_Krai.svg',
    'Хабаровский край': '/gerbs/Khabarovsk_Krai.svg',
    'Амурская область': '/gerbs/Amur_Oblast.svg',
    'Сахалинская область': '/gerbs/Sakhalin_Oblast.svg',
    'Еврейская автономная область': '/gerbs/Jewish_Autonomous_Oblast.svg',
    'Забайкальский край': '/gerbs/Zabaykalsky_Krai.svg',
    'Иркутская область': '/gerbs/Irkutsk_Oblast.svg',
    'Республика Бурятия': '/gerbs/Buryatia.svg'
};

const Map = () => {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [anchorRect, setAnchorRect] = useState<{ left: number; right: number; top: number; bottom: number } | null>(null);

    const handleMouseEnter = (event: React.MouseEvent) => {
        setHoveredRegion(event.currentTarget.id);
        const rect = event.currentTarget.getBoundingClientRect();
        setAnchorRect({ left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom });

        // Set a provisional position; will be corrected in effect after measuring tooltip size
        const provisionalX = rect.left + rect.width / 2;
        const provisionalY = rect.top - 50;
        setMousePosition({ x: provisionalX, y: provisionalY });
    };

    const handleTouchStart = (event: React.TouchEvent) => {
        setHoveredRegion(event.currentTarget.id);
        const rect = event.currentTarget.getBoundingClientRect();
        setAnchorRect({ left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom });

        const provisionalX = rect.left + rect.width / 2;
        const provisionalY = rect.top - 50;
        setMousePosition({ x: provisionalX, y: provisionalY });
    };

    useEffect(() => {
        if (!hoveredRegion || !anchorRect) return;
        const tooltipBox = tooltipRef.current?.getBoundingClientRect();
        const containerBox = containerRef.current?.getBoundingClientRect();
        if (!tooltipBox || !containerBox) return;

        const padding = 12;
        const offsetAbove = 8; // small gap from the anchor when above
        const offsetBelow = 8; // small gap from the anchor when below

        const anchorCenterX = (anchorRect.left + anchorRect.right) / 2;

        // Horizontal clamping using actual tooltip width and container bounds
        let left = anchorCenterX - tooltipBox.width / 2;
        const containerLeft = containerBox.left;
        const containerRight = containerBox.right;
        left = Math.max(containerLeft, Math.min(left, containerRight - tooltipBox.width));

        // Prefer above if space allows; otherwise below; clamp vertically too using container bounds
        const preferAboveTop = anchorRect.top - offsetAbove - tooltipBox.height;
        const containerTop = containerBox.top;
        const containerBottom = containerBox.bottom;
        const hasSpaceAbove = preferAboveTop >= containerTop + padding;
        let top: number;
        if (hasSpaceAbove) {
            top = preferAboveTop;
            // Ensure it doesn't go off the top of container
            top = Math.max(top, containerTop + padding);
        } else {
            top = anchorRect.bottom + offsetBelow;
            // Ensure it doesn't go off the bottom of container
            top = Math.min(top, containerBottom - padding - tooltipBox.height);
        }

        setMousePosition({ x: left, y: top });
    }, [hoveredRegion, anchorRect]);

    const handleMouseLeave = () => {
        setHoveredRegion(null);
    };

    // Скрывать tooltip при скролле или других действиях
    useEffect(() => {
        const handleScroll = () => {
            if (hoveredRegion) {
                setHoveredRegion(null);
            }
        };

        const handleResize = () => {
            if (hoveredRegion) {
                setHoveredRegion(null);
            }
        };

        const handleClick = () => {
            if (hoveredRegion) {
                setHoveredRegion(null);
            }
        };

        const handleTouchStart = () => {
            if (hoveredRegion) {
                setHoveredRegion(null);
            }
        };

        // Добавляем обработчики событий
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleResize);
        window.addEventListener('click', handleClick);
        window.addEventListener('touchstart', handleTouchStart);

        // Очистка при размонтировании
        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('touchstart', handleTouchStart);
        };
    }, [hoveredRegion]);

    return (
        <div ref={containerRef} className="relative max-w-full">
            {hoveredRegion && (
                <div
                    ref={tooltipRef}
                    className="px-[20px] py-[10px] fixed backdrop-blur-[7.85px] border-[#34446d] border rounded-[4px] pointer-events-none z-10"
                    style={{
                        left: mousePosition.x,
                        top: mousePosition.y
                    }}
                >
                    <div className="flex items-center gap-3">
                        {coatOfArmsMapping[hoveredRegion] && (
                            <div className="w-[30px] h-[30px] flex-shrink-0">
                                <Image
                                    src={coatOfArmsMapping[hoveredRegion]}
                                    alt={`Герб ${hoveredRegion}`}
                                    width={30}
                                    height={30}
                                    className="h-full w-full"
                                />
                            </div>
                        )}
                        <span className="text-1 !font-light whitespace-nowrap">{hoveredRegion}</span>
                    </div>
                </div>
            )}

            <svg
                className={`map-company max-w-full `}
                viewBox="0 0 1072 603"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="crispEdges">

                <path
                    id='Калининградская область'
                    d="M72.702 163.918L68.0351 154.16L66.338 153.312L61.6711 146.948L58.2769 146.523L55.7313 148.645L54.8828 152.463L64.2167 168.585L72.702 163.918Z"
                    fill="#93969D"
                    fillOpacity="0.15"
                    strokeWidth="0.5"
                    stroke="black"
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    className="cursor-pointer hover:fillOpacity-30 transition-all duration-200"
                />
                <path
                    id='Московская область'
                    d="M160.771 274.652L158.718 277.198L156.891 277.622L155.021 275.501H153.987L153.378 277.622L151.735 276.773L148.596 277.198L146.395 278.47L143.931 275.501L142.288 276.773V278.47L139.413 277.48L138.591 277.198L139.002 274.652L141.466 273.379V270.834V267.439L142.288 266.167H139.413L139.823 264.045L139.002 262.631L138.591 261.924L141.877 259.378L141.466 256.409L140.645 252.59L137.77 252.166L135.254 246.226L134.895 245.378L140.645 241.559L143.109 237.741L146.806 236.892L149.681 234.347L150.913 235.195L150.503 239.862L157.075 242.408L157.485 245.378L160.361 242.408L161.593 244.529H165.7L165.152 247.923L164.879 250.469L165.152 252.166L163.236 253.439L158.307 260.227L159.539 262.773V268.288L162.414 269.137V271.258L160.771 274.652Z"
                    fill="#93969D"
                    fillOpacity="0.15"
                    strokeWidth="0.5"
                    stroke="black"
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    className="cursor-pointer hover:fillOpacity-30 transition-all duration-200"
                />
                <path
                    id='Москва'
                    d="M143.521 258.53L141.878 259.378L141.467 256.408H143.11L144.753 253.014L145.574 255.56L146.806 253.863L148.596 254.711L152.968 253.014L153.378 255.56L151.735 258.53H146.806L144.342 259.802L143.521 258.53Z"
                    fill="#93969D"
                    fillOpacity="0.15"
                    strokeWidth="0.5"
                    stroke="black"
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    className="cursor-pointer hover:fillOpacity-30 transition-all duration-200"
                />
                <path
                    id='Калужская область'
                    d="M141.876 259.379L138.59 261.924L139 262.631L135.252 264.045V261.924L133.669 262.773L132.027 265.318L126.276 260.651L125.044 262.773H121.347L119.294 265.318L113.954 262.254L111.9 261.076L110.668 255.56L113.543 254.712L114.775 249.62L112.722 248.348L113.954 246.226L113.543 242.917L117.24 242.408L119.704 239.862L122.99 246.226L125.044 244.529L127.919 246.651L128.741 245.378L131.616 246.651L135.252 246.226L137.768 252.166L140.643 252.59L141.465 256.409L141.876 259.379Z"
                    fill="#93969D"
                    fillOpacity="0.15"
                    strokeWidth="0.5"
                    stroke="black"
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    className="cursor-pointer hover:fillOpacity-30 transition-all duration-200"
                />
                <path
                    id='Орловская область'
                    d="M119.293 270.833V265.318L113.953 262.253H111.078L110.256 265.318L108.203 264.893L106.149 263.621L105.327 266.166L102.863 268.287L100.398 267.863L101.001 270.409L104.095 272.53L102.452 275.5L107.381 278.894L106.56 283.985L107.381 287.804V291.622H109.024V293.743L111.215 292.895L112.31 292.471L115.185 293.743L116.828 287.379H119.293L122.168 284.41L122.989 280.591L122.578 278.47L119.293 274.227L120.525 271.682L119.293 270.833Z"
                    fill="#93969D"
                    fillOpacity="0.15"
                    strokeWidth="0.5"
                    stroke="black"
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    className="cursor-pointer hover:fillOpacity-30 transition-all duration-200"
                />
                <path
                    id='Владимирская область'
                    d="M167.752 259.379L165.698 255.56L165.15 252.166L163.234 253.439L158.305 260.227L159.537 262.773V268.288L162.412 269.137V271.258L160.769 274.652L158.715 277.198V281.679L161.18 282.713L160.769 285.259H162.412L164.055 289.077H168.162L169.745 286.107H175.145H181.762L180.114 283.986L181.762 281.679L181.306 279.319L178.431 278.471L180.114 276.349L174.734 270.409L175.145 267.44L169.745 265.743L170.627 261.924L172.27 261.076L172.681 259.379L170.627 257.399L167.752 259.379Z"
                    fill="#93969D"
                    fillOpacity="0.15"
                    strokeWidth="0.5"
                    stroke="black"
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    className="cursor-pointer hover:fillOpacity-30 transition-all duration-200"
                />
                <path
                    id='Тульская область'
                    d="M139 274.652L138.589 277.197L139.411 277.48L138.589 279.743L136.955 280.591L136.544 282.713H135.252V285.258L132.847 286.319L132.026 285.683L130.383 286.955L128.74 286.107L127.097 288.652L126.276 290.35L122.99 288.652L124.222 286.955L122.168 284.41L122.99 280.591L122.579 278.47L119.293 274.227L120.525 271.682L119.293 270.833V265.318L121.347 262.772H125.043L126.276 260.651L132.026 265.318L133.669 262.772L135.252 261.924V264.045L139 262.631L139.821 264.045L139.411 266.166H142.286L141.464 267.439V270.833V273.379L139 274.652Z"
                    fill="#93969D"
                    fillOpacity="0.15"
                    strokeWidth="0.5"
                    stroke="black"
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    className="cursor-pointer hover:fillOpacity-30 transition-all duration-200"
                />
                <path
                    id='Тамбовская область'
                    d="M136.947 329.382L130.376 332.675L127.098 322.594H125.455L123.812 320.048L125.455 318.775L123.812 315.381L126.277 313.684H127.92V310.29L127.098 309.017L127.92 308.593V303.926L129.563 302.229L131.206 303.077L137.162 297.138L137.778 298.41L141.064 298.835L143.117 304.35L145.171 303.926L147.225 301.38L150.002 303.926C149.575 303.936 149.107 303.935 148.595 303.926L151.191 305.186L148.595 308.593V312.411L146.805 318.775V325.988L142.698 326.836L136.947 329.382Z"
                    fill="#93969D"
                    fillOpacity="0.15"
                    strokeWidth="0.5"
                    stroke="black"
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    className="cursor-pointer hover:fillOpacity-30 transition-all duration-200"
                />


                <path

                    id='Костромская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M233.881 280.592V275.5L237.167 272.89L233.881 268.712L231.006 270.834L230.184 269.561L227.309 270.834L222.791 266.167L218.549 259.803L216.63 254.711L212.53 253.439V250.469L210.879 248.347L212.53 246.226H210.879L208.826 249.196L205.616 247.499L204.718 246.226L200.2 249.196H197.736L195.682 252.59L190.342 253.439L185.413 255.56L180.484 258.53L183.77 260.227L184.181 261.924H186.235L188.699 264.045L191.514 261.381L192.396 266.591L196.914 268.712L193.628 271.258V273.803H196.914L198.98 275.925L198.146 277.622L202.664 279.319L205.616 280.592L210.879 276.773L212.53 277.622V283.986L215.397 282.289L218.549 285.259L219.916 283.986L223.318 282.289L226.077 280.592L230.184 282.289L233.881 280.592Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Ивановская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M177.61 256.833H171.449L170.628 257.398L172.681 259.378L172.271 261.075L170.628 261.924L169.746 265.742L175.146 267.439L174.735 270.409L180.115 276.349L178.432 278.47L181.307 279.319L181.763 281.678L182.539 280.591L184.182 282.289L185.414 280.591L186.236 278.47L191.515 280.591H193.629L194.631 279.319L198.147 277.622L198.981 275.925L196.915 273.803H193.629V271.258L196.915 268.712L192.397 266.591L191.515 261.381L188.7 264.045L186.236 261.924H184.182L183.771 260.227L180.485 258.53L177.61 256.833Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Рязанская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M156.891 295.865H157.72C158.962 298.13 160.172 298.964 163.236 299.194V297.562L165.7 295.017L164.057 292.895V289.077L162.414 285.259H160.771L161.182 282.713L158.718 281.678V277.198L156.891 277.622L155.021 275.5H153.987L153.378 277.622L151.735 276.773L148.596 277.198L146.395 278.47L143.931 275.5L142.288 276.773V278.47L139.413 277.48L138.591 279.743L136.957 280.592L136.546 282.713H135.254V285.259L132.85 286.319L133.671 286.956L132.85 290.35L134.903 292.471L136.957 291.623L137.779 293.744L136.546 295.865L137.162 297.138L137.779 298.411L141.064 298.835L143.118 304.351L145.172 303.926L147.226 301.381L150.003 303.926C152.474 303.866 153.587 303.41 153.987 301.805C157.171 301.225 157.468 299.642 156.891 295.865Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Липецкая область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M124.22 286.955L122.166 284.41L119.291 287.38H116.826L115.183 293.744L112.308 292.471L111.213 292.895L109.844 295.865L113.13 298.835H114.362L114.773 300.532H116.005V304.35L118.469 303.926L119.291 306.047L118.88 309.441L121.755 311.138L123.809 315.381L126.273 313.684H127.916V310.29L127.095 309.017L127.916 308.593V303.926L129.559 302.229L131.202 303.077L137.158 297.138L136.542 295.865L137.774 293.744L136.953 291.622L134.899 292.471L132.845 290.349L133.667 286.955L132.845 286.319L132.024 285.682L130.381 286.955L128.738 286.107L127.095 288.652L126.273 290.349L122.987 288.652L124.22 286.955Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Ростовская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M93.8716 386.658H95.9453L92.6273 383.688L93.8716 381.143L92.1831 380.719L94.6476 374.779L93.8716 371.385L91.3617 367.991L94.6476 365.869L95.4691 363.748L100.922 365.869L103.825 365.021L105.327 361.202L104.505 359.929L105.327 357.808L103.825 355.687L109.845 349.747L109.434 343.807L110.667 340.413L105.738 339.989L102.041 342.11L97.5228 337.443H95.4357C95.875 338.247 95.0929 338.512 93.449 338.716V341.686H88.0574L87.2279 339.989H86.8132L85.9837 342.959C85.1542 343.1 86.313 343.383 85.9812 343.383C85.6494 343.383 85.5665 345.929 85.5665 347.201H83.4927L83.078 350.596C79.9909 350.19 78.8669 351.009 77.2716 353.141L71.4652 345.929H67.3178C65.5484 343.701 64.0368 344.598 61.0966 347.201L58.1934 347.626L57.364 349.747H62.7556V353.141L66.4844 354.414V358.232L58.1934 353.99L58.6082 357.808L56.9492 358.657L60.2672 360.354V362.475L63.1704 362.899L66.4844 367.142L63.1704 373.082V375.203L66.8991 378.597L66.4844 383.264L69.8023 379.87L71.2353 382.84L77.2716 378.173L79.4502 382.416L80.6824 392.174L86.4328 393.022L91.3617 390.901L95.9453 391.749L96.36 389.628L93.8716 390.052V386.658Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Республика Калмыкия'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M103.828 429.085C98.2069 429.828 100.506 432.055 103.411 432.903L105.693 434.812L100.398 440.54L93.8718 441.813L92.4115 440.116L90.9511 438.419V434.812L85.5745 429.085L86.433 426.115L81.427 413.387L83.086 407.023L80.6826 402.356L81.0123 398.962L79.7681 395.144C76.1577 395.296 74.5358 395.043 73.7 393.022L74.3764 391.325L73.7 390.052L71.2355 392.174V389.628L69.8025 387.082C69.1996 387.873 67.9496 386.658 67.9496 386.658C67.9496 386.658 65.9565 385.166 65.8216 384.113C65.7756 383.753 65.9457 383.445 66.4846 383.264L69.8025 379.87L71.2355 382.84L77.2718 378.173L79.4504 382.416L80.6826 392.174L86.433 393.022L91.3619 390.901L95.9455 391.749L96.3602 389.628L93.8718 390.052V386.658H95.9455L96.3602 384.961H100.922L102.167 386.658H103.826L105.899 384.113H107.144V388.78L112.95 388.355V395.144H114.194V397.265L112.95 398.113L112.123 404.053L113.779 406.174L118.756 407.023L117.927 409.144L112.95 409.569V417.63C115.004 420.022 114.867 421.06 113.779 422.721H109.22V421.448C105.485 418.054 102.581 420.599 107.144 423.145C106.432 426.551 105.746 427.948 103.828 429.085Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Краснодарский край'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M66.9001 378.597L66.4853 383.264C65.9464 383.445 65.7764 383.753 65.8223 384.113H65.0751V387.082L62.6107 386.658L61.3785 384.961H60.1462L59.3248 387.931L57.6818 390.901L59.3248 393.446L58.5033 395.568L58.914 400.659H54.8066V406.174L53.1636 405.75L52.7529 408.296L49.467 409.569L47.0025 408.296L47.824 407.023L45.3596 402.356L43.7166 404.053H42.0736L37.9662 407.447L37.1447 405.75L34.6803 401.507L32.6266 402.356L33.0373 384.113L31.3943 377.324L32.6266 370.536L30.5728 369.263V364.596L31.8051 359.929L30.1621 355.687L32.6266 356.959L34.2695 356.535L37.1447 360.354L39.6092 358.657L43.7166 359.081L47.0025 357.808L47.824 358.657L51.5207 356.959V353.99L49.8777 353.141L52.3422 348.898L53.1636 350.596L56.4496 352.293L56.8603 355.262L58.1944 353.99L58.6091 357.808L56.9502 358.657L60.2681 360.354V362.475L63.1713 362.899L66.4853 367.142L63.1713 373.082V375.203L66.9001 378.597Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Республика Адыгея'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M50.29 392.174L47.8256 398.113L47.0041 396.416L48.2363 391.325L47.0041 392.174L45.3611 396.416L42.4859 397.689L40.4322 400.659H37.9678L37.1463 396.416L35.9141 395.143V393.446H37.1463L38.7893 391.749L39.6107 392.174L39.2 395.143H41.2537L41.6644 391.325L43.7182 387.931L46.1826 388.779L47.8256 384.112L47.0041 381.991L43.7182 383.264L39.6107 377.324V373.082H41.6644V375.203L43.7182 378.597L48.2363 379.87L49.0578 384.112L51.5222 385.81L50.29 392.174Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Воронежская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M93.4493 334.898L94.2788 336.17C94.8804 336.704 95.2582 337.118 95.436 337.443H97.5231L102.041 342.11L105.738 339.989L110.667 340.413L114.774 337.443L115.596 332.676H117.649L119.703 334.049L123.4 332.676L124.632 335.746L127.507 338.292H130.374L132.017 335.746L130.374 332.676L127.096 322.594H125.453L123.811 320.048L125.453 318.775L123.811 315.381L121.757 311.139L118.882 309.442L119.292 306.047L118.471 303.926L116.006 304.35V300.532H114.774L114.363 298.835H113.131L110.667 303.078L108.202 300.532L107.792 302.653L104.916 305.623V308.593H103.273L103.684 311.139H105.738L104.506 314.533L102.452 313.684L102.041 320.473L99.166 321.321L96.7016 326.412L93.0346 327.685L92.2051 330.231L93.4493 331.079V334.898Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Пензенская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M158.963 308.593C155.229 309.748 152.966 306.048 152.966 306.048L151.191 305.186L148.594 308.593V312.412L146.805 318.776V325.988L142.697 326.837L143.929 330.231L146.805 331.079L148.594 337.443L152.337 336.17L152.752 341.686H155.241L156.889 343.383L158.963 342.11V346.353L161.591 345.08L166.52 347.819L168.985 347.201L173.092 342.11L174.324 338.292L172.235 337.443L175.146 328.534L173.092 323.699C172.299 323.703 171.572 323.758 170.99 323.867H169.746L168.985 320.473L165.599 317.927C165.584 315.331 162.125 323.018 161.037 319.2C159.948 315.381 160.359 315.381 161.037 313.26V310.714L158.963 308.593Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Нижегородская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M198.981 292.895L205.617 294.168C206.068 296.852 208.386 297.566 210.88 297.613L214.577 293.744L215.399 295.016L217.452 295.441L218.55 297.562L223.319 294.168L218.55 285.258L215.399 282.288L212.531 283.985V277.621L210.88 276.773L205.617 280.591L202.666 279.319L198.147 277.621L194.631 279.319L193.629 280.591H191.516L186.236 278.47L185.414 280.591L184.182 282.288L182.539 280.591L181.763 281.678L180.115 283.985L181.763 286.107H175.146H169.746L168.163 289.077H164.056V292.895L165.699 295.016L163.234 297.562V299.193C163.701 299.228 164.21 299.249 164.769 299.259L165.599 303.926C166.143 308.634 166.552 310.988 168.087 312.411C168.674 315.473 171.405 315.381 172.235 312.411H178.041C179.285 311.139 180.838 312.487 180.115 315.381H181.774C182.548 314.623 183.71 313.819 185.004 313.113C186.75 312.16 188.739 311.384 190.343 311.139L191.516 304.35L195.683 302.929L197.737 302.229L196.492 295.865L198.981 292.895Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Республика Мордовия'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M180.116 315.381H181.775C182.55 314.623 183.711 313.819 185.005 313.113L185.923 314.533L185.005 317.927L184.183 320.473L181.775 321.745L181.764 323.867C181.27 324.251 180.723 324.678 180.116 325.14C179.041 324.222 175.713 323.686 173.093 323.699C172.301 323.703 171.573 323.758 170.992 323.867H169.748L168.986 320.473L165.6 317.927C165.585 315.331 162.126 323.018 161.038 319.2C159.95 315.381 160.36 315.381 161.038 313.26V310.715L158.964 308.593C155.23 309.748 152.967 306.048 152.967 306.048L151.192 305.186L148.596 303.926C149.108 303.936 149.576 303.937 150.003 303.926C152.474 303.866 153.587 303.41 153.987 301.805C157.171 301.225 157.468 299.642 156.891 295.865H157.72C158.962 298.13 160.172 298.964 163.236 299.194C163.702 299.229 164.212 299.25 164.771 299.259L165.6 303.926C166.144 308.634 166.554 310.988 168.089 312.412C168.676 315.473 171.407 315.381 172.236 312.412H178.042C179.287 311.139 180.839 312.488 180.116 315.381Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Чувашская Республика'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M190.342 311.139L191.514 304.35L195.682 302.929L198.98 304.775L204.718 306.047L205.615 307.32L204.718 309.866L206.361 312.411L205.615 315.805L206.361 317.927V319.2L202.664 318.775V320.472H196.491L198.146 322.594L196.914 324.291H195.682L196.491 325.988H194.63L193.217 325.139L191.514 325.988V323.867L188.823 324.291L185.882 323.018C185.645 320.89 184.579 321.677 181.762 323.867L181.773 321.745L184.181 320.472L185.002 317.927L185.92 314.533L185.002 313.113C186.749 312.16 188.737 311.384 190.342 311.139Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Республика Марий Эл'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M224.77 312.412L222.696 317.927L223.318 319.836L221.866 320.473L220.326 317.503H217.026L214.952 315.382L213.754 315.806V317.927H206.361L205.615 315.806L206.361 312.412L204.718 309.866L205.615 307.321L204.718 306.048L198.98 304.775L195.682 302.93L197.735 302.229L196.491 295.865L198.98 292.896L205.615 294.168C206.067 296.852 208.385 297.566 210.879 297.614C211.427 297.624 211.983 297.602 212.53 297.562L211.701 300.957C216.465 301.474 215.642 303.615 218.549 304.775L221.866 307.321L222.281 310.715L224.77 312.412Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Удмуртская Республика'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M256.843 309.866L258.087 311.139C258.352 314.364 259.394 315.168 261.82 314.853V317.927C259.264 319.009 258.534 320.196 259.332 323.867L253.94 328.534C257.013 331.25 256.12 332.378 252.301 334.049L252.281 335.746L247.304 337.443L245.645 346.353H241.498L240.455 346.205L235.526 345.504V343.383L240.455 342.11V339.989L238.401 341.686L237.169 339.989L240.455 335.746L238.401 336.595L235.526 335.746V339.989H233.203L231.418 337.443L229.775 339.565L227.722 336.171L225.668 334.898V332.676C226.37 333.114 227.342 332.948 228.09 331.928L229.334 328.534C232.944 327.349 232.36 326.122 233.203 323.018C233.555 316.044 235.851 315.769 241.498 317.927L244.816 314.533V312.412C247.142 309.592 248.575 308.456 252.281 309.866C254.431 314.521 255.326 313.401 256.843 309.866Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Республика Татарстан'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M223.939 321.746L224.769 331.08C224.852 331.829 225.199 332.385 225.665 332.676V334.898L227.718 336.171L229.772 339.565L231.415 337.444L233.199 339.989H235.523V335.747L238.398 336.595L240.451 335.747L237.165 339.989L238.398 341.686L240.451 339.989V342.111L235.523 343.383V345.505L240.451 346.205V350.596L237.165 352.293L234.29 354.839L231.415 353.99L228.087 352.293L229.331 357.808L226.075 361.203L223.939 362.051L219.928 366.718L217.854 364.385L218.683 362.9L217.854 362.051L214.951 359.081L217.025 357.808V355.687H213.292L212.521 349.747L209.144 349.323L206.36 349.747L205.623 348.05L203.042 342.111L200.139 341.686V338.292L201.383 337.444L201.798 334.898L194.628 331.928C194.2 328.492 192.682 327.916 188.822 328.11C188.991 325.947 188.152 325.305 185.919 325.14C185.947 324.242 185.939 323.542 185.881 323.019L188.822 324.291L191.513 323.867V325.988L193.216 325.14L194.628 325.988H196.49L195.681 324.291H196.913L198.145 322.594L196.49 320.473H202.663V318.776L206.36 319.2V317.927H213.753V315.806L214.951 315.382L217.025 317.503H220.325L221.865 320.473L223.317 319.837L223.939 321.746Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Волгоградская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M139.482 378.173L141.556 376.476C142.327 375.761 143.514 375.446 144.342 375.765L146.807 372.658V369.688L143.931 370.536L141.556 367.991L142.699 365.869L141.556 363.748L139.482 364.384L136.127 361.202L139.482 359.93L141.556 354.838L138.181 349.323L130.377 345.504V338.292H127.51L124.635 335.746L123.403 332.676L119.706 334.049L117.653 332.676H115.599L114.778 337.443L110.67 340.413L109.438 343.807L109.849 349.747L103.829 355.687L105.33 357.808L104.509 359.93L105.33 361.202L103.829 365.021L100.926 365.869L95.4726 363.748L94.6512 365.869L91.3652 367.991L93.8751 371.385L94.6512 374.779L92.1867 380.719L93.8751 381.143L92.6309 383.688L95.9488 386.658L96.3636 384.961H100.926L102.17 386.658H103.829L105.903 384.113H107.147V388.78L112.953 388.355L114.198 385.81L117.93 385.385L120.117 387.931L124.983 387.083L127.1 391.325L127.472 393.447H130.375H133.278L136.954 382.416L139.482 378.173Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Ульяновская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M188.825 328.109C188.994 325.946 188.155 325.304 185.922 325.139C185.95 324.241 185.942 323.541 185.884 323.018C185.647 320.89 184.581 321.677 181.764 323.867C181.27 324.25 180.722 324.677 180.116 325.139C179.04 324.222 175.713 323.686 173.093 323.699L175.147 328.534L172.235 337.443L174.325 338.292L173.093 342.11L168.986 347.201L166.521 347.819L165.6 348.05L168.088 352.292L170.991 353.99V355.687L173.093 353.99L176.79 355.687L178.042 356.562L180.076 355.687L178.433 352.292L181.308 347.201H182.546L184.183 349.323L185.826 346.353H187.597L188.701 349.323L191.576 348.898L196.718 353.99L198.148 352.292H201.386L205.626 348.05L203.045 342.11L200.142 341.686V338.292L201.386 337.443L201.801 334.898L194.632 331.928C194.203 328.491 192.685 327.916 188.825 328.109Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Саратовская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M173.509 383.688L182.619 381.991L184.182 380.294L181.307 376.9V374.354L180.075 370.96V365.869L177.61 363.748L176.789 359.081L175.146 357.808L178.041 356.562L176.789 355.687L173.092 353.989L170.99 355.687V353.989L168.087 352.292L165.599 348.05L166.52 347.819L161.591 345.08L158.963 346.353V342.11L156.889 343.383L155.241 341.686H152.752L152.337 336.17L148.594 337.443L146.805 331.079L143.929 330.231L142.697 326.836L136.947 329.382L130.375 332.675L132.018 335.746L130.375 338.292V345.504L138.179 349.323L141.554 354.838L139.48 359.929L136.125 361.202L139.48 364.384L141.554 363.748L142.697 365.869L141.554 367.99L143.929 370.536L146.805 369.687V372.657L144.34 375.764C144.894 375.977 145.287 376.474 145.287 377.324L150.507 390.052L153.382 392.173L155.241 387.082L156.504 384.961L156.919 382.84C158.189 378.145 159.822 379.445 159.407 383.264L168.946 383.688C169.04 381.132 171.85 381.143 173.509 383.688Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Ярославская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M194.861 245.377L197.736 249.196L195.683 252.59L190.343 253.439L185.414 255.56L180.485 258.53L177.61 256.833H171.449L170.627 257.398L167.752 259.378L165.698 255.56L165.151 252.166L164.877 250.469L168.163 247.499L172.27 244.529L170.627 242.408L173.092 239.013L175.145 233.498H178.431V229.255H182.539H186.236L190.343 234.347L193.629 233.498L195.683 239.862L194.861 245.377Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Тверская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M184.592 222.467L182.538 229.255H178.431V233.498H175.145L173.091 239.013L170.627 242.408L172.27 244.529L168.162 247.499L164.896 250.451C164.889 250.457 164.878 250.452 164.879 250.443L165.15 247.923L165.698 244.529H161.59L160.358 242.408L157.483 245.377L157.072 242.408L150.5 239.862L150.911 235.195L149.679 234.346L146.804 236.892L143.107 237.741L141.464 235.195L139.821 232.649L138.589 227.982L134.49 228.407L129.151 224.164L126.275 213.133L132.437 209.315V202.951H134.892L135.722 199.557H138.178L139.821 202.951L144.75 205.496L150.5 207.193L151.322 211.436L155.84 209.315L157.483 210.588L160.769 207.193H162.823L165.287 209.315L165.698 215.254L168.162 213.557L169.805 216.952L171.859 215.679L174.323 216.952V219.497L178.431 220.77L184.592 222.467Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Новгородская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M179.252 218.224L178.431 220.77L174.323 219.497V216.951L171.859 215.678L169.805 216.951L168.162 213.557L165.698 215.254L165.287 209.314L162.823 207.193H160.769L157.483 210.587L155.84 209.314L151.322 211.436L150.5 207.193L144.75 205.496L139.821 202.95L138.178 199.556C137.904 198.566 137.439 196.586 137.767 196.586C138.096 196.586 140.643 196.021 141.875 195.738L141.464 191.919L145.161 190.647L145.982 189.374L148.857 188.95L147.214 184.283L148.857 180.04L155.229 180.464L158.715 181.313L159.537 182.161H164.876L166.108 185.131L170.627 182.586V185.131L172.234 184.283V188.101L170.627 189.374L171.448 193.167L175.966 191.919L178.04 197.435L175.966 199.556L178.04 201.253L178.431 205.072V209.314L176.377 211.436L178.431 212.284L179.252 218.224Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Ленинградская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M162.855 155.857L159.537 157.979L153.663 158.075L154.197 160.1L153.786 165.191L155.229 171.131L152.965 172.828V177.495C153.512 178.061 154.69 179.192 155.019 179.192C155.347 179.192 157.072 178.626 157.894 178.344L158.715 181.313L159.537 182.162H164.876L166.109 185.132L170.627 182.586V185.132L172.234 184.283V188.102L170.627 189.375L171.448 193.167L175.966 191.92L178.04 197.436L175.966 199.557L178.04 201.254L178.431 205.072H180.485L183.36 207.194L188.289 205.072L189.11 202.951H191.575V198.708L197.736 196.163L200.2 193.167H206.243V191.92V188.5L203.486 184.283L200.2 180.041L197.736 182.162L192.301 179.192H191.057L190.228 176.647L187.324 155.857V152.888L177.785 151.615C176.418 149.719 174.896 148.943 171.149 148.221V149.918L176.541 152.888L173.638 155.857V153.736L171.979 154.16V159.676L174.053 161.373V164.343H170.597L170.32 161.373H166.587L165.758 157.979L163.684 159.252L162.855 155.857Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Санкт-Петербург'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M174.052 164.342H170.596L170.626 168.161L169.857 171.979L168.584 176.646L173.637 179.192V175.797L174.948 174.949L175.966 169.858L176.541 166.464L174.052 164.342Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Республика Крым'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M28.5204 349.747L26.8774 352.293L24.413 348.898H21.5378L20.7163 345.504H14.9659L11.2692 340.413L5.51884 337.443L3.25977 336.807L4.81909 334.049L4.69736 330.655L7.16181 330.231L8.80478 326.412L7.16181 325.564V320.048L5.51884 317.927V316.23L11.2692 317.927L19.0733 321.745L20.3055 320.048H21.5378C21.5378 321.321 21.7842 323.867 22.77 323.867C23.7558 323.867 23.1807 327.544 22.77 329.382L20.7163 330.231L22.77 334.049V336.171L21.5378 337.443L22.77 339.989L26.0559 343.807L30.5741 348.898V350.596L28.5204 349.747Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Севастополь'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M1 336.171L2.23222 331.08L4.69667 330.655L4.8184 334.049L3.25908 336.807L1 336.171Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Белгородская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M90.9612 326.836L93.0349 327.685L96.7019 326.412L99.1664 321.321L102.042 320.472L102.452 313.684L104.506 314.533L105.738 311.139H103.685L103.274 308.593H104.917V305.623V301.38H103.685L99.9879 296.714L97.5234 297.138L97.1127 295.441L94.6482 295.016L92.2918 289.501L88.8978 289.925L85.5374 285.683L81.0938 292.047V295.441L84.4117 297.138V303.502L88.1444 304.35L90.2181 306.896L92.2918 307.744L91.4623 310.29L92.2918 312.411L90.2181 314.108L90.6328 317.078H93.536L90.9612 326.836Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Курская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M83.584 280.592C84.4135 282.713 87.3167 283.137 87.3167 283.137L85.5392 285.683L88.8996 289.926L92.2936 289.501L94.65 295.017L97.1145 295.441L97.5252 297.138L99.9896 296.714L103.686 301.381H104.919V305.623L107.794 302.654L108.204 300.532L110.669 303.078L113.133 298.835L109.847 295.865L111.217 292.895L109.026 293.744V291.623H107.383V287.804L106.562 283.986L107.383 278.895L102.454 275.501L104.097 272.531L101.003 270.409L98.7574 269.561L97.5252 268.288L95.8822 270.409L95.0607 267.864L91.4641 270.409C92.2936 272.531 91.0494 273.379 89.8051 272.106L88.1462 271.258C83.8219 273.674 83.8363 276.208 83.584 280.592Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Смоленская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M102.661 238.589L101.002 242.408L104.917 244.105L113.543 242.917L117.24 242.408L119.704 239.862L122.99 246.226L125.044 244.529L127.919 246.65L128.74 245.378L131.616 246.65L135.252 246.226L134.893 245.378L140.643 241.559L143.108 237.741L141.465 235.195L139.822 232.65L138.589 227.983L134.491 228.407L129.151 224.164L126.276 213.133L122.482 209.315V211.861L107.223 220.77C107.5 221.477 108.136 223.061 108.467 223.74C108.799 224.419 106.947 224.306 105.979 224.164V227.558L104.32 227.983V230.528L101.831 230.953V234.347L101.002 237.317L102.661 238.589Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Брянская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M91.4623 267.863V270.409L95.059 267.863L95.8805 270.409L97.5234 268.288L98.7556 269.56L101.001 270.409L100.399 267.863L102.863 268.288L105.328 266.166L106.149 263.621L108.203 264.893L110.256 265.318L111.078 262.254H113.953L111.899 261.075L110.667 255.56L113.542 254.711L114.775 249.62L112.721 248.347L113.953 246.226L113.542 242.916L104.917 244.104L101.001 242.407H93.1213C92.2918 238.165 87.262 239.164 87.7296 243.256C84.0736 245.327 82.7839 247.011 81.0938 250.468V253.014H85.2412V256.832L88.1444 256.408L90.6328 260.227C89.7276 262.799 90.1013 263.775 92.2918 264.469C94.5235 264.321 93.9508 267.863 91.4623 267.863Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Кировская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M249.379 271.258C249.029 267.251 249.719 265.858 252.282 264.469C253.155 261.916 254.563 261.15 256.064 261.381L254.832 259.802L256.064 256.833L254.832 253.438L249.903 254.711L247.306 261.381H244.153L243.158 263.621L240.456 261.381L239.224 265.318L241.688 266.166L237.992 269.561L239.224 271.258L237.17 272.889L233.884 275.5V280.592L230.188 282.289L226.08 280.592L223.322 282.289L219.919 283.986L218.552 285.258L223.322 294.168L218.552 297.562L217.455 295.441L215.401 295.017L214.579 293.744L210.883 297.613C211.431 297.624 211.987 297.602 212.534 297.562L211.704 300.956C216.469 301.474 215.646 303.615 218.552 304.775L221.87 307.32L222.285 310.714L224.773 312.412L222.7 317.927L223.322 319.836L223.944 321.745L224.773 331.079C224.857 331.828 225.204 332.385 225.67 332.676C226.371 333.114 227.343 332.948 228.091 331.928L229.336 328.534C232.945 327.349 232.361 326.122 233.204 323.018C233.557 316.044 235.853 315.768 241.499 317.927L244.817 314.533V312.412C247.144 309.591 248.576 308.456 252.282 309.866C254.432 314.521 255.328 313.401 256.845 309.866L258.089 311.139C258.353 314.364 259.396 315.168 261.822 314.853C262.315 314.789 262.867 314.679 263.481 314.533L266.384 309.866L265.969 308.593L266.384 302.653L268.872 302.229C269.84 300.069 270.525 299.102 273.02 299.259V292.471C269.558 292.823 268.653 292.109 268.457 289.077H264.31C261.534 290.145 260.612 289.734 260.577 286.107H259.333C256.577 287.419 255.052 286.828 252.282 284.41C249.411 284.863 248.597 286.289 247.306 289.077C247.306 289.077 246.476 290.35 245.647 289.077C244.817 287.804 244.817 280.592 244.817 280.592L243.158 277.622L246.476 270.833L249.379 271.258Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Вологодская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M249.9 250.469V254.711L247.302 261.381H244.149L243.155 263.621L240.453 261.381L239.22 265.318L241.685 266.167L237.988 269.561L239.22 271.258L237.167 272.89L233.881 268.712L231.006 270.833L230.184 269.561L227.309 270.833L222.791 266.167L218.549 259.803L216.63 254.711L212.53 253.439V250.469L210.879 248.347L212.53 246.226H210.879L208.826 249.196L205.616 247.499L204.718 246.226L200.2 249.196H197.736L194.86 245.377L195.682 239.862L193.628 233.498L190.342 234.347L186.235 229.255H182.538L184.592 222.467L178.431 220.77L179.252 218.224L178.431 212.285L176.377 211.436L178.431 209.315V205.072H180.484L183.36 207.194L188.288 205.072L189.11 202.951H191.574V198.708L197.736 196.163L200.2 193.167H206.242V191.92L212.12 194.466H214.995L217.44 197.834L219.505 202.077C217.451 205.471 213.344 207.363 213.344 208.042V213.558L217.44 215.679V218.649L221.148 219.497V223.74L222.791 225.437L225.666 223.74L228.13 230.104H231.006L231.827 234.347L233.881 236.044H239.22V238.165L241.685 244.529L246.472 242.408L248.667 245.377L246.472 246.226L247.302 248.347L249.9 250.469Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Псковская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M118.335 196.162C118.335 205.072 119.408 204.755 122.482 205.072V209.315L126.276 213.133L132.437 209.315V202.951H134.893L135.723 199.556H138.179C137.905 198.567 137.44 196.587 137.768 196.587C138.097 196.587 140.643 196.021 141.876 195.738L141.465 191.92L145.161 190.647L145.983 189.374L148.858 188.95L147.215 184.283L148.858 180.04L155.23 180.465L158.716 181.313L157.894 178.343C157.073 178.626 155.348 179.192 155.019 179.192C154.691 179.192 153.513 178.06 152.966 177.495V172.828L155.23 171.131L153.787 165.191L154.198 160.1L153.663 158.075L139.487 166.039L132.021 172.403L128.704 176.646H125.8V175.373H123.727L122.482 180.04L119.994 186.829L119.973 186.845C116.308 189.579 116.16 189.69 118.335 196.162Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Ставропольский край'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M67.951 386.658C67.951 386.658 69.201 387.873 69.8039 387.082L71.2369 389.628V392.173L73.7013 390.052L74.3778 391.325L73.7013 393.022C74.5371 395.043 76.159 395.296 79.7694 395.143L81.0137 398.962L80.6839 402.356L83.0874 407.023L81.4284 413.387L86.4343 426.115L85.5758 429.085L82.7376 432.054H79.4517L78.2195 433.327V436.721L74.5228 435.449L77.398 437.994L75.755 440.54L73.7013 441.813L72.8799 439.267L70.0047 440.115H68.7724L67.951 436.297L65.0758 434.812L68.7724 433.327L66.308 432.479L65.0758 429.085L62.6113 429.933H61.3791L60.5576 428.236L58.9146 427.812V425.69L59.3254 424.842L55.6287 423.145H54.3965L54.8072 421.448L56.0395 420.175V418.054H54.3965V415.932L56.4502 415.084L59.3254 416.781L60.1469 414.235H57.6824V411.69L55.6287 410.841L56.4502 406.598L54.8072 406.174V400.659H58.9146L58.5039 395.567L59.3254 393.446L57.6824 390.901L59.3254 387.931L60.1469 384.961H61.3791L62.6113 386.658L65.0758 387.082V384.112H65.823C65.9578 385.166 67.951 386.658 67.951 386.658Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Карачаево-Черкесская Республика'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M51.5232 422.296L53.1662 423.145H54.3984L54.8092 421.448L56.0414 420.175V418.054H54.3984V415.932L56.4521 415.084L59.3273 416.781L60.1488 414.235H57.6843V411.69L55.6306 410.841L56.4521 406.599L54.8092 406.174L53.1662 405.75L52.7554 408.296L49.4695 409.568L47.0051 408.296L47.8265 407.023L45.3621 402.356L43.7191 404.053H42.0762L37.9688 407.447L40.4332 413.387L41.6654 417.63L45.3621 422.721L47.8265 424.842L51.5232 422.296Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Кабардино-Балкарская Республика'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M65.0773 437.146L63.8451 437.995V439.268L62.2021 438.843L59.3269 437.146L58.5055 439.268L57.2732 436.298L51.5228 437.146L49.4691 434.176V427.812L47.8262 424.842L51.5228 422.297L53.1658 423.145H54.398H55.6303L59.3269 424.842L58.9162 425.691V427.812L60.5592 428.237L61.3806 429.934H62.6129L65.0773 429.085L66.3095 432.479L68.774 433.328L65.0773 434.813V437.146Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Республика Северная Осетия - Алания'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M61.381 451.571L65.0777 448.177L62.6133 443.51L63.8455 440.54V439.267L62.2025 438.843L59.3273 437.146L58.5058 439.267L57.2736 436.297L51.5232 437.146V441.813L50.291 442.661L51.5232 444.358L56.0414 445.631L58.5058 449.45L61.381 451.571Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Республика Ингушетия'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M65.0758 448.176L67.5402 443.509V440.54V440.115H68.7725L67.951 436.297L65.0758 434.812V437.145L63.8435 437.994V439.267V440.54L62.6113 443.509L65.0758 448.176Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Чеченская Республика'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M69.183 460.056H63.8434L63.0219 457.935L61.3789 454.965V451.571L65.0756 448.177L67.54 443.51V440.54V440.116H68.7723H70.0045L72.8797 439.267L73.7012 441.813L75.7549 440.54L78.2193 444.358V446.48L82.7375 445.631L81.916 450.722L76.5763 452.844L75.7549 456.662H74.5226L73.7012 460.056L71.6474 460.48V458.359H69.5937L69.183 460.056Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Республика Дагестан'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M90.9541 434.813V438.419L92.4144 440.116L89.3111 442.661L90.1326 445.631L89.3111 449.45V452.844L88.9004 457.935L84.3822 463.026L81.0963 465.996L81.9177 469.39L79.4533 473.633L78.2211 486.361V488.058L75.3459 489.755L71.6492 488.907L67.9525 491.452L64.2559 485.088L65.8988 481.27L65.0773 474.906L64.2559 473.633L60.5592 465.572L60.1484 461.329L63.8451 460.056H69.1848L69.5955 458.359H71.6492V460.481L73.7029 460.056L74.5244 456.662H75.7566L76.5781 452.844L81.9177 450.723L82.7392 445.631L78.2211 446.48V444.359L75.7566 440.54L77.3996 437.995L74.5244 435.449L78.2211 436.722V433.328L79.4533 432.055H82.7392L85.5774 429.085L90.9541 434.813Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Астраханская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M126.226 395.992C125.758 394.395 126.184 393.941 127.471 393.446L127.099 391.325L124.982 387.082L120.116 387.931L117.929 385.385L114.196 385.81L112.952 388.355V395.143H114.196V397.265L112.952 398.113L112.125 404.053L113.782 406.174L118.759 407.023L117.929 409.144L112.952 409.568V417.629C115.006 420.022 114.87 421.06 113.782 422.721H109.222V421.448C105.487 418.054 102.584 420.599 107.146 423.145C106.435 426.551 105.748 427.948 103.83 429.085C98.2091 429.828 100.508 432.055 103.413 432.903L105.696 434.812L107.978 436.721L109.222 439.267L112.125 437.994L115.028 438.419L117.517 437.146V439.267H121.25H126.641L123.323 431.63L127.885 431.206V409.568H124.982C122.378 408.916 122.744 408.009 124.153 406.174C125.634 404.979 126.666 403.929 127.215 402.78C127.82 401.513 127.836 400.126 127.215 398.294C126.978 397.597 126.65 396.836 126.226 395.992Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Луганская Народная Республика'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M77.2732 353.141L71.4668 345.929V337.443L73.2906 335.746L74.1121 332.676L77.8088 330.231V326.837H79.041L80.2732 323.018L81.9162 320.048H85.568L85.9853 318.776L88.8988 317.927L90.6338 317.079H93.537L90.9622 326.837L93.0359 327.685L92.2064 330.231L93.4506 331.079V334.898L94.2801 336.171C94.8817 336.704 95.2595 337.118 95.4373 337.443C95.8765 338.248 95.0945 338.512 93.4506 338.716V341.686H88.059L87.2295 339.989H86.8148L85.9853 342.959C85.1558 343.1 86.3146 343.383 85.9828 343.383C85.651 343.383 85.568 345.929 85.568 347.202H83.4943L83.0796 350.596C79.9925 350.19 78.8685 351.009 77.2732 353.141Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Донецкая Народная Республика'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M61.0988 347.201L58.1956 347.625L56.9514 345.504L53.9863 342.11H50.7004L49.8789 339.989L51.5219 338.716V336.17L52.3434 334.897L56.04 336.17L56.8615 335.746L56.04 331.079L56.4508 327.685L60.2693 323.866L61.7904 326.836L64.2549 325.564L65.0763 323.018L66.4865 321.321L67.9515 318.775L69.5945 317.927V321.321L71.4673 320.472V321.321H75.7556L78.6308 320.472L80.2738 323.018L79.0416 326.836H77.8093V330.23L74.1127 332.675L73.2912 335.746L71.4673 337.443V345.928H67.3199C65.5506 343.7 64.0389 344.598 61.0988 347.201Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Запорожская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M56.0408 331.08L56.4515 327.685L54.8086 323.019L56.4515 320.049L53.9871 314.533L51.5226 310.291L47.826 313.685L44.54 316.23L43.7185 312.412L40.4326 311.139L38.7896 313.685L39.6111 314.533L37.9682 317.079V321.746L35.5037 323.019L34.2715 329.383L37.5574 328.11L36.3252 331.08L40.4326 332.676L42.4863 335.747L45.7722 337.444L47.0045 339.989H49.8797L51.5226 338.716V336.171L52.3441 334.898L56.0408 336.171L56.8623 335.747L56.0408 331.08Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Херсонская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M38.789 313.684L40.432 311.139L35.5031 306.048V303.078L32.6279 301.381L30.5742 302.229L30.1634 304.351L27.699 303.502V300.532H22.7701L19.0734 299.684H11.2693L13.323 301.381L10.0371 302.653L11.2693 308.593H14.966V314.533H18.2519L19.0734 320.048H20.3056H21.5379H22.7701L24.4131 323.018L26.8775 327.685L32.6279 331.079L34.2709 329.382L35.5031 323.018L37.9675 321.745V317.079L39.6105 314.533L38.789 313.684Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Пермский край'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M273.02 292.471C269.558 292.824 268.653 292.109 268.457 289.077L271.361 286.107C267.056 283.161 270.116 279.319 273.02 283.137L275.093 282.289L276.752 284.41L278.411 283.137L281.314 284.41L280.485 289.077H283.388L289.195 294.168L291.683 292.471L293.342 294.168L295.83 292.471L299.978 295.441L302.052 292.471L320.099 302.229C318.5 304.704 317.085 307.358 315.323 311.139C312.588 315.577 310.333 317.507 304.955 320.049C303.327 324.056 301.957 325.136 299.148 325.564V336.171C296.123 336.696 295.228 337.302 296.66 339.565C297.721 343.971 295.463 345.179 289.195 346.353C288.365 352.717 284.461 354.05 281.314 348.05L278.411 350.171L276.752 355.687L273.039 357.808L270.946 355.687L267.628 357.808V359.081H265.969L264.31 360.778H259.333L258.918 356.535L255.6 355.687L253.941 352.293L250.623 350.596L248.55 346.353H245.646L247.305 337.443L252.282 335.746L252.302 334.049C256.122 332.378 257.014 331.25 253.941 328.534L259.333 323.867C258.536 320.196 259.265 319.009 261.821 317.927V314.853C262.315 314.789 262.867 314.679 263.48 314.533L266.384 309.866L265.969 308.593L266.384 302.654L268.872 302.229C269.84 300.069 270.525 299.103 273.02 299.259V292.471Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Самарская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M209.145 349.323L206.361 349.747L205.624 348.05L201.384 352.293H198.146L196.716 353.99L191.574 348.899L188.699 349.323L187.595 346.353H185.824L184.181 349.323L182.544 347.202H181.306L178.43 352.293L180.073 355.687L178.04 356.562L175.145 357.808L176.788 359.081L177.609 363.748L180.073 365.869V370.96C180.484 371.809 181.306 373.676 181.306 374.355V376.9L184.181 380.294L182.618 381.991C182.578 382.607 182.553 383.173 182.544 383.688H189.52L191.328 380.719L193.217 381.143L194.449 378.597L198.146 376.9L201.693 375.627L207.182 373.506V369.688L213.293 365.869L214.165 362.899L217.855 362.051L214.952 359.081L217.026 357.808V355.687H213.293L212.522 349.747L209.145 349.323Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path

                    id='Республика Башкортостан'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}

                    d="M217.027 367.99V365.869L217.857 364.384L219.931 366.718L223.942 362.051L226.078 361.202L229.334 357.808L228.089 352.293L231.418 353.99L234.293 354.838L237.168 352.293L240.454 350.595V346.205L241.497 346.353H245.645H248.548L250.621 350.595L253.939 352.293L255.598 355.687L258.916 356.535L259.331 360.778H264.308L265.967 359.081H267.626V363.748C270.683 365.932 272.235 367.428 274.08 369.687C274.405 370.085 274.739 370.507 275.091 370.96L278.409 371.385L273.037 375.627V379.87H270.114L269.719 381.567H265.138C264.723 386.234 262.189 385.614 261.82 381.143L258.916 381.567L258.087 379.446L259.331 378.597L258.916 375.627L253.939 373.506L250.621 376.9L252.3 384.961C252.607 388.539 253.931 388.28 256.428 387.507C256.747 390.157 257.781 390.515 260.575 390.052C264.57 389.527 266.772 389.305 269.719 390.052V395.568H266.382L263.479 398.538L256.428 397.689L252.3 403.204C248.771 408.576 246.911 410.324 243.591 412.114L242.872 416.781L242.741 417.63L239.009 418.478C236.105 423.994 231.519 422.757 231.129 418.054L226.981 417.63L226.152 412.963H225.342L224.493 414.66C222.768 414.4 221.454 414.491 222.834 412.114C224.703 409.918 225.206 408.874 223.663 407.871C220.345 407.447 220.345 404.902 226.981 404.902V400.235L225.342 399.386L222.834 400.235C219.516 402.78 217.569 399.183 220.345 396.416L221.175 394.295L220.345 390.052L221.971 384.961L220.345 383.688L218.686 377.324L219.931 371.385L217.027 367.99Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                <path
                    id='Оренбургская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M252.298 433.752L248.98 428.236V426.964L252.775 424.418V423.145L251.132 422.721L247.846 418.902L246.203 418.478L244.971 421.024L244.56 417.63L242.87 416.781L242.74 417.63L239.007 418.478C236.104 423.994 231.517 422.757 231.127 418.054L226.979 417.63L226.15 412.963H225.34L224.491 414.66C222.766 414.4 221.452 414.491 222.832 412.114C224.702 409.918 225.204 408.874 223.661 407.872C220.344 407.447 220.344 404.902 226.979 404.902V400.235L225.34 399.386L222.832 400.235C219.514 402.78 217.567 399.183 220.344 396.416L221.173 394.295L220.344 390.052L221.969 384.961L220.344 383.688L218.685 377.324L219.929 371.385L217.026 367.991V365.869L217.855 364.384L218.685 362.899L217.855 362.051L214.165 362.899L213.293 365.869L207.182 369.688V373.506L201.693 375.627L198.146 376.9L194.449 378.597L193.217 381.143L191.328 380.719L189.521 383.688H182.544C182.472 388.02 183.592 388.873 187.595 387.082C189.903 386.868 190.931 387.299 191.328 391.325L196.716 394.719V403.205C199.321 405.106 199.558 406.683 198.789 409.993C192.952 416.785 197.134 417.63 201.693 412.114C202.571 406.356 204.6 407.872 203.766 414.66C202.056 422.932 206.673 423.994 209.573 420.6C213.412 419.033 215.387 419.718 218.704 422.721C217.716 429.777 224.782 428.236 225.34 426.539C226.169 423.994 229.902 425.266 229.902 428.661L231.147 439.267C233.912 444.571 239.441 445.207 239.441 440.964C240.805 439.127 243.589 439.692 243.589 441.813C241.086 446.773 243.444 449.198 246.203 449.24C247.297 449.257 248.453 448.9 249.395 448.177L253.543 443.086L252.298 433.752Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                <path
                    id='Челябинская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M284.236 411.69L289.628 414.236L288.923 410.417H291.387V406.599L287.691 406.175V403.629L284.236 402.356L285.637 397.689L286.458 398.538H287.691L288.101 394.295L289.628 395.144L290.155 393.447L293.03 394.295L295.02 390.477L293.852 387.083L294.605 384.961L295.02 382.84L293.852 381.991V379.87L289.231 376.052L288.512 377.749L283.994 374.779L280.297 371.385V369.688L277.422 367.566L274.081 369.688C274.406 370.086 274.74 370.507 275.092 370.961L278.41 371.385L273.038 375.627V379.87H270.115L269.72 381.567H265.139C264.724 386.234 262.19 385.614 261.821 381.143L258.917 381.567L258.088 379.446L259.332 378.597L258.917 375.627L253.94 373.506L250.623 376.9L252.301 384.961C252.608 388.539 253.932 388.28 256.429 387.507C256.748 390.158 257.782 390.515 260.576 390.053C264.571 389.527 266.773 389.305 269.72 390.053V395.568H266.383L263.48 398.538L256.429 397.689L252.301 403.205C248.772 408.576 246.912 410.324 243.592 412.114L242.873 416.781L244.563 417.63L244.973 421.024L246.206 418.478L247.849 418.903L251.135 422.721L252.778 423.145V424.418L248.983 426.964V428.236H253.545H259.352V425.267C259.898 420.403 261.023 418.28 265.139 419.467C266.374 419.824 267.88 420.479 269.72 421.448C272.188 423.291 274.283 422.297 273.038 420.175L272.956 420.106C270.188 417.788 268.611 416.467 270.55 415.933C273.868 416.357 275.989 414.217 272.624 412.539C270.278 411.828 270.192 408.913 271.794 408.296C272.104 408.176 274.421 407.165 275.941 406.599V411.266L278.845 411.69L279.259 409.145L282.163 409.569V411.69H280.504V413.387L282.992 413.811L284.236 411.69Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                <path
                    id='Свердловская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M270.943 355.687L267.625 357.808V359.081V363.748C270.682 365.932 272.234 367.428 274.079 369.688L277.42 367.566L280.295 369.688V371.385L283.992 374.779L288.51 377.749L289.229 376.052L293.85 379.87V381.991L295.018 382.84L301.243 379.021L301.654 381.567L304.118 380.719L306.172 383.264H307.815L309.047 385.81L312.333 387.507V386.234H313.565L315.208 384.961L318.905 385.81L319.726 387.507L322.602 386.234L320.959 384.961L323.423 377.749L325.066 376.9V374.779H329.173L330.406 376.052L332.87 374.779H336.567L337.799 368.036C336.167 366.923 335.298 364.455 335.643 358.657H337.302C337.871 354.12 337.473 351.902 331.91 350.171V334.049H333.154L331.91 325.564L333.154 323.867V318.351L330.666 315.806V309.866L330.574 309.746C326.356 304.209 323.962 301.067 324.445 296.29C322.713 298.463 321.348 300.291 320.096 302.229C318.497 304.704 317.082 307.358 315.32 311.139C312.585 315.577 310.33 317.507 304.952 320.048C303.325 324.056 301.955 325.136 299.145 325.564V336.171C296.12 336.696 295.225 337.302 296.657 339.565C297.719 343.971 295.46 345.179 289.192 346.353C288.362 352.717 284.458 354.05 281.312 348.05L278.408 350.171L276.749 355.687L273.036 357.808L270.943 355.687Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />

                <g
                    id='Архангельская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                >
                    <path id='' d="M222.793 197.834H217.442L219.507 202.077C217.453 205.471 213.346 207.364 213.346 208.042V213.558L217.442 215.679V218.649L221.15 219.498V223.74L222.793 225.437L225.668 223.74L228.132 230.104H231.008L231.829 234.347L233.883 236.044H239.222V238.165L241.687 244.529L246.474 242.408L248.669 245.378L246.474 246.226L247.304 248.348L249.902 250.469V254.712L254.831 253.439L256.063 256.833L254.831 259.803L256.063 261.381C257.632 261.622 259.304 262.952 260.576 264.47L265.967 259.803L264.308 256.833L275.092 246.226C275.921 244.954 274.611 243.481 272.603 244.529C270.245 243.449 269.711 243.489 268.456 244.529H265.967C265.122 243.376 264.634 243.219 263.479 244.529C261.292 239.478 261.82 235.195 265.967 234.347L269.7 233.498L270.115 227.983C274.182 226.083 275.921 222.467 272.603 218.649V212.285H273.848C279.093 218.252 286.95 221.273 290.797 222.141V225.111H293.7L299.092 231.475L299.922 229.354L302.825 231.475L304.069 230.202L303.654 226.808L305.728 221.293L303.654 219.171L306.173 211.534L301.196 206.868L294.975 207.716L294.146 200.928L295.763 192.442L295.32 187.678L294.934 183.533L290.372 182.684L288.713 175.472L275.91 174.101L273.007 171.131H269.275V172.404H264.298L263.468 171.131H262.224L256.802 178.768L255.972 185.556L252.654 188.102V181.314H249.751L248.092 172.404H244.359L243.53 171.131H248.092V165.616L245.604 161.373L242.7 162.222H241.041L239.382 163.919L238.553 171.131L241.041 172.404V175.798L239.382 177.92H237.309L236.894 175.798L232.747 174.95L230.258 177.071L231.088 169.01L230.258 168.161L227.77 169.434V172.828L224.452 174.101L223.622 181.314L231.008 189.375L222.793 197.834Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M393.872 181.738V192.345L389.629 188.526C388.922 187.96 387.338 186.659 386.659 185.981C385.98 185.302 385.245 186.263 384.962 186.829V184.284C384.962 183.605 382.417 181.172 381.144 180.041L383.265 178.344H385.811L386.659 176.222L384.962 174.95L388.356 169.858H384.962L385.811 167.313L381.992 166.04L388.356 160.525L389.629 163.919L393.872 159.252H397.69C397.407 157.696 397.011 154.585 397.69 154.585C398.369 154.585 399.67 155.999 400.236 156.706L402.357 154.585L406.176 152.888V154.585C407.59 154.868 410.673 155.518 411.691 155.858C412.709 156.197 414.095 159.676 414.661 161.373H411.691V162.646L408.721 161.373L409.57 163.919H406.176L402.357 167.313L397.69 172.404L393.872 181.738Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M411.691 152.464L415.509 152.888L412.115 150.342L410.843 149.069L415.509 148.221L416.358 146.948L418.479 146.524L421.025 149.494L422.722 147.372V145.675L426.116 146.1L425.692 143.978L430.783 145.675L429.086 143.13L432.056 140.584L435.026 139.736L435.874 138.463L438.844 141.008L440.541 138.887H443.511L446.481 137.19L454.966 139.311L456.239 137.19L458.785 139.311V141.008H464.724V142.281L467.694 143.13L471.088 142.281H473.21L474.058 140.584C475.331 140.443 478.046 140.075 478.725 139.736C479.404 139.396 481.271 140.443 482.119 141.008L483.392 144.402L479.574 148.221L472.361 149.494L457.512 149.069C453.693 148.928 445.887 148.56 445.208 148.221C444.36 147.797 441.814 149.494 441.39 149.494C440.965 149.494 442.663 150.342 443.087 150.766C443.426 151.106 441.531 151.756 440.541 152.039L437.996 150.342L437.147 152.888L436.299 150.342L434.177 152.464L432.056 149.494V153.736C431.49 154.019 430.104 154.585 429.086 154.585C428.068 154.585 426.682 155.433 426.116 155.858C426.258 154.443 426.371 151.7 425.692 152.039C424.843 152.464 424.419 152.888 425.268 154.161C425.946 155.179 425.55 156.282 425.268 156.706C424.702 157.272 423.571 158.064 423.571 156.706C423.571 155.349 422.439 154.726 421.873 154.585L422.722 156.706L421.025 158.403L419.752 155.858L418.055 157.555V159.252L416.782 160.525L414.661 159.252L415.509 157.555L413.812 156.706L412.115 154.161L408.721 153.736L411.691 152.464Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                </g>

                <path
                    id='Республика Карелия'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M187.326 155.857V152.887L193.802 153.311H201.682L206.244 146.099V141.008L208.006 136.765L213.346 138.462L215.81 136.765V132.946L220.739 131.249C220.328 130.118 219.753 127.77 220.739 127.431C221.725 127.092 224.731 125.875 226.111 125.31L233.061 122.34L235.235 123.188L244.359 113.854L250.166 123.188L247.437 127.855L251.41 129.977H253.898L253.188 136.341L248.507 150.341L247.437 148.644H241.871L237.169 155.857L231.829 159.251L233.891 164.766L231.088 169.009L230.258 168.161L227.77 169.433V172.828L224.452 174.1L223.622 181.313L231.007 189.374L222.793 197.833H217.442L214.997 194.465H212.122L206.244 191.92V188.5L203.488 184.283L200.202 180.04L197.737 182.161L192.303 179.192H191.059L190.229 176.646L187.326 155.857Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                <path
                    id='Мурманская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M250.164 123.189L244.357 113.855L248.505 108.34H259.347L261.401 104.097L263.454 102.4L264.276 97.7331L269.242 94.339H272.901V91.3691L275.048 92.2177L277.009 94.339L280.295 93.4905L283.17 95.6118L286.867 94.339L287.688 99.0059L290.809 96.4603V101.127H292.617H295.081V106.643L292.617 107.491L291.795 104.097H290.809V110.885V113.855L292.617 115.128V121.068L293.438 132.947L290.809 144.402V151.191L292.617 149.494L290.809 155.858V160.949L287.277 162.646L285.458 166.464H275.048L262.222 162.646L260.168 151.191L258.459 143.13L257.58 136.766V128.705L259.347 125.31L258.459 121.068L253.897 129.977H251.408L247.435 127.856L250.164 123.189Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />

                <path
                    id='Республика Коми'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M303.654 219.171L306.173 211.534L325.067 212.285L359.159 243.68L369.113 245.377C370.647 242.279 377.813 240.765 383.224 244.529C388.298 239.2 390.605 238.221 393.178 241.559C394.624 239.391 395.714 238.696 398.985 238.589C400.813 238.963 401.566 239.374 401.719 239.767C402.087 240.713 398.985 241.559 398.985 241.559V247.499L400.644 248.771V252.166C393.339 253.085 391.276 255.436 387.787 259.802C386.101 258.308 384.796 257.929 381.151 258.53L366.335 261.86L362.062 264.045L358.748 263.621L355.552 264.045L343.961 268.712V264.045L339.814 265.742C334.142 276.434 338.781 276.633 331.911 284.41C329.355 292.136 327.635 294.088 324.446 296.289C322.714 298.462 321.349 300.291 320.097 302.229L302.05 292.471L299.976 295.441L295.829 292.471L293.34 294.168L291.681 292.471L289.193 294.168L283.386 289.077H280.483L281.313 284.41L278.409 283.137L276.75 284.41L275.091 282.288L273.018 283.137C270.115 279.319 267.054 283.161 271.359 286.107L268.456 289.077H264.308C261.532 290.145 260.61 289.734 260.575 286.107H259.331C256.575 287.419 255.05 286.828 252.281 284.41C249.41 284.863 248.595 286.289 247.304 289.077C247.304 289.077 246.474 290.35 245.645 289.077C244.815 287.804 244.815 280.591 244.815 280.591L243.156 277.622L246.474 270.833L249.377 271.258C249.027 267.251 249.717 265.858 252.281 264.469C253.153 261.916 254.561 261.15 256.063 261.381C257.632 261.622 259.304 262.952 260.575 264.469L265.967 259.802L264.308 256.832L275.091 246.226C275.921 244.953 274.61 243.481 272.603 244.529C270.245 243.449 269.711 243.489 268.456 244.529H265.967C265.122 243.376 264.634 243.219 263.479 244.529C261.292 239.477 261.82 235.195 265.967 234.346L269.7 233.498L270.115 227.982C274.182 226.083 275.921 222.467 272.603 218.649V212.285H273.847C279.093 218.252 286.95 221.272 290.797 222.141V225.11H293.7L299.092 231.474L299.921 229.353L302.825 231.474L304.069 230.202L303.654 226.807L305.728 221.292L303.654 219.171Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />

                <path
                    id='Курганская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M312.852 418.902C314.97 421.504 320.603 423.341 327.12 422.72C328.687 421.911 329.627 421.817 330.406 421.946C331.741 422.167 332.603 423.046 335.335 422.115V419.326C334.924 418.761 334.103 417.46 334.103 416.781C334.103 416.102 333.829 413.952 333.692 412.962H331.638C331.775 412.679 331.967 412.114 331.638 412.114C331.31 412.114 329.858 411.548 329.174 411.265V407.023L327.12 404.901L325.888 403.204C325.477 403.346 324.573 403.628 324.245 403.628C323.916 403.628 323.286 402.214 323.013 401.507H320.959L319.727 395.143C318.768 395.143 316.851 394.973 316.851 394.295C316.851 393.616 317.399 390.618 317.673 389.203L319.727 387.506L318.905 385.809L315.208 384.961L313.565 386.234H312.333V387.506L309.047 385.809L307.815 383.264H306.172L304.118 380.718L301.654 381.567L301.243 379.021L295.018 382.839L294.603 384.961L293.85 387.082L295.018 390.476L293.028 394.295L290.153 393.446L289.626 395.143L288.1 394.295L287.689 398.537H286.457L285.635 397.689L284.234 402.356L287.689 403.628V406.174L291.385 406.598V410.417H288.921L289.626 414.235C292.008 413.436 293.188 413.814 295.018 415.932C297.173 415.934 298.407 415.806 299.995 418.054H303.727C303.727 421.023 306.216 421.023 307.045 418.902C308.659 417.648 309.996 417.823 312.852 418.902Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />

                <path
                    id='Тюменская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M387.486 381.991C388.144 381.902 388.315 383.688 388.315 384.537L386.678 387.082L388.315 388.779H391.659L392.428 390.476H394.071V392.173L401.464 395.568V397.477H399L398.178 398.537H394.892L394.071 400.234H391.659L385.035 397.477L382.16 399.386L378.874 397.477H377.231L375.588 394.295L370.248 393.022L372.302 387.931L371.311 384.537L366.141 389.204L363.431 394.295V397.477L360.968 399.386L361.622 401.932H364.087V404.901L366.334 410.417L364.908 412.114L360.968 411.265V413.811H358.479V415.932L356.82 416.781V419.326L355.051 421.024L352.673 420.175L351.429 423.145L353.502 424.842L350.122 426.963L349.577 428.085C348.599 427.465 346.465 430.192 345.603 429.509C344.628 428.736 344.474 425.812 343.55 424.842C342.439 423.677 339.707 423.026 338.21 421.508C338.06 421.356 337.922 421.195 337.799 421.024C336.834 421.529 336.025 421.88 335.335 422.115V419.326C334.924 418.761 334.103 417.46 334.103 416.781C334.103 416.102 333.829 413.952 333.692 412.962H331.638C331.775 412.68 331.967 412.114 331.638 412.114C331.31 412.114 329.858 411.548 329.174 411.265V407.023L327.12 404.901L325.888 403.204C325.477 403.346 324.574 403.629 324.245 403.629C323.916 403.629 323.287 402.214 323.013 401.507H320.959L319.727 395.143C318.768 395.143 316.852 394.974 316.852 394.295C316.852 393.616 317.399 390.618 317.673 389.204L319.727 387.506L322.602 386.234L320.959 384.961L323.423 377.748L325.066 376.9V374.778H329.174L330.406 376.051L332.87 374.778H336.567L337.799 368.036C339.396 369.125 341.721 368.917 344.353 369.263V365.445L346.841 366.293H351.403L353.892 365.445C356.61 368.381 359.032 366.215 363.431 362.05H366.334C366.215 357.011 372.97 357.808 371.311 363.748H376.288C380.289 366.565 381.864 368.638 383.338 373.506C382.335 376.73 384.997 380.294 387.486 381.991Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path
                    id='Ханты-Мансийский автономный округ - Югра'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M489.952 379.022L479.583 381.143H475.825C474.21 375.616 471.711 377.335 466.286 383.264H458.406C458.61 378.838 456.624 377.651 449.696 377.324L443.89 372.658H439.743L429.374 365.445H424.812V371.385H422.323L421.494 376.9V381.143L418.176 384.537L411.955 386.234C409.99 389.093 408.682 390.611 405.734 393.022L401.464 395.568L394.07 392.174V390.477H392.427L391.658 388.78H388.315L386.677 387.083L388.315 384.537C388.315 383.688 388.143 381.903 387.485 381.991C384.997 380.294 382.335 376.73 383.338 373.506C381.863 368.639 380.289 366.565 376.287 363.748H371.31C372.969 357.808 366.214 357.012 366.333 362.051H363.43C359.032 366.215 356.609 368.381 353.891 365.445L351.402 366.294H346.84L344.352 365.445V369.263C341.72 368.918 339.395 369.125 337.799 368.036C336.167 366.923 335.297 364.455 335.642 358.657H337.301C337.871 354.12 337.472 351.902 331.91 350.171V334.049H333.154L331.91 325.564L333.154 323.867V318.351L330.665 315.806V309.866L330.574 309.746C326.355 304.209 323.962 301.068 324.444 296.29C327.633 294.089 329.354 292.136 331.91 284.41C338.779 276.633 334.14 276.434 339.812 265.742L343.96 264.045V268.712L355.55 264.045L358.746 263.621L362.06 264.045L366.333 261.86L367.372 270.409L364.497 277.198L359.157 280.167L362.06 282.289L366.333 289.077L377.64 291.198L382.569 294.593L378.873 298.411L383.338 303.502L391.658 305.199L394.07 302.229L401.464 309.866L398.999 313.26L401.464 320.049L400.231 326.837H409.678L415.839 336.171L429.374 342.11L434.734 351.444H438.43L446.645 353.99L448.288 351.444L455.681 348.474L459.378 357.808L461.021 355.687L466.286 357.808V363.748H470.879L474.575 366.294L483.956 363.748C483.977 366.901 487.065 370.135 492.855 374.355L489.952 379.022Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path
                    id='Омская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M369.262 463.875L371.751 464.299L374.032 462.602L376.313 460.905L382.159 461.609L383.802 455.814L385.445 455.39L385.856 451.147L383.364 449.45L384.608 447.753V443.086L386.677 441.389L385.034 437.57L387.926 437.995L388.755 435.449L391.658 433.752H394.892H397.05L396.124 431.631L397.05 429.509L394.892 428.661L399 427.388L400.232 423.145V419.327V415.933H399L400.232 411.266V407.023L398.178 403.629L399 401.932V400.235L401.464 399.386V397.477H399L398.178 398.538H394.892L394.071 400.235H391.658L385.034 397.477L382.159 399.386L378.873 397.477H377.23L375.587 394.295L370.248 393.022L372.301 387.931L371.311 384.537L366.14 389.204L363.431 394.295V397.477L360.967 399.386L361.622 401.932H364.087V404.902L366.334 410.417L364.908 412.114L360.967 411.266V413.811H358.479V415.933L356.82 416.781V419.327L355.05 421.024L352.673 420.175L351.428 423.145L353.502 424.842L350.121 426.964L349.576 428.086C350.754 428.833 352.042 429.565 353.502 430.358L351.428 441.389C348.861 442.293 350.178 446.056 352.673 446.056H356.82C358.116 445.98 358.566 446.252 358.479 447.753L357.65 452.844H359.723V451.147H360.967L363.456 454.541H365.944C368.848 453.268 369.262 456.238 366.774 456.662L363.041 459.208V462.178L365.115 462.602C366.608 460.055 369.262 461.754 369.262 463.875Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path
                    id='Ямало-Ненецкий автономный округ'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M493.684 348.474L492.854 353.99C486.79 357.715 483.934 360.693 483.955 363.748L474.575 366.293L470.878 363.748H466.285V357.808L461.02 355.687L459.377 357.808L455.681 348.474L448.287 351.444L446.644 353.99L438.429 351.444H434.733L429.373 342.11L415.839 336.17L409.677 326.836H400.23L401.463 320.048L398.998 313.26L401.463 309.866L394.069 302.229L391.657 305.199L383.337 303.502L378.872 298.411L382.569 294.592L377.64 291.198L366.332 289.077L362.059 282.289L359.156 280.167L364.496 277.197L367.371 270.409L366.332 261.86L381.148 258.53C384.794 257.929 386.099 258.308 387.784 259.802C391.274 255.436 393.337 253.085 400.641 252.166V248.771L398.982 247.499V241.559C398.982 241.559 402.085 240.713 401.717 239.767L405.159 238.589L405.57 233.922L403.927 229.679L407.624 226.285L408.856 229.255L415.017 239.013L413.374 240.286L415.839 246.65V250.044L423.232 241.983L421.589 241.559V234.771L422.41 232.225L420.357 227.558L417.892 228.407L421.589 222.467L423.643 223.315L424.464 219.073L426.518 218.649V216.527L428.572 213.982V211.86L425.696 211.012L429.804 205.921H432.679L441.305 202.102L445.823 194.89L452.805 190.647L460.609 193.617L463.895 199.132L457.734 208.89L452.805 212.709L451.984 221.194L452.805 223.315L449.93 229.255L447.055 230.952V233.074L445.823 236.468L443.769 240.286L442.126 244.953L439.662 250.044L442.537 256.833L436.786 261.499L435.965 266.591L431.036 268.288L429.804 270.833H428.161L426.107 273.803L421.589 274.652V278.894H415.839L413.374 275.5L410.91 276.349L409.677 272.106L407.624 272.955L410.91 278.894L418.303 282.713L419.946 285.258H422.41L424.053 282.713L428.982 281.44L432.268 280.167L434.733 279.743L438.019 273.803L440.894 272.955L445.001 268.288V261.499L448.287 256.833H453.627H459.377L457.734 260.227L459.788 265.318L457.324 270.409L456.913 273.803L455.27 275.5L457.734 280.167H461.842L457.734 276.349L459.377 270.833L463.485 269.985L461.842 265.318L463.485 260.227L461.02 257.681L459.377 254.711L455.27 250.893L451.984 253.014L449.93 250.893H445.823L449.109 246.65V240.71L452.805 236.043L456.502 230.952V216.527L461.02 215.254V211.86L468.003 210.163L471.289 205.921V196.587V194.89L474.575 202.102L472.932 211.86L468.003 215.254V219.073L465.538 223.315L475.396 228.407V232.225L477.861 233.074V226.71L474.575 225.437L471.289 219.073L472.932 215.254H476.218L479.504 219.073L481.968 217.8L479.504 213.982L484.843 211.86L486.633 217.8H489.441C488.342 219.763 489.357 223.566 493.269 226.71L489.951 237.316C488.011 235.608 487.013 235.206 485.804 237.316C477.449 237.624 478.338 250.893 487.463 251.741L494.928 250.893C493.171 256.304 493.905 258.015 495.758 260.651V264.045L493.269 265.318C493.676 272.609 490.898 272.875 486.633 274.227L485.804 282.289L492.025 291.622L487.463 296.714L492.025 300.108L489.122 305.199L494.928 309.866C492.122 318.857 494.14 321.65 500.734 324.715L497.831 330.231L499.49 334.473L492.854 340.413L496.587 345.928L493.684 348.474Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <g
                    id='Ненецкий авт. округ'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    >
                    <path d="M294.145 200.927L295.762 192.442L295.319 187.677L304.118 183.01L306.172 178.343L305.351 175.797L310.69 173.676L318.905 167.312L319.727 159.675H321.369V164.342L325.066 167.312L326.709 172.828L325.477 177.919L322.191 182.161L316.03 178.343L315.208 178.767H313.565L310.69 179.616L311.922 184.707L309.869 186.404V189.798L316.03 195.314L318.905 193.192L322.191 191.071L324.245 188.95L328.352 192.344L330.406 190.647L335.335 192.344H345.192L348.068 195.314H351.764L359.158 196.162L359.979 197.859L356.693 199.981L355.05 203.375L352.586 204.648L355.05 205.92L356.693 208.89L358.336 206.769L363.676 207.193L367.373 209.739L369.016 213.133L371.069 212.284L371.48 211.012L375.177 212.709L380.516 213.981V218.648L378.463 217.8L376.409 222.042L379.284 223.315L380.516 220.77L381.749 219.921L383.802 221.194L386.677 220.77L389.553 217.8L387.91 216.527L389.142 213.981L390.785 208.89L393.177 209.739L395.303 208.466L398.178 211.012L403.929 216.527L407.625 222.467V226.285L403.929 229.679L405.572 233.922L405.161 238.589L401.718 239.767C401.565 239.373 400.812 238.963 398.984 238.589C395.713 238.696 394.623 239.391 393.177 241.559C390.604 238.221 388.297 239.2 383.223 244.529C377.812 240.765 370.646 242.279 369.112 245.377L359.158 243.68L325.066 212.284L306.172 211.534L301.195 206.867L294.974 207.715L294.145 200.927Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path d="M348.068 180.464C344.555 183.068 342.679 183.173 339.442 181.737C338.386 179.751 338.381 178.632 339.442 176.646L346.014 171.979C348.019 171.68 348.532 172.205 348.889 174.1C349.101 177.739 348.918 179.23 348.068 180.464Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                </g>

                <path
                    id='Новосибирская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M453.871 481.27L460.507 482.118C460.557 481.59 460.701 481.168 460.911 480.845L459.38 477.875L459.79 476.178V474.906L460.911 474.057L460.507 471.936L459.38 470.663C459.89 470.38 460.911 469.73 460.911 469.39V465.996L459.38 464.723L461.023 461.753C460.612 461.046 459.79 459.547 459.79 459.208V454.965H456.504L451.575 458.783L449.111 457.086L449.932 454.965V449.45L451.575 446.48L450.754 445.631H447.879H437.281L435.146 440.964H428.985L425.668 432.903L417.895 427.388L417.073 424.842L400.233 419.327V423.145L399.001 427.388L394.893 428.661L397.051 429.509L396.125 431.63L397.051 433.752H394.893H391.659L388.756 435.449L387.927 437.994L385.035 437.57L386.678 441.389L384.609 443.086V447.753L383.365 449.45L385.857 451.147L385.446 455.389L383.803 455.814L382.16 461.608L383.365 461.753L384.609 460.056L387.927 460.48L388.756 459.208L392.074 458.783C395.567 458.653 395.807 461.753 393.733 462.178H391.245L391.659 465.147L397.051 477.875C399.334 477.077 400.575 476.727 402.028 477.451H412.811L425.668 474.481C428.984 469.288 432.304 470.663 431.06 474.906L436.866 478.724L437.281 481.694L439.77 485.088L445.991 480.845C449.524 480.487 451.649 480.129 453.871 481.27Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                <path
                    id='Кемеровская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M476.681 510.968V508.423V499.937C475.599 499.1 475.261 498.586 476.266 497.392C476.89 495.365 475.759 495.248 473.363 495.27L465.483 482.118C464.453 480.012 461.919 479.297 460.911 480.845L459.379 477.876L459.79 476.178V474.906L460.911 474.057L460.506 471.936L459.379 470.663C459.889 470.38 460.911 469.73 460.911 469.39V465.996L459.379 464.723L461.022 461.753C460.611 461.046 459.79 459.547 459.79 459.208V454.965L463.076 453.692L463.897 454.117H469.237L475.398 449.45C475.672 449.733 476.301 450.298 476.63 450.298C477.041 450.298 478.498 449.45 479.095 449.874C479.691 450.298 479.916 451.995 480.327 451.995C480.738 451.995 482.791 450.723 483.202 450.723H484.845V451.571L486.488 452.844C488.268 451.854 491.91 449.874 492.238 449.874H494.292L494.703 451.995L493.471 452.844C493.881 454.258 494.785 457.087 495.114 457.087C495.442 457.087 497.715 460.481 498.81 462.178L498.399 464.511C495.581 464.962 494.179 465.58 493.271 467.269C492.561 476.459 491.886 480.228 489.953 482.967L490.368 485.088C493.451 483.134 494.704 482.922 495.759 485.088V490.179L490.368 496.543V511.393L488.294 515.635L483.317 517.332L482.488 513.938L476.681 510.968Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                <path
                    id='Томская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M506.959 436.722L503.226 438.419L501.152 439.044L499.908 440.964L497.005 441.813L494.704 445.631L495.76 446.48L494.293 449.874H492.24C491.911 449.874 488.269 451.854 486.489 452.844L484.846 451.571V450.722H483.203C482.793 450.722 480.739 451.995 480.328 451.995C479.917 451.995 479.692 450.298 479.096 449.874C478.499 449.45 477.042 450.298 476.631 450.298C476.303 450.298 475.673 449.732 475.399 449.45L469.238 454.117H463.898L463.077 453.692L459.791 454.965H456.505L451.576 458.783L449.112 457.086L449.933 454.965V449.45L451.576 446.48L450.755 445.631H447.879H437.282L435.146 440.964H428.985L425.669 432.903L417.895 427.388L417.074 424.842L400.233 419.327V415.933H399.001L400.233 411.266V407.023L398.18 403.629L399.001 401.932V400.235L401.466 399.386V397.477V395.568L405.736 393.022C408.684 390.611 409.992 389.093 411.957 386.234L418.178 384.537L421.496 381.143V376.9L422.326 371.385H424.814V365.445H429.376L439.745 372.657H443.892L449.699 377.324C456.626 377.651 458.612 378.838 458.408 383.264H466.288C471.713 377.335 474.212 375.616 475.827 381.143H479.585L482.074 388.355L480.83 398.113H489.125L498.664 406.174L499.908 411.266L504.47 409.144L505.714 414.66H502.396L497.005 426.539L505.714 433.327L506.959 436.722Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                <path
                    id='Алтайский край'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M436.866 523.696C439.668 528.221 437.019 528.09 437.61 531.757L442.128 530.06C440.804 525.851 443.675 526.575 444.331 523.696C445.125 521.555 452.66 520.658 455.115 521.575C455.556 521.74 462.442 515.777 465.898 513.09L471.264 515.635L472.534 508.423H476.681V499.937C475.6 499.099 475.261 498.586 476.267 497.392C476.891 495.365 475.759 495.248 473.363 495.27L465.483 482.118C464.454 480.012 461.92 479.297 460.911 480.845C460.701 481.168 460.557 481.59 460.506 482.118L453.871 481.27C451.649 480.129 449.524 480.487 445.99 480.845L439.769 485.088L437.281 481.694L436.866 478.724L431.06 474.906C432.304 470.663 428.984 469.288 425.668 474.481L412.811 477.451H402.028C400.575 476.727 399.333 477.077 397.051 477.875C404.374 498.94 404.775 506.518 405.735 520.302H406.979C413.584 511.667 416.083 511.591 417.348 521.575L426.887 525.393C429.773 523.465 431.977 523.177 436.866 523.696Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                <path
                    id='Республика Алтай'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M458.97 550V554.667L462.667 561.031L469.649 559.238L470.749 556.789L472.524 555.94L474.894 557.213L475.413 556.789H482.489L486.49 555.092L486.079 551.91L485.668 548.728L484.025 547.031L485.668 543.636L486.49 545.334H488.296L488.954 544.061L486.49 539.818L482.489 533.03L483.319 529.211L481.561 526.666L479.096 530.06L477.043 529.211L473.346 526.242L475.81 523.272L474.578 521.999L476.683 518.18L480.739 516.908L483.319 517.332L482.489 513.938L476.683 510.968V508.422H472.535L471.265 515.635L465.899 513.089C462.443 515.776 455.557 521.739 455.116 521.575C452.662 520.658 445.126 521.554 444.333 523.696C443.676 526.575 440.805 525.85 442.129 530.06L437.611 531.757C439.274 534.752 441.017 540.26 443.362 542.364C441.314 547.455 448.68 554.455 453.22 551.91L457.311 549.152L458.97 550Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                <path
                    id='Республика Хакасия'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M488.293 515.635L483.317 517.332L480.737 516.908L476.681 518.181L474.576 521.999L475.808 523.272L473.344 526.242L477.04 529.211L479.094 530.06L481.559 526.666L484.845 526.242L484.023 527.939L486.488 527.514L488.952 528.787L491.006 526.242H492.649L493.245 521.575L494.292 519.878L497.167 519.453L501.151 521.575L509.445 512.241L510.69 509.695L515.667 503.755L512.349 498.24L513.178 488.906L509.445 484.239C509.667 475.033 506.887 475.111 501.151 476.602L493.27 467.269C492.561 476.459 491.886 480.227 489.953 482.966L490.367 485.088C493.45 483.133 494.704 482.922 495.759 485.088V490.179L490.367 496.543V511.392L488.293 515.635Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                <path
                    id='Республика Тыва'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M567.898 511.817H572.046C572.609 512.519 573.117 513.082 573.582 513.514L572.743 514.787L573.29 516.484L572.332 519.029L570.69 521.575V523.272L572.743 524.545L572.046 529.636L570.279 530.909L567.069 532.606L566.582 536.424H564.118L562.475 543.212L564.118 544.485L563.707 547.455L565.41 549.152L566.171 552.546L564.118 557.637L560.01 558.062L560.848 559.759C559.691 562.958 558.214 561.746 555.041 557.637C552.411 560.598 550.817 561.066 547.576 556.789C544.175 558.406 542.602 558.743 540.94 557.637C539.749 558.177 537.202 556.808 534.955 555.94L533.744 555.565C532.674 555.299 531.735 555.191 530.848 554.668C530.156 550.849 529.947 547.455 529.615 547.455C529.284 547.455 524.765 547.879 521.862 547.879V543.637L519.373 546.182L516.47 543.637L514.396 539.394L512.323 542.364L506.516 543.637L505.134 545.334L502.369 546.182L499.22 545.334H496.756L495.935 547.031L497.167 549.454L493.245 550.001L492.078 551.273L486.077 551.91L485.666 548.728L484.023 547.031L485.666 543.637L486.487 545.334H488.293L488.952 544.061L486.487 539.818L482.487 533.03L483.317 529.212L481.559 526.666L484.844 526.242L484.023 527.939L486.487 527.515L488.952 528.787L491.006 526.242H492.649L493.245 521.575L494.292 519.878L497.167 519.454L501.15 521.575C498.687 526.951 512.757 524.688 526.45 524.545C530.017 517.58 532.226 514.349 538.063 514.787L538.091 514.631C539.317 507.831 540.013 503.972 547.187 505.453C552.611 504.852 555.462 504.442 556.285 502.059L562.092 507.15L567.898 511.817Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <g
                    id='Красноярский край'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                >
                    <path id='' d="M630.939 193.617L628.865 193.193H626.818C624.937 192.413 624.026 192.24 623.085 193.193L622.255 196.587C621.841 199.133 624.744 199.557 625.573 198.284L625.988 197.011C628.036 196.194 628.415 196.871 628.451 199.133L625.988 200.405L623.5 203.8L621.841 200.83L620.597 200.405C620.794 202.641 618.053 206.053 616.449 205.921C615.981 205.882 613.546 206.628 612.302 206.769L609.813 210.164L612.716 211.012L612.302 212.709L608.154 212.285V207.194L610.228 205.072L623.085 190.647V188.526L631.795 180.465L632.209 177.919C636.628 172.475 639.351 169.336 635.527 166.888H633.039C629.721 166.04 631.467 162.37 633.453 164.343L635.942 163.494L634.698 160.949L633.453 156.282H632.209L630.965 160.1L629.306 154.585L627.647 155.433C626.607 149.44 624.411 150.014 619.767 152.888H610.228C610.936 155.217 611.028 156.354 610.228 157.979L606.081 157.13L607.325 154.585C610.49 148.436 609.043 147.33 601.104 149.069C594.468 150.523 594.053 146.948 601.104 146.099C604.422 146.099 605.15 142.338 601.104 141.008L591.979 139.735L587.417 145.251L581.611 151.191V157.979L583.27 159.252V160.949L579.952 158.827H574.975L579.952 163.494V166.464L577.049 163.07H572.486L571.657 166.464L567.509 166.888L567.095 165.191L563.777 163.07L552.164 163.494L557.141 166.464H553.408L552.164 167.737H542.625L538.063 171.131L537.648 169.01H536.404L531.012 174.525L527.279 173.252L529.353 177.919L528.109 176.647L523.962 180.889L522.303 178.344L520.644 179.192L525.206 185.98L522.717 183.011L519.814 184.283L525.206 190.647C524.813 195.666 524.099 196.842 522.303 197.011C522.303 197.011 518.939 197.945 517.74 196.587C515.973 194.585 522.717 191.92 522.717 191.92H517.74C516.773 192.499 517.057 195.018 514.837 191.92C514.837 191.92 504.45 191.685 501.151 190.647V202.103C499.767 206.356 499.071 208.706 504.469 210.164L505.713 217.8C505.298 219.356 504.469 222.637 504.469 223.316C504.469 223.995 503.363 230.104 502.81 233.074C502.257 236.044 500.321 234.347 499.906 233.074C499.492 231.801 501.151 226.71 501.151 226.71L504.469 220.346L497.833 215.255V210.164L489.953 204.224V207.618L493.271 211.861C495.002 214.971 494.634 215.916 492.441 216.528C488.039 215.924 487.464 222.043 493.271 226.71L489.953 237.317C488.013 235.608 487.015 235.206 485.805 237.317C477.45 237.624 478.34 250.893 487.464 251.742L494.929 250.893C493.172 256.304 493.906 258.015 495.759 260.651V264.045L493.271 265.318C493.677 272.609 490.899 272.875 486.635 274.228L485.805 282.289L492.026 291.623L487.464 296.714L492.026 300.108L489.123 305.199L494.929 309.866C492.124 318.857 494.141 321.65 500.736 324.716L497.833 330.231L499.492 334.474L492.856 340.413L496.588 345.929L493.685 348.474L492.856 353.99C486.792 357.715 483.935 360.694 483.956 363.748C483.978 366.901 487.065 370.135 492.856 374.355L489.953 379.022L479.584 381.143L482.072 388.355L480.828 398.114H489.123L498.662 406.175L499.906 411.266L504.469 409.145L505.713 414.66H502.395L497.003 426.539L505.713 433.328L506.957 436.722L503.224 438.419L501.151 439.044L499.906 440.965L497.003 441.813L494.703 445.631L495.759 446.48L494.292 449.874L494.703 451.995L493.47 452.844C493.881 454.258 494.785 457.087 495.113 457.087C495.442 457.087 497.715 460.481 498.81 462.178L498.399 464.511C495.58 464.962 494.179 465.58 493.271 467.269L501.151 476.603C506.887 475.111 509.667 475.034 509.446 484.24L513.178 488.907L512.349 498.24L515.667 503.756L510.69 509.696L509.446 512.241L501.151 521.575C498.687 526.952 512.758 524.688 526.45 524.545C530.017 517.58 532.226 514.35 538.063 514.787L538.091 514.631C539.318 507.831 540.014 503.973 547.187 505.453C552.611 504.852 555.463 504.443 556.286 502.059L547.991 494.846L551.723 490.604C553.46 490.512 554.171 490.718 554.627 491.876C556.15 493.04 556.994 492.296 558.359 487.634V471.087C558.597 468.407 559.458 467.496 562.507 467.269L564.995 463.451V452.844L561.677 451.571C565.024 443.345 566.472 440.588 567.898 439.267C572.062 441.72 574.361 442.379 578.267 441.813C579.449 438.829 582.829 435.449 583.244 441.813C583.659 448.177 588.588 448.58 588.221 443.934V440.965L590.294 438.843V434.601L596.101 431.631C597.898 430.075 601.493 426.709 601.493 425.691V418.903H604.396L610.617 427.388C613.105 430.358 620.778 426.252 620.985 420.175C617.427 415.97 617.658 414.038 621.4 411.266L621.815 403.205C617.086 403.908 615.476 402.69 615.179 397.265V390.901C615.179 390.901 616.492 390.079 617.514 388.78C617.531 387.156 618.738 382.109 623.265 382.416C624.689 382.437 624.102 384.06 623.889 378.173L627.207 374.355V369.688L622.23 365.021V362.9L623.889 362.475V359.081L625.133 358.657V347.202H630.524C633.499 345.629 634.67 344.511 634.257 341.262L630.939 342.535L628.036 340.838L623.474 339.565L622.23 336.595L624.718 334.049L622.23 329.807L624.718 327.685V323.443L623.059 322.594L622.23 314.109L620.985 311.563L619.327 302.654L615.179 301.805V300.108L618.082 299.684L621.815 295.017V272.955L614.764 265.743L614.35 261.5H621.815L625.548 257.257L627.207 258.53L630.11 257.257L630.524 249.62L633.842 246.226V242.408L641.723 236.892L642.552 233.923L638.405 233.074L637.16 219.922L634.257 219.073L629.695 211.436L629.28 205.072L628.036 204.224L628.451 200.83L630.939 199.133L629.695 197.011L630.939 193.617Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M590.32 133.371L583.27 133.796L581.196 135.917C578.708 138.463 577.28 136.135 579.122 132.947L579.952 125.31L582.025 124.038V121.068L583.27 119.795L584.099 114.704L585.343 116.825H587.002L587.832 113.855L589.491 115.128L587.832 122.765H589.491V119.795C589.491 116.825 593.638 116.825 594.053 119.371C593.962 121.75 594.555 122.578 596.956 122.765V128.704C593.644 129.554 592.253 130.629 590.32 133.371Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M579.952 119.795L577.878 122.765C573.761 122.716 570.637 123.051 570.827 121.068C570.152 119.783 569.327 119.542 567.095 119.795C563.362 120.219 559.937 117.875 561.703 113.855L557.97 113.007L557.556 110.885L559.629 109.612L560.874 107.491H563.362C563.334 104.472 564.04 103.361 567.095 102.824C568.124 104.003 568.889 104.046 570.827 102.824L573.731 104.521L571.657 106.643C570.295 109.73 571.657 110.461 574.145 106.218L575.39 102.824L579.122 106.218C578.43 109.886 578.726 112.255 579.952 116.825H578.293L577.878 119.371L579.952 119.795Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M573.316 95.1874C570.556 96.7262 570.631 97.9327 571.657 100.279H564.192L562.533 102.824L559.629 103.673L556.311 101.976L557.97 100.279H554.652V97.733H556.311V96.036L557.556 95.1874C558.281 90.4001 559.728 88.7376 565.021 87.9749L565.436 86.2778H567.095C567.809 90.4283 569.538 92.2352 573.316 95.1874Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M557.97 108.34L559.215 104.521L554.238 102.4L552.579 104.097L552.164 106.643L554.238 107.491L553.408 109.188L555.897 110.461L557.97 108.34Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M567.095 150.342L567.509 147.796L566.68 146.948L562.118 150.342L565.85 151.615L567.095 150.342Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M567.924 160.949L568.754 162.646L563.362 161.797L562.947 160.524L567.924 160.949Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path d="M495.759 200.83V194.89C495.759 193.193 494.075 193.617 493.271 194.89L491.586 196.587C490.528 197.966 491.171 198.708 491.586 199.133L493.271 200.83C494.489 202.527 495.759 202.103 495.759 200.83Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />

                </g>

                <path
                    id='Иркутская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M636.745 342.535L634.257 341.262C634.67 344.511 633.498 345.629 630.524 347.201H625.132V358.657L623.888 359.081V362.475L622.229 362.899V365.021L627.206 369.688V374.354L623.888 378.173C624.101 384.06 624.689 382.437 623.264 382.416C618.738 382.109 617.531 387.156 617.514 388.78C616.492 390.079 615.179 390.901 615.179 390.901V397.265C615.476 402.69 617.085 403.908 621.814 403.205L621.4 411.266C617.658 414.038 617.427 415.97 620.985 420.175C620.777 426.251 613.105 430.358 610.616 427.388L604.395 418.902H601.492V425.691C601.492 426.709 597.898 430.075 596.1 431.63L590.294 434.6V438.843L588.22 440.964V443.934C588.588 448.579 583.658 448.177 583.243 441.813C582.829 435.449 579.448 438.829 578.266 441.813C574.361 442.378 572.062 441.72 567.898 439.267C566.472 440.588 565.024 443.345 561.677 451.571L564.995 452.844V463.45L562.506 467.269C559.457 467.496 558.597 468.407 558.359 471.087V487.634C556.993 492.296 556.15 493.04 554.626 491.876C554.171 490.718 553.46 490.512 551.723 490.603L547.99 494.846L556.285 502.059L562.092 507.15L567.898 511.817H572.045C572.609 512.519 573.117 513.082 573.582 513.514C575.761 515.538 577.002 514.69 578.681 511.817L582.829 508.847H586.561L592.782 517.757H596.1L600.663 524.969C605.976 526.335 608.538 527.612 612.275 530.909V536H618.496C618.22 537.697 617.667 541.176 617.667 541.515C617.667 541.855 619.049 541.657 619.741 541.515L621.4 540.243L628.035 539.394L628.865 534.303L624.303 534.727C616.008 534.303 619.741 529.212 624.303 530.909C627.206 531.333 626.376 528.363 626.376 527.515H630.109L631.768 524.969L634.257 523.696L635.501 519.029L643.796 510.544L642.551 507.574L653.749 494.846L655.408 487.634V466.42L657.897 463.026L653.749 461.329C650.425 457.314 651.792 454.98 659.141 450.722L660.385 445.631L664.118 447.328H671.998C673.544 443.197 675.918 443.513 681.952 447.328H685.685L689.417 449.025L694.809 445.207L696.883 439.692H699.786L703.104 437.146L705.178 437.994L703.933 441.813H709.74C711.164 438.994 712.45 438.224 715.546 437.994C717.435 436.628 717.354 435.526 716.376 433.328L710.984 432.479L709.74 429.509L711.813 421.448V418.902L710.984 417.205L713.887 416.357L716.376 411.69H717.62L718.449 415.084L725.5 414.236L724.256 409.144L720.523 404.477L719.279 401.083L718.449 397.689L715.546 396.841L713.887 395.992L712.228 396.841L708.496 399.81L705.178 400.235L704.348 391.749L699.786 388.78L694.809 386.234L691.076 388.78L681.952 399.81L680.708 407.447L676.975 411.69L678.219 414.66L677.805 416.357H675.731L674.901 411.69L671.998 407.447L669.095 411.69H665.362L660.385 419.327H655.408L652.505 415.508L653.749 413.387L654.579 407.447L652.92 405.75V402.78L654.579 395.992L655.408 388.78L654.579 384.961H651.676C651.59 380.106 651.048 378.49 647.528 380.718V378.173L647.943 375.627C651.676 372.233 649.832 367.802 647.528 368.839L645.033 366.718C648.035 355.811 645.525 352.937 640.892 351.444L636.745 349.323L635.916 347.626L637.575 345.08L636.745 342.535Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path
                    id='Республика Бурятия'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M656.238 552.546V555.516C645.451 549.56 641.399 548.854 631.768 550.425C626.302 551.316 623.424 556.938 618.497 555.516L610.617 552.546C607.203 551.634 607.943 547.482 604.81 538.121C597.64 536.853 593.936 535.882 591.124 530.908C587.525 535.426 585.093 536.174 578.681 528.363H575.364L572.743 524.544L570.689 523.272V521.575L572.332 519.029L573.29 516.483L572.743 514.786L573.582 513.513C575.761 515.538 577.003 514.69 578.681 511.816L582.829 508.847H586.562L592.783 517.756H596.101L600.663 524.969C606.435 526.394 608.823 527.805 612.276 530.908V536H618.497C618.22 537.697 617.667 541.176 617.667 541.515C617.667 541.854 619.05 541.656 619.741 541.515L621.4 540.242L628.036 539.394L628.865 534.303L624.303 534.727C616.008 534.303 619.741 529.211 624.303 530.908C627.206 531.333 626.377 528.363 626.377 527.514H630.109L631.768 524.969L634.257 523.696L635.501 519.029L643.796 510.544L642.552 507.574L653.75 494.846L655.409 487.633V466.42L657.897 463.026L653.75 461.329C650.425 457.314 651.793 454.979 659.141 450.722L660.386 445.631L664.118 447.328H671.998C673.544 443.197 675.918 443.512 681.952 447.328H685.685L689.417 449.025L694.809 445.207L696.883 439.691H699.786L703.104 437.146L705.178 437.994L703.934 441.812L701.86 443.934L706.422 445.207L710.984 461.329H715.546C722.212 465.378 723.556 467.779 720.523 472.36L715.546 474.905L710.984 478.299V481.693C706.345 488.305 703.355 491.022 697.712 494.846L703.104 503.331L699.786 509.271H696.883C693.37 510.746 691.752 512.462 689.417 516.908L688.588 515.635C686.929 517.756 683.528 522.168 683.196 522.847C682.865 523.526 681.123 523.696 680.293 523.696C679.187 524.969 676.809 527.684 676.146 528.363C675.482 529.042 673.381 528.08 672.413 527.514L664.948 532.181L661.63 530.484C660.524 531.615 658.229 534.048 657.897 534.727C657.565 535.406 660.247 537.272 661.63 538.121L656.238 543.212V546.182L662.459 547.455L660.8 550.425L656.238 552.546Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path
                    id='Забайкальсий край'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M725.502 418.054V414.236L718.452 415.084L717.622 411.69H716.378L713.889 416.357L710.986 417.205L711.816 418.902V421.448L709.742 429.509L710.986 432.479L716.378 433.328C717.357 435.526 717.437 436.628 715.548 437.994C712.452 438.224 711.166 438.994 709.742 441.813H703.936L701.862 443.934L706.424 445.207L710.986 461.329H715.548C722.214 465.378 723.558 467.779 720.525 472.36L715.548 474.906L710.986 478.3V481.694C706.348 488.306 703.357 491.023 697.715 494.846L703.106 503.331L699.788 509.271H696.885C693.372 510.747 691.754 512.463 689.42 516.908L688.59 515.635C686.931 517.757 683.53 522.169 683.198 522.848C682.867 523.527 681.125 523.696 680.295 523.696C679.189 524.969 676.811 527.684 676.148 528.363L672.615 527.515L664.95 532.182L661.632 530.485C660.526 531.616 658.231 534.048 657.899 534.727C657.567 535.406 660.249 537.273 661.632 538.121L656.24 543.213V546.182L662.461 547.455L660.802 550.425L656.24 552.546V555.516L661.632 555.092C661.632 561.032 662.461 563.153 667.853 563.153C668.595 563.153 682.231 562.729 689.005 562.305C694.172 558.32 696.313 556.348 704.765 553.819C706.009 552.688 708.581 550.34 708.913 550.001C709.244 549.661 711.539 545.9 712.645 544.061L717.207 540.667L724.258 542.364L726.746 544.061L731.723 542.788L735.456 539.394L739.603 540.667L745.41 544.061H752.046V540.243L753.705 539.394L754.949 536.424L760.341 532.182L761.17 529.212L759.096 524.969L761.17 522.848V516.908L762.414 507.998L765.317 503.756V493.573L764.073 491.452L758.267 492.301V488.906L760.755 483.815L764.073 481.694L766.562 478.3L759.926 467.693L762.414 463.026L760.755 461.329L758.267 460.056L759.926 456.238L756.608 445.631H754.119V449.025H752.46L752.046 445.207L749.142 441.813L742.921 447.328L740.848 445.631L741.677 443.934L739.603 442.661L743.751 439.692L742.921 437.994L736.286 437.146L735.041 434.6V430.358L730.894 425.691L725.502 418.054Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <g
                    id='Республика Саха (Якутия)'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                >
                    <path id='' d="M868.172 125.31V119.794L882.273 129.553L882.688 133.371L878.541 136.765V141.008L874.393 144.402L874.808 148.22L871.905 151.19L871.49 156.706L875.223 158.827L873.149 160.948L876.052 163.918L887.25 165.615L889.739 172.828L892.227 173.252L892.642 176.222L889.739 177.07L889.324 183.01H887.25V181.313L885.177 181.737V184.283L882.688 184.707L873.149 190.647L875.637 194.89L872.319 195.314V198.708L877.296 202.102L876.052 205.072L880.614 211.436L883.518 212.285L886.835 215.679L886.421 219.921L883.103 220.346L877.296 226.71V228.831L878.126 229.679L876.467 230.952L872.319 227.982L871.075 229.255L870.246 232.649L868.172 234.771L864.025 236.468V237.741L867.757 239.862L868.172 244.953L866.513 245.802L865.269 244.529L862.78 244.953L861.951 248.347L858.218 248.771V253.014L856.145 253.863L855.315 255.135L860.292 260.651L860.707 265.318L863.195 267.863L864.439 271.682L863.195 273.803L866.928 276.773V281.864V286.955L865.269 287.804L861.951 285.683L858.633 286.107L857.804 290.35L849.923 291.622L847.435 289.501L844.117 290.774L839.969 288.653L839.14 290.35L841.214 295.865V308.169L838.311 311.139V314.957L836.237 317.078L840.384 322.17L845.361 329.806L846.191 334.898L842.458 345.08L835.407 345.928L833.334 347.201V353.565L829.601 356.959L821.721 358.232L819.232 360.778V367.142L816.744 368.839L815.914 371.809L820.062 381.567L814.67 382.84L820.477 384.537L821.721 386.234L818.818 389.628L817.573 393.871L824.624 397.689L827.942 401.507L823.38 406.174L825.868 409.144L824.209 410.841V415.508L818.403 419.751H815.085L813.011 421.024L811.352 426.963L801.813 426.539L800.569 429.933L796.836 429.085L793.933 433.327L788.127 435.024H783.979L781.491 433.327L777.343 436.297L766.56 428.66L764.072 429.933L755.777 430.357L754.118 428.236L741.675 429.509L735.04 430.357L730.892 425.691L725.501 418.054V414.235L724.256 409.144L720.524 404.477L719.279 401.083L718.45 397.689L715.547 396.84L713.888 395.992L712.229 396.84L708.496 399.81L705.178 400.235L704.349 391.749L699.786 388.779L694.81 386.234L691.077 388.779L681.952 399.81L680.708 407.447L676.976 411.69L678.22 414.66L677.805 416.357H675.731L674.902 411.69L671.999 407.447L669.095 411.69H665.363L660.386 419.327H655.409L652.506 415.508L653.75 413.387L654.58 407.447L652.92 405.75V402.78L654.58 395.992L655.409 388.779L654.58 384.961H651.676C651.591 380.106 651.048 378.49 647.529 380.718V378.173L647.944 375.627C651.676 372.233 649.833 367.802 647.529 368.839L645.034 366.718C648.036 355.811 645.526 352.937 640.893 351.444L636.746 349.323L635.916 347.626L637.575 345.08L636.746 342.534L634.257 341.262L630.939 342.534L628.036 340.837L623.474 339.564L622.23 336.595L624.718 334.049L622.23 329.806L624.718 327.685V323.442L623.059 322.594L622.23 314.108L620.985 311.563L619.327 302.653L615.179 301.805V300.108L618.082 299.683L621.815 295.017V272.955L614.764 265.742L614.35 261.499H621.815L625.548 257.257L627.207 258.53L630.11 257.257L630.524 249.62L633.842 246.226V242.407L641.723 236.892L642.552 233.922L638.405 233.074L637.16 219.921L634.257 219.073L629.695 211.436L629.28 205.072L628.036 204.224L628.451 200.829L630.939 199.132L629.695 197.011L630.939 193.617L628.866 193.193L629.28 191.071L630.939 190.647L633.842 194.89L637.16 195.314L638.819 191.92L641.308 194.89L640.478 197.86L641.723 199.132V202.526L643.796 200.405L642.552 199.132V195.314H646.285L648.773 191.496L660.801 190.647L665.363 191.92L662.874 193.617L662.045 197.435H668.266V193.617L671.999 194.465L671.584 197.435C674.211 196.587 679.63 194.805 680.293 194.465C680.957 194.126 686.1 194.89 688.588 195.314L687.344 189.798H684.026L683.611 185.556L682.367 185.132V183.01L686.515 183.434L686.1 180.465L688.588 179.616L690.662 183.01H692.736L693.98 179.616L695.224 183.01H696.054L697.298 178.768L699.786 179.192L700.201 180.465H706.008L710.985 184.283L710.155 186.404V188.526L708.081 191.071L708.911 191.92L712.644 190.223L715.132 193.617L714.302 197.435L711.399 194.89L709.326 196.587L715.132 200.405L716.791 197.435L719.279 199.557L717.206 200.829L725.086 207.618L733.381 210.163L735.04 206.769L732.551 198.284V188.101L741.261 194.89L745.408 192.344V188.101L749.141 185.556L749.97 187.253H754.947L755.777 186.404L758.265 188.526L761.168 188.101L758.68 183.859V180.465L764.901 179.616L763.657 174.949L760.339 173.252L761.998 169.009H759.509L758.68 171.555L756.606 170.282V166.888L760.339 163.918V160.948L757.85 158.827L758.68 157.554L764.901 156.281L774.855 149.069L783.565 148.22L779.002 151.614L778.173 156.281L782.32 152.463L784.394 154.16L785.638 161.373L788.127 154.16L785.638 147.372L796.836 141.008L801.398 144.402L798.495 146.948V149.493L801.398 146.948L807.205 145.675L808.864 147.372L809.693 145.25H817.988L816.744 149.069L823.38 143.978L825.868 142.705L828.357 134.644L835.407 126.583L843.288 121.492L855.315 125.31L856.559 129.128H862.366V126.583H864.439L868.172 130.825V125.31Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M756.606 150.766L752.044 155.009H750.385L749.97 153.312L751.629 152.463V146.099L753.703 144.826L754.532 141.432H756.191L757.85 142.705L759.095 141.432L764.901 141.008V143.978H767.804L768.219 146.099L764.901 147.372L762.827 149.917L756.606 150.766Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M749.97 142.281V145.675L748.311 146.099L744.579 142.705L745.408 140.159H747.897L749.97 142.281Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M732.966 155.009L731.307 153.312L729.648 153.736L730.477 152.463L729.233 152.039L727.159 153.312L727.574 154.584L729.648 154.16V155.857H731.722L732.966 155.009Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M720.109 138.462L718.865 139.311L717.62 135.492C717.206 134.644 716.293 132.862 715.961 132.522C715.63 132.183 716.1 130.684 716.376 129.977L720.109 134.22V138.462Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M742.505 119.794L740.846 117.673L742.505 113.006H745.408H752.044L751.629 117.249L752.873 118.522V121.916L749.556 122.764L748.311 123.825L749.141 124.037H752.459V126.158L748.311 126.583L747.897 130.401L746.238 130.825L745.408 129.553H744.579L740.846 135.492L737.528 134.644L738.357 137.189V139.311H731.722L725.915 134.644L727.574 133.795L723.841 130.825L725.086 127.431L723.427 126.583V124.037L726.33 123.613V121.916L728.818 121.067C729.786 121.774 731.805 123.358 732.136 124.037C732.468 124.716 735.316 123.471 736.698 122.764L733.795 119.794V115.552L735.454 114.703L736.284 116.4H739.602L740.016 118.522L739.602 120.643L742.92 124.037L742.505 119.794Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M775.684 106.218L771.537 113.855L758.265 114.703L756.606 110.885L755.777 107.915H758.265V109.612L759.095 110.461L760.339 107.491L762.413 107.915V106.218L764.072 105.369V107.491L765.73 107.915V104.521H767.804L768.219 103.672H771.537L775.684 106.218Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M632.209 185.556L630.939 186.829L633.039 187.677L633.454 188.95L638.016 188.526V182.586H633.039L632.209 185.556Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                </g>

                <path
                    id='Амурская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M741.677 429.509L735.041 430.357V434.6L736.285 437.146L742.921 437.994L743.751 439.691L739.603 442.661L741.677 443.934L740.847 445.631L742.921 447.328L749.142 441.813L752.045 445.207L752.46 449.025H754.119V445.631H756.608L759.926 456.238L758.267 460.056L760.755 461.329L762.414 463.026L759.926 467.693L766.561 478.299L774.027 476.178L781.492 471.087L785.64 469.814L789.372 471.087L793.105 471.935L796.838 469.814L797.667 471.087C798.635 470.946 800.902 470.748 802.229 471.087C803.888 471.511 802.229 472.36 802.229 472.784C802.229 473.123 805.824 474.057 807.621 474.481C808.727 475.33 810.939 477.112 810.939 477.451C810.939 477.79 812.874 479.289 813.842 479.997V482.542L817.16 484.663L815.916 485.936L819.234 488.906C819.787 490.179 820.976 492.809 821.308 493.149C821.639 493.488 823.658 494.422 824.626 494.846V496.967L826.699 498.664L827.529 501.21C828.496 502.2 830.764 504.18 832.091 504.18C833.75 504.18 832.091 507.15 832.091 507.998C832.091 508.847 837.068 509.695 837.897 509.695C838.561 509.695 840.939 508.564 842.045 507.998L844.533 509.695L850.34 508.847H856.146L861.123 510.968H865.685H869.003L870.247 505.453L869.003 503.685L862.782 494.846L861.123 487.209H856.146L854.072 476.178L856.146 474.481V469.814L860.293 465.571L861.123 461.329L865.685 456.238L860.293 447.328L874.395 446.479V444.358L871.906 440.115V437.57L872.736 434.6L868.173 429.933L862.782 434.6H858.634L856.146 442.661L851.169 444.358C850.893 445.348 850.174 447.328 849.51 447.328C848.847 447.328 845.916 446.197 844.533 445.631L839.556 440.964L832.92 442.661L830.432 440.964L832.92 434.6L837.483 432.903V422.721L842.874 413.387L840.386 409.144H837.483L832.92 413.387L827.114 414.235L824.211 415.508L818.404 419.751H815.087L813.013 421.024L811.354 426.963L801.815 426.539L800.571 429.933L796.838 429.085L793.935 433.327L788.128 435.024H783.981L781.492 433.327L777.345 436.297L766.561 428.66L764.073 429.933L755.778 430.357L754.119 428.236L741.677 429.509Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path
                    id='Магаданская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M863.195 273.803L866.927 276.773V281.864L871.489 278.47L876.052 276.349L881.858 278.47L885.591 283.561L886.835 288.652L885.176 291.198V297.138L888.494 299.259L892.227 296.289L899.277 295.441L902.18 298.411V302.229L909.231 300.532L910.06 295.865L915.452 296.289L916.281 293.744L914.623 291.622L916.281 289.501L913.378 287.38L916.281 283.561L920.844 282.713L923.747 283.561L924.576 279.743L929.553 277.197L930.383 279.319H932.042L934.115 277.197L935.36 278.47L933.286 280.591L929.553 284.41L933.286 286.107L936.604 283.985L938.263 279.319L941.581 277.197L942.41 269.985H946.558L946.972 267.015L951.949 260.651L949.046 259.378L944.484 261.075L943.24 264.045L941.166 263.621V261.075L939.092 260.227L941.166 258.105L936.604 251.741L937.848 249.196L938.678 240.71L936.604 239.437L937.848 232.225L935.36 230.952L934.945 226.285L936.189 225.012L936.604 221.194L938.678 219.921L940.336 216.103L941.581 215.679V211.436H946.972L947.387 206.345H948.631L950.705 210.163L952.364 215.254L956.511 219.497L956.926 215.254H958.17L960.244 220.77H961.903L963.147 212.284L961.903 211.436L960.244 204.648V197.435L952.779 194.041L953.193 189.798L948.631 184.707L947.387 185.98H943.24L944.069 182.586L938.678 176.222H936.189L932.456 173.252V166.888L926.235 164.767L921.258 169.009H915.867L915.037 171.131H905.913L902.595 174.1L899.692 172.828L895.13 166.464L889.838 172.828L892.227 173.252L892.641 176.222L889.738 177.07L889.323 183.01H887.25V181.313L885.176 181.737V184.283L882.688 184.707L873.149 190.647L875.637 194.89L872.319 195.314V198.708L877.296 202.102L876.052 205.072L880.614 211.436L883.517 212.284L886.835 215.679L886.42 219.921L883.102 220.345L877.296 226.709V228.831L878.125 229.679L876.466 230.952L872.319 227.982L871.075 229.255L870.245 232.649L868.171 234.771L864.024 236.468V237.74L867.757 239.862L868.171 244.953L866.513 245.801L865.268 244.529L862.78 244.953L861.95 248.347L858.218 248.771V253.014L856.144 253.863L855.314 255.135L860.291 260.651L860.706 265.318L863.195 267.863L864.439 271.682L863.195 273.803Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path
                    id='Еврейская автономная область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M900.522 502.058L905.084 499.513L905.442 497.816L904.623 496.119L901.337 497.391L899.694 496.543H898.461L897.64 499.513C895.039 499.796 889.754 500.361 889.425 500.361C889.097 500.361 887.371 497.533 886.55 496.119L881.621 496.543L878.746 497.816L877.924 496.543H875.223L874.393 500.361L872.996 499.513L871.353 502.907L869.001 503.685L870.246 505.453L869.001 510.968H865.684V515.211L871.905 517.332V521.999H874.393L875.223 524.12C875.474 526.417 877.514 526.242 879.37 524.12L892.227 518.181C889.556 515.102 891.111 513.177 894.716 509.695H896.789L900.522 502.058Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <path
                    id='Приморский край'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                    d="M949.046 506.726L946.557 496.967L947.802 492.088L945.696 491.028L943.642 493.149H941.589L941.999 491.028L940.767 490.179L941.999 487.209L938.713 485.088V482.967H937.07L935.017 481.27H932.963V483.815L931.731 485.088L931.32 487.634L928.445 488.906L928.034 491.028L931.32 492.088V494.422L934.606 493.998L935.017 493.149H937.07V494.422H938.713L937.892 496.967V498.664L936.249 499.513L934.606 502.907H932.552L931.731 504.18V506.726L932.963 507.998L931.32 509.695V512.241C930.635 511.958 929.266 511.562 929.266 512.241C929.266 512.92 928.445 513.655 928.034 513.938H925.57L925.159 515.211H923.105L922.284 513.938L920.23 515.211V516.484C919.168 516.29 919.037 515.673 918.998 514.362L917.355 513.514L914.89 514.362L914.48 516.059H912.549L912.426 519.454L911.194 520.302L912.837 523.696L910.807 525.393L912.549 531.333V540.243H913.378V544.485H912.549L911.304 554.243L909.231 555.092L911.304 559.335L909.231 561.88L907.572 560.607L905.083 559.335L903.424 554.243H900.521L898.447 559.335L896.788 560.607L894.715 563.577L902.595 571.638V578.427L907.572 583.093V588.609L902.595 593.7L900.521 597.094L903.424 598.367L909.231 602.61L905.083 595.821L911.304 594.549L912.549 580.548H916.281L917.94 583.942L919.599 585.215L923.747 581.396L925.406 583.093L927.065 580.548L928.723 583.093L935.774 575.881V570.365L942.41 561.88V558.062L944.069 554.243L943.239 553.395V546.607L945.313 544.485L946.557 526.242L949.046 506.726Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />


                <g
                    id='Хабаровский край'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                >
                    <path id='' d="M824.211 410.841V415.508L827.114 414.235L832.921 413.387L837.483 409.144H840.386L842.874 413.387L837.483 422.721V432.903L832.921 434.6L830.432 440.964L832.921 442.661L839.556 440.964L844.533 445.631C845.916 446.197 848.847 447.328 849.51 447.328C850.174 447.328 850.893 445.348 851.169 444.358L856.146 442.661L858.635 434.6H862.782L868.174 429.933L872.736 434.6L871.906 437.57V440.115L874.395 444.358V446.479L860.293 447.328L865.685 456.238L861.123 461.329L860.293 465.571L856.146 469.814V474.481L854.072 476.178L856.146 487.209H861.123L862.782 494.846L869.003 503.685L871.354 502.907L872.997 499.513L874.395 500.361L875.224 496.543H877.926L878.748 497.816L881.623 496.543L886.552 496.119C887.373 497.533 889.098 500.361 889.427 500.361C889.755 500.361 895.04 499.796 897.642 499.513L898.463 496.543H899.695L901.338 497.391L904.624 496.119L905.444 497.816L905.086 499.513V504.18L911.307 509.695L907.574 513.938L909.233 517.332L910.062 522.847L910.809 525.393L912.839 523.696L911.196 520.302L912.428 519.453L912.551 516.059H914.482L914.893 514.362L917.357 513.514L919 514.362C919.04 515.673 919.17 516.29 920.232 516.483V515.211L922.286 513.938L923.108 515.211H925.161L925.572 513.938H928.037C928.447 513.655 929.269 512.92 929.269 512.241C929.269 511.562 930.638 511.958 931.322 512.241V509.695L932.965 507.998L931.733 506.725V504.18L932.555 502.907H934.608L936.251 499.513L937.894 498.664V496.967L938.716 494.422H937.073V493.149H935.019L934.608 493.997L931.322 494.422V492.088L928.037 491.027L928.447 488.906L931.322 487.633L931.733 485.088L932.965 483.815V481.269H935.019L937.073 482.966H938.716V485.088L942.002 487.209L940.769 490.179L942.002 491.027L941.591 493.149H943.645L945.698 491.027L947.804 492.088L949.048 487.209L946.56 483.815L949.048 467.269L944.071 459.207L942.827 454.116L940.753 451.995V446.479H937.021L932.459 440.964V434.6H931.214V428.66H929.97L931.214 421.023L928.726 415.508L924.993 414.235L923.334 409.993C922.09 409.71 919.353 409.144 918.357 409.144C917.362 409.144 920.155 407.73 921.675 407.023L919.602 402.78L909.233 401.507L898.865 397.689L896.791 401.507H892.643L891.814 404.901L895.961 406.174L896.791 412.538L895.961 413.387L893.888 407.871L891.814 409.144V416.781L889.326 417.629V409.993H885.593L886.422 406.174L882.69 407.871V412.538L885.593 413.387L883.934 416.781H879.786C879.123 416.781 879.51 413.952 879.786 412.538L876.054 407.023L870.247 411.265H864.026L863.611 407.023L866.929 402.78L867.344 395.567L873.565 379.021L871.492 373.506L874.395 365.02L876.054 352.717L877.713 351.444V348.05L875.639 346.777L876.054 341.686L877.713 338.292L879.786 322.169L883.104 319.624L888.081 314.108L892.229 313.26L896.376 308.593L898.45 307.32L899.279 308.593H901.353V305.623L900.109 304.774V303.077L902.183 302.229V298.41L899.279 295.441L892.229 296.289L888.496 299.259L885.178 297.138V291.198L886.837 288.652L885.593 283.561L881.86 278.47L876.054 276.349L871.492 278.47L866.929 281.864V286.955L865.271 287.804L861.953 285.682L858.635 286.107L857.805 290.349L849.925 291.622L847.437 289.501L844.118 290.774L839.971 288.652L839.142 290.349L841.215 295.865V308.169L838.312 311.138V314.957L836.239 317.078L840.386 322.169L845.363 329.806L846.192 334.897L842.46 345.08L835.409 345.928L833.335 347.201V353.565L829.603 356.959L821.723 358.232L819.234 360.778V367.142L816.746 368.839L815.916 371.809L820.064 381.567L814.672 382.84L820.478 384.537L821.723 386.234L818.819 389.628L817.575 393.87L824.626 397.689L827.944 401.507L823.381 406.174L825.87 409.144L824.211 410.841Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M880.616 401.507L878.542 403.204L877.713 397.689L878.542 394.719H882.275L883.519 396.416V401.507L882.69 402.78L880.616 401.507Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M876.054 403.204L875.224 400.234L873.151 401.083L872.736 403.629L874.395 404.901L876.054 403.204Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                </g>


                <g
                    id='Сахалинская область'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                >
                    <path id='' d="M919.6 385.809H918.355L923.332 389.203L926.65 390.052L923.332 393.87H925.821L926.65 396.416L923.332 399.386L928.724 409.993V412.538L932.457 414.235L931.213 418.054H934.945V421.023H939.507L944.899 426.963V432.054L949.046 434.6L959.83 449.874V456.238L969.369 465.996C970.198 466.844 969.783 470.238 970.613 471.087C971.276 471.766 974.484 475.895 976.005 477.875L977.249 484.663L985.544 491.452V486.36L983.885 482.118V477.875L988.447 476.178L995.083 481.269V477.027L989.691 472.36H983.885L980.981 467.269H976.005C974.76 465.996 972.272 463.365 972.272 463.026C972.272 462.686 969.783 454.682 968.539 450.722L966.88 441.813L968.539 440.964L970.613 441.813L972.272 439.691H974.345L976.005 440.964H979.737L982.226 441.813V439.691L977.249 438.418L976.005 437.146L972.272 435.449L970.613 432.903L961.489 426.963L954.023 416.781H949.461V414.235H946.558V411.265H943.655L938.678 404.901L940.337 403.629V401.507L934.945 397.689V392.173H932.457L921.673 381.142H919.6V385.809Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1035.73 482.118L1034.48 481.269L1030.75 484.663L1031.99 497.391L1034.48 498.664V496.967L1033.24 495.694V493.573L1034.48 492.724V484.663L1035.73 482.118Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1040.29 486.36L1041.95 483.391L1043.19 485.512L1041.95 488.058H1040.29V486.36Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1037.8 495.694V494.422H1040.29V495.694H1037.8Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1040.29 477.875L1039.05 480.421L1037.8 479.572L1036.56 477.875L1036.14 475.33L1037.39 474.905L1036.56 472.36H1037.8L1037.39 467.269L1036.56 465.996H1037.8L1038.63 463.874L1037.39 463.45V461.329L1040.29 460.905L1041.12 459.632L1040.7 454.116L1041.95 452.419L1046.1 454.541V457.086L1042.78 458.783L1043.19 465.147L1040.29 467.269L1041.12 474.057L1040.29 474.905V477.875Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1047.76 435.024L1050.66 432.479V445.631L1049.41 447.752L1047.76 449.025L1046.51 438.843H1047.76V435.024Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1054.39 415.508V413.811V412.114L1056.46 413.811L1055.64 418.054L1053.56 418.902L1053.15 417.205L1054.39 415.508Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1053.56 409.144V406.598L1055.22 406.174L1055.64 407.871L1053.56 409.144Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1051.9 397.689H1053.15L1055.64 399.386L1054.39 401.083L1051.9 400.234V397.689Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1053.15 393.022L1050.24 392.173L1049.83 394.719H1053.15V393.022Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1049.83 382.415L1050.66 379.87L1053.15 381.142L1052.32 383.264L1049.83 382.415Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1049 379.445H1047.34L1046.51 381.991H1048.58L1049 379.445Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1048.58 375.203V372.657H1051.07V374.778L1048.58 375.203Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1048.58 365.869L1047.34 366.293V371.384C1047.34 371.724 1049.55 371.809 1050.66 371.809L1051.07 370.111L1048.58 365.869Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1044.85 366.717H1043.61L1043.19 367.99L1044.44 368.839L1044.85 366.717Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1044.44 342.534L1044.85 345.504L1043.61 345.928C1043.47 349.605 1043.19 357.044 1043.19 357.384C1043.19 357.808 1044.85 359.929 1044.85 360.353C1044.85 360.693 1046.51 360.778 1047.34 360.778L1048.58 355.686L1047.34 350.595L1045.68 345.504H1047.34L1046.93 342.534H1044.44Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                </g>

                <g
                    id='Камчатский край'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                >
                    <path id='' d="M924.576 162.645L926.235 164.767L932.456 166.888V173.252L936.189 176.222H938.678L944.069 182.586L943.24 185.98H947.387L948.631 184.707L953.193 189.798L952.779 194.041L960.244 197.435V194.465L963.977 193.193L963.147 191.071H960.659L952.779 183.859L956.511 175.373L961.903 174.525L961.488 176.222L959.829 177.07L960.244 184.707L963.977 185.98L966.88 191.071H969.368L970.198 196.587H973.516V198.284L971.027 201.678L972.271 203.375V206.345L971.027 208.042V212.709L972.271 213.557L973.516 219.073L975.175 236.468L978.078 240.71L978.907 257.257L976.834 259.378L976.419 264.469L973.93 264.894V267.439C973.93 267.1 976.696 267.298 978.078 267.439L980.566 271.258L981.811 285.258L993.838 301.38L1017.48 319.624L1025.36 326.412L1027.85 324.715L1029.92 328.958H1033.65L1037.39 335.746L1043.19 337.867L1047.75 340.413L1046.51 335.746L1045.27 331.079V319.624L1037.39 308.593L1039.05 298.411L1043.19 295.441L1037.39 289.501H1033.65L1031.58 276.773L1033.65 272.955L1037.39 271.258L1034.58 264.894L1027.85 262.348L1022.87 257.257L1019.97 244.953L1021.21 242.407L1022.87 246.65H1026.6L1025.36 242.407L1017.48 238.165L1015.82 242.407L1014.16 236.468H1010.84L1009.18 228.407L1004.62 227.558L1002.55 229.679V234.346L997.986 233.074L993.423 228.407L993.009 219.497L990.105 216.527C991.211 216.81 993.423 217.206 993.423 216.527C993.423 215.848 991.211 213.699 990.105 212.709L983.47 208.042L985.543 203.375H988.447L987.202 199.981L991.35 199.132V195.738L988.447 194.465L989.276 187.253H992.179L995.082 192.344H997.986V188.101L993.423 183.859C993.7 181.596 994.419 176.901 995.082 176.222C995.746 175.543 998.124 170.848 999.23 168.585L1004.62 164.342L1012.09 166.039L1012.92 163.494L1008.77 157.978V151.19H1007.52V148.22H1008.77V145.675L1006.7 144.826L1005.87 138.038L1003.38 137.614L1005.87 134.644L1005.04 132.947L1002.55 131.25L1005.87 128.28L1005.04 124.037L990.935 124.461V131.25L988.447 132.098L986.787 142.281L983.055 145.675L980.152 146.523L978.078 144.402L976.004 144.826L975.175 147.372L971.442 148.22L969.783 150.342L966.88 151.19L964.392 148.645L963.147 138.038H959.415L958.17 140.159H951.949L951.534 143.129L948.631 144.402L941.995 144.826L940.336 149.917L934.53 152.039L932.456 156.281L928.309 157.554L925.406 159.675L924.576 162.645Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M998.4 206.769L995.912 206.345V211.436L994.253 212.285L995.912 213.557L999.23 219.921L1000.47 219.497L1001.3 215.679H1000.06L999.645 210.163L1000.47 208.89L998.4 206.769Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1047.66 235.195L1048.94 233.074L1059.12 231.801V234.346L1054.45 236.468H1049.79L1047.66 235.195Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path id='' d="M1064.21 227.558H1062.09L1064.83 226.285L1067.18 224.588H1068.45L1071 226.285L1067.18 227.558L1064.83 229.679L1064.21 227.558Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                </g>

                <g
                    id='Чукотский авт. округ'
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(e)}
                >
                    <path d="M887.252 165.615L889.741 172.828L895.132 166.464L899.694 172.828L902.597 174.101L905.915 171.131H915.04L915.869 169.009H921.261L926.238 164.767L924.579 162.645L925.408 159.676L928.311 157.554L932.459 156.281L934.532 152.039L940.339 149.918L941.998 144.826L948.634 144.402L951.537 143.129L951.952 140.159H958.173L959.417 138.038H963.15L964.394 148.645L966.882 151.19L969.785 150.342L971.445 148.22L975.177 147.372L976.007 144.826L978.08 144.402L980.154 146.523L983.057 145.675L986.79 142.281L988.449 132.098L990.937 131.25V124.462L1005.04 124.037L1004.62 115.552L1003.79 111.309V101.551L1001.72 102.824L1000.06 102.4V98.5813H1002.14V100.703L1005.04 99.4298L1005.45 96.8842L1007.11 95.1871C1007.44 94.8477 1008.36 94.7629 1008.77 94.7629L1009.6 93.4901L1012.92 92.2173V90.5202L1010.43 89.6717L1008.77 84.1562H1007.11L1005.45 85.429H1004.62L1003.79 82.8834L1001.72 82.0349L1000.06 84.5805L995.914 84.1562V85.0047L996.744 85.8533L995.914 87.1261L994.255 86.7018L993.841 83.7319L988.449 83.3077V81.6106L981.398 82.0349V83.7319L984.302 84.1562V85.8533L980.569 86.7018H976.836L976.421 89.6717L972.274 91.3687L974.348 87.1261L973.518 85.429L969.785 87.9746L971.03 84.5805L973.103 82.8834L976.836 83.7319L979.739 80.3378L982.228 79.9136L980.569 69.7312L976.836 62.0944L967.297 61.2458L966.468 57.4274L963.564 57.0032L964.809 55.3061L966.468 54.8818L966.053 51.0634L968.541 51.912L968.127 54.0333V56.5789L973.933 57.0032V55.7304H975.592V57.0032H978.08L979.325 48.9421L979.739 45.548L983.887 42.5781C983.61 43.0024 983.223 43.8509 983.887 43.8509H991.352L998.817 35.7898L1002.55 35.3656L1002.96 31.9714L1000.89 31.1229L1002.14 30.2744H1002.96L1004.21 31.1229H1007.11L1006.7 28.153L1002.96 27.7288L1006.28 24.7589L1004.62 23.4861L1002.96 24.3347L1001.72 27.3045H1000.06L1000.48 24.7589L1002.14 23.0619L1000.89 21.3648H999.232L998.403 27.3045H997.158L996.329 20.5163H993.841L993.011 23.4861L991.767 23.0619L993.011 19.6677L990.108 20.9405L988.864 17.9707L991.767 15.8493L993.011 13.3037L990.937 12.4552L988.864 13.728L988.034 12.0309L990.937 11.1824L991.767 8.21253L990.108 6.51546H988.034L987.619 1.42427L984.302 1V2.69707L985.546 4.8184H983.887L982.643 3.5456L978.08 5.66693L969.371 10.3339L968.956 13.728L970.2 14.1523L968.956 16.2736V17.9707L965.223 16.6979V19.6677L963.15 23.0619L963.564 24.7589L966.468 24.3347L967.712 22.2133L970.2 24.3347L971.859 25.1832L973.933 23.0619L976.007 24.3347L973.103 27.3045L969.371 27.7288L968.127 29.0016L965.223 26.8803L961.491 26.456L957.758 23.4861L955.27 26.456L951.122 26.8803L951.952 28.5773H954.855L953.61 30.2744H950.293V27.7288H947.804L947.389 32.82L945.316 32.3957V29.4258L942.413 30.6986L941.583 35.3656L935.777 39.184L929.97 38.7597L928.726 40.881L929.97 41.7296L927.067 43.8509H919.187L916.699 47.245L915.869 49.3664L905.086 57.4274L904.671 60.3973L898.035 67.6098V69.7312L900.524 70.1554L897.62 71.8525H894.303L892.644 76.0952L887.667 79.9136L888.082 82.4592H890.57L891.814 87.1261H894.303L894.717 84.5805L901.353 88.3989L903.427 91.3687L900.524 95.1871H894.717L892.644 98.157L886.008 95.1871L888.911 93.4901L890.57 90.9445L888.082 88.8231H884.349H881.031V90.9445L882.275 91.3687V94.7629L883.52 95.1871V102.824L883.105 104.097L882.275 106.218L878.128 107.491L877.298 111.734L872.321 112.158L871.492 116.825L868.174 119.795L882.275 129.553L882.69 133.371L878.542 136.765V141.008L874.395 144.402L874.81 148.22L871.907 151.19L871.492 156.706L875.225 158.827L873.151 160.948L876.054 163.918L887.252 165.615Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                    <path d="M900.109 35.3656L898.865 37.0626C895.3 34.5896 893.75 32.9881 891.814 29.8501L891.4 24.7589L893.473 23.4861C893.611 22.779 893.557 21.4128 893.473 20.9405C893.235 19.6038 897.616 16.1786 899.694 16.2736C900.899 16.2781 901.417 16.6419 902.183 17.5464V23.4861L903.842 24.7589V29.0016L902.183 29.4258L900.938 27.7288L899.694 29.0016L900.109 35.3656Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
                </g>
                <path id='' d="M900.938 8.6368C900.471 7.16391 900.546 6.73199 900.938 6.51546C901.34 6.10736 901.744 6.31737 903.012 7.78826C902.732 8.80128 902.5 9.30181 900.938 8.6368Z" fill="#93969D" fillOpacity="0.15" strokeWidth={'0.5'} stroke="black" />
            </svg>
        </div>

    );
};

export default Map;