export default function Footer() {
    return (
        <footer className="flex flex-col items-center bg-[--yellow] text-black min-h-[10vh] p-6">
            {/* Párrafo centrado */}
            <p className="lg:font-medium text-black md:font-normal lg:text-lg text-center mb-4">
                Hecho con 🌶️ por los alumnos de HACK A BOSS | copyright 2024
            </p>

            {/* Sección de íconos alineados horizontalmente */}
            <section className="flex items-center justify-between gap-3 sm:gap-8">
                <a
                    href="https://www.linkedin.com/in/guillermocporto"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://media.licdn.com/dms/image/v2/D4D03AQHQ0gDA3rmdmg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1700155863161?e=2147483647&v=beta&t=UoYQS0eXSSwnMLkSW1c5tOKVuxodIibhq7VtqqTaU40"
                        alt="LinkedIn Guillermo"
                        className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border-4 border-[--bg-hab-black] object-cover"
                    />
                </a>
                <a
                    href="https://www.linkedin.com/in/hectornovoa"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://media.licdn.com/dms/image/v2/D4E35AQHBYaR8Xu4bPQ/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1721294330335?e=1728162000&v=beta&t=kcXX-LykYsnwT4Q5i_AN_IoL7j3_z31QLmZ6vRMOn7g"
                        alt="LinkedIn Héctor"
                        className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border-4 border-[--bg-hab-black] object-cover"
                    />
                </a>
                <a
                    href="https://www.linkedin.com/in/nelson-albera-fullstack"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://media.licdn.com/dms/image/v2/D4D35AQHOGpj85QBUKQ/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1635012122922?e=1728162000&v=beta&t=HxV3qQ-VlEZC5PW9bYCpvWqqH0mrs6lT_jBXCznXCig"
                        alt="LinkedIn Nelson"
                        className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border-4 border-[--bg-hab-black] object-cover"
                    />
                </a>
                <a
                    href="https://www.linkedin.com/in/javiergómezhuertas"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://media.licdn.com/dms/image/v2/D4D03AQGrWvd5dEbkLg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1703728000532?e=1731542400&v=beta&t=4PqTVzKIHQcOSuoy_87JYyurEV4NCdCYayMPgbxR6zs"
                        alt="LinkedIn Javier"
                        className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border-4 border-[--bg-hab-black] object-cover"
                    />
                </a>
                <a
                    href="https://www.linkedin.com/in/lidiapdiaz"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://media.licdn.com/dms/image/v2/C4E03AQE6aY6Qr1f7SQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1652625764506?e=1731542400&v=beta&t=9tysPFPpPvkV6vgb6dkoYOCOgeEb6kDCCNjGdvVGa1o"
                        alt="LinkedIn Lidia"
                        className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border-4 border-[--bg-hab-black] object-cover"
                    />
                </a>
            </section>
        </footer>
    );
}
