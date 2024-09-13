export default function Footer() {
    return (
        <footer className="flex flex-col items-center bg-[--yellow] text-black min-h-[10vh] p-6">
            <p className="lg:font-medium text-black md:font-normal lg:text-lg text-center mb-4">
                Hecho con 🌶️ por los alumnos de HACK A BOSS | copyright 2024
            </p>
            <section className="flex items-center justify-between gap-8">
                <a
                    href="https://www.linkedin.com/in/guillermocporto"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://media.licdn.com/dms/image/v2/D4D35AQHKcLZaCU5Udw/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1707939982094?e=1726851600&v=beta&t=5GVdtZ776Kv_qSiYLOFr-ilLBPW-7d5iDAZd-eUOkGo"
                        alt="LinkedIn Guillermo"
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-[--bg-hab-black]"
                    />
                </a>
                <a
                    href="https://www.linkedin.com/in/hectornovoa"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://media.licdn.com/dms/image/v2/D4E35AQHBYaR8Xu4bPQ/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1721294330369?e=1726851600&v=beta&t=rwNpvAoBw7zkgaRaR1-WQC4s75fGPv4bzRzhS4A22a0"
                        alt="LinkedIn Héctor"
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-[--bg-hab-black]"
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
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-[--bg-hab-black]"
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
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-[--bg-hab-black]"
                    />
                </a>
            </section>
        </footer>
    );
}
