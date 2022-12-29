import styled from 'styled-components'

export const PlayerContent = styled.div<{theaterMode: boolean}>`
  position: relative;
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  ${({theaterMode}) =>
    theaterMode ?
    `background-color: black;`
    : ''
  }

  transition: all 0.2s ease-in-out;

  &:hover {
    .controls {
      opacity: 1;
    }
  }

  @media (min-width: 450px) {
    min-height: 260px;
  }

  @media (min-width: 600px) {
    min-height: 460px
  }

  @media (min-width: 900px) {
    min-height: 70vh
  }

  @media (min-width: 1200px) {
    height: 80vh;
  }
`

export const Video = styled.video`
  position: absolute;
  max-width: 100%;
  min-height: 100%;
  background-color: black;
  transition: all 0.2s ease-in-out;
`

export const Controls = styled.div<{ isPlaying: boolean }>`
  position: absolute;
  bottom: 0;
  width: 98%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  opacity: ${({ isPlaying }) => (isPlaying ? 0 : 1)};
  transition: all 0.4s ease-in-out;
`

export const Functions = styled.div`
  padding: 0 15px;
  font-size: 0.75em;
  display: flex;
  justify-content: space-between;
  position: relative;

  .volume {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  svg {
    cursor: pointer;
    font-size: 1.5em;
  }
`

export const TimeLine = styled.input<{ progressLine: number | undefined }>`
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.6);
  background-image: linear-gradient(#00afff, #00afff);
  background-size: ${({ progressLine }) => `${progressLine || 0}%`} 100%;
  background-repeat: no-repeat;

  &::-webkit-slider-runnable-track {
    background: rgba(999, 999, 999, 0.4);
    height: 4px;
  }

  &::-webkit-slider-thumb {
    appearance: none;
  }

  &:hover {
    &::-webkit-slider-thumb {
      background-color: #00afff;
      margin-top: -3px;
      height: 10px;
      width: 10px;
      border-radius: 100%;
    }
  }
`

export const Volume = styled.input<{ currentVolume: number }>`
  -webkit-appearance: none;
  width: 100px;
  height: 4px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.6);
  background-image: linear-gradient(#ffffff, #ffffff);
  background-size: ${({ currentVolume }) => `${currentVolume * 100}%`} 100%;
  background-repeat: no-repeat;

  &::-webkit-slider-runnable-track {
    background: rgba(999, 999, 999, 0.4);
    height: 4px;
  }

  &::-webkit-slider-thumb {
    appearance: none;
  }

  &:hover {
    &::-webkit-slider-thumb {
      background-color: #ffffff;
      margin-top: -3px;
      height: 10px;
      width: 10px;
      border-radius: 100%;
    }
  }
`

export const PlaybackRateSelector = styled.div`
  position: absolute;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  bottom: 50px;
  right: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100px;
  font-size: 1.25em;
  border-radius: 8px;

  .rateOption {
    padding: 5px 10px;

    svg {
      font-size: 1em;
    }

    &:hover {
      background-color: rgba(999, 999, 999, 0.2);
    }

    &:first-child {
      border-radius: 8px 8px 0 0;
    }

    &:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
`
