import { useState, useRef, FormEvent, useEffect } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi'
import { HiVolumeUp } from 'react-icons/hi'
import { BsReverseLayoutSidebarReverse } from 'react-icons/bs'
import { TbRectangle } from 'react-icons/tb'
import { MdSpeed } from 'react-icons/md'
import { AiOutlineCheck } from 'react-icons/ai'

import {
  Controls,
  Functions,
  PlaybackRateSelector,
  PlayerContent,
  TimeLine,
  Video,
  Volume,
} from '~/styles/components/player'

const Player = ({
  videoUrl,
  videoDetails,
  theaterMode,
  setTheaterMode,
}: {
  videoUrl: string
  videoDetails: any
  theaterMode: boolean
  setTheaterMode: (value: boolean) => void
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progressLine, setProgressLine] = useState<number>(0)
  const [currentVolume, setCurrentVolume] = useState<number>(100)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [fullScreen, setFullScreen] = useState(false)
  const [openPlaybackRate, setOpenPlaybackRate] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1.0)
  const [showControls, setShowControls] = useState(false)

  const player = useRef<HTMLVideoElement>(null)
  const playerContent = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // made this to correct remote control in mobile
    player.current?.addEventListener('play', () => {
      setIsPlaying(true)
    })
    player.current?.addEventListener('pause', () => {
      setIsPlaying(false)
    })
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setFullScreen(false)
      }
    })
    // initial state of playbackRate
    if (player.current) player.current.playbackRate = playbackRate
  }, [videoUrl, playbackRate])

  const togglePlayerState = () => {
    setIsPlaying(!isPlaying)
    !isPlaying ? player.current?.play() : player.current?.pause()
  }

  const toogleFullScreen = () => {
    setFullScreen(!fullScreen)
    !fullScreen
      ? playerContent.current?.requestFullscreen()
      : document.exitFullscreen()
  }

  const updateTimeLine = () => {
    setProgressLine(
      ((player.current?.currentTime || 0) / videoDetails.lengthSeconds) * 100
    )
    setCurrentTime(player.current?.currentTime || 0)
  }

  const seekTo = (event: FormEvent<HTMLInputElement>) => {
    if (player.current)
      player.current.currentTime =
        (parseInt(event.currentTarget.value) / 100) * videoDetails.lengthSeconds

    setProgressLine(parseInt(event.currentTarget.value))
  }

  const changeVolume = (event: FormEvent<HTMLInputElement>) => {
    if (player.current)
      player.current.volume = parseFloat(event.currentTarget.value) / 100

    setCurrentVolume(parseFloat(event.currentTarget.value))
  }

  const formatVideoTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.trunc(totalSeconds % 60)

    return hours > 0
      ? `${hours.toString().padStart(2, '0')}:`
      : '' +
          `${minutes.toString().padStart(2, '0')}:` +
          seconds.toString().padStart(2, '0')
  }

  const changePlaybackRate = (value: number) => {
    setPlaybackRate(value)
    setOpenPlaybackRate(false)
    if (player.current) player.current.playbackRate = value
  }

  // hack to change controls visibility when user mouseMove on player and when mouseOut
  useEffect(() => {
    console.log('hidden')
    const timeout = setTimeout(() => {
      setShowControls(false)
    }, 4000)
    return () => {
      clearInterval(timeout)
    }
  }, [showControls])

  const changeControlsVisibility = () => {
    setShowControls(true)
  }

  return (
    <PlayerContent
      ref={playerContent}
      theaterMode={theaterMode}
      onMouseMove={changeControlsVisibility}
      onMouseOut={() => setShowControls(false)}
    >
      <Video
        ref={player}
        src={videoUrl}
        onTimeUpdate={updateTimeLine}
        autoPlay
      />

      <Controls className='controls' showControls={showControls}>
        <TimeLine
          type='range'
          min={0}
          max={100}
          onInput={seekTo}
          value={progressLine || 0}
          progressLine={progressLine}
          step={0.001}
        />
        <Functions>
          <div className='left'>
            {!isPlaying ? (
              <FaPlay onClick={togglePlayerState} title='Reproduzir' />
            ) : (
              <FaPause onClick={togglePlayerState} title='Pausa' />
            )}
            <div className='volume'>
              <HiVolumeUp />
              <Volume
                type='range'
                min={0}
                max={100}
                step={0.01}
                onInput={changeVolume}
                value={currentVolume}
                currentVolume={currentVolume}
              />
            </div>
            {formatVideoTime(currentTime || 0)} /{' '}
            {formatVideoTime(videoDetails.lengthSeconds)}
          </div>
          <div className='right'>
            {openPlaybackRate && (
              <PlaybackRateSelector>
                <div
                  className='rateOption'
                  onClick={() => changePlaybackRate(0.5)}
                >
                  0.5 {playbackRate === 0.5 ? <AiOutlineCheck /> : ''}
                </div>
                <div
                  className='rateOption'
                  onClick={() => changePlaybackRate(1.0)}
                >
                  1.0 {playbackRate === 1.0 ? <AiOutlineCheck /> : ''}
                </div>
                <div
                  className='rateOption'
                  onClick={() => changePlaybackRate(1.5)}
                >
                  1.5 {playbackRate === 1.5 ? <AiOutlineCheck /> : ''}
                </div>
                <div
                  className='rateOption'
                  onClick={() => changePlaybackRate(2.0)}
                >
                  2.0 {playbackRate === 2.0 ? <AiOutlineCheck /> : ''}
                </div>
              </PlaybackRateSelector>
            )}
            <MdSpeed
              title='Velocidade de reprodução'
              onClick={() => setOpenPlaybackRate(!openPlaybackRate)}
            />
            {theaterMode ? (
              <BsReverseLayoutSidebarReverse
                onClick={() => setTheaterMode(!theaterMode)}
                title='Sair do modo teatro'
              />
            ) : (
              <TbRectangle
                onClick={() => setTheaterMode(!theaterMode)}
                title='Modo teatro'
              />
            )}
            {fullScreen ? (
              <BiExitFullscreen
                onClick={toogleFullScreen}
                title='Sair da tela cheia'
              />
            ) : (
              <BiFullscreen onClick={toogleFullScreen} title='Tela cheia' />
            )}
          </div>
        </Functions>
      </Controls>
    </PlayerContent>
  )
}

export default Player
