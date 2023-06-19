import { useEffect, useState } from 'react'
import { GameController } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.css'
import { api } from './services/api'

import logo from './assets/logo-nlw-esports.svg'
import { CreateAddBanner } from './components/CreateAddBanner'
import { GameBanner } from './components/GameBanner'
import { Input } from './components/Form/Input'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    api.get('/games').then((response) => setGames(response.data))
  }, [])

  return (
    <div className="mx-auto my-20 flex max-w-[1344px] flex-col items-center">
      <img src={logo} alt="" />

      <h1 className="mt-20 text-6xl font-black text-white">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="mt-16 grid grid-cols-6 gap-6">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAddBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60">
            <Dialog.Content className="fixed top-1/2 left-1/2 w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#2A2634] py-8 px-10 text-white shadow-black/25">
              <Dialog.Title className="text-3xl font-black">
                Publique um anúncio
              </Dialog.Title>

              <form className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">
                    Qual o game?
                  </label>
                  <Input
                    id="game"
                    placeholder="Selecione o game que deseja jogar"
                    className="rounded bg-zinc-900 py-3 px-4 text-sm placeholder:text-zinc-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-semibold">
                    Seu nome (ou nickname)
                  </label>
                  <Input
                    id="name"
                    placeholder="Como te chamam dentro do game"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying" className="font-semibold">
                      Joga há quantos anos?
                    </label>
                    <Input
                      id="yearsPlaying"
                      type="number"
                      placeholder="Tudo bem ser ZERO"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord" className="font-semibold">
                      Qual seu Discord?
                    </label>
                    <Input id="discord" placeholder="Usuario#0000" />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays" className="font-semibold">
                      Quanto costuma jogar?
                    </label>

                    <div className="grid grid-cols-4 gap-2">
                      <button
                        className="h-8 w-8 rounded bg-zinc-900"
                        title="Domingo"
                      >
                        D
                      </button>
                      <button
                        className="h-8 w-8 rounded bg-zinc-900"
                        title="Segunda"
                      >
                        S
                      </button>
                      <button
                        className="h-8 w-8 rounded bg-zinc-900"
                        title="Terça"
                      >
                        T
                      </button>
                      <button
                        className="h-8 w-8 rounded bg-zinc-900"
                        title="Quarta"
                      >
                        Q
                      </button>
                      <button
                        className="h-8 w-8 rounded bg-zinc-900"
                        title="Quinta"
                      >
                        Q
                      </button>
                      <button
                        className="h-8 w-8 rounded bg-zinc-900"
                        title="Sexta"
                      >
                        S
                      </button>
                      <button
                        className="h-8 w-8 rounded bg-zinc-900"
                        title="Sábado"
                      >
                        S
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-2">
                    <label htmlFor="hourStart" className="font-semibold">
                      Qual horário do dia?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input id="hourStart" type="time" placeholder="De" />
                      <Input id="hourEnd" type="time" placeholder="Até" />
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <Input type="checkbox" />
                  <span className="text-sm">
                    Constumo me conectar ao chat de voz
                  </span>
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close
                    type="button"
                    className="h-12 rounded-md bg-zinc-500 px-5 font-semibold hover:bg-zinc-600"
                  >
                    Cancelar
                  </Dialog.Close>

                  <button
                    type="submit"
                    className="flex h-12 items-center gap-3 rounded-md bg-violet-500 px-5 font-semibold hover:bg-violet-600"
                  >
                    <GameController size={24} />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
