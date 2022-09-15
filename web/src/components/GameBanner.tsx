interface GameBannerProps {
    bannerUrl: string
    title: string
    adsCount: number
}

export function GameBanner(props: GameBannerProps) {
    return (
        <a
            href="#"
            className="relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:opacity-75"
        >
            <img src={props.bannerUrl} alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="text-white font-bold block">
                    {props.title}
                </strong>
                <span className="text-zinc-300 text-sm block">
                    {props.adsCount} anúncio(s)
                </span>
            </div>
        </a>
    )
}
