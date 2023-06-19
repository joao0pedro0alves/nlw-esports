interface GameBannerProps {
  bannerUrl: string
  title: string
  adsCount: number
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a
      href="#"
      className="relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:opacity-75"
    >
      <img src={props.bannerUrl} alt="" />
      <div className="absolute bottom-0 left-0 right-0 w-full bg-game-gradient px-4 pt-16 pb-4">
        <strong className="block font-bold text-white">{props.title}</strong>
        <span className="block text-sm text-zinc-300">
          {props.adsCount} anúncio(s)
        </span>
      </div>
    </a>
  )
}
