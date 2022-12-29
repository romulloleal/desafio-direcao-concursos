import Link from 'next/link'
import styled from 'styled-components'

export const Container = styled.div<{ theaterMode: boolean }>`
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  gap: 25px;

  transition: all 0.2s ease-in-out;

  ${({ theaterMode }) =>
    theaterMode
      ? `max-width: 100%;
      flex-direction: column;`
      : ''}

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

export const PlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`

export const VideoTitle = styled.div`
  padding: 0 5px;
  font-size: 1.2em;
  font-weight: 500;
`

export const Related = styled.div<{ theaterMode: boolean }>`
  display: flex;
  width: 350px;
  flex-direction: column;
  row-gap: 10px;

  font-size: 0.85em;
  transition: all 0.2s ease-in-out;

  scroll-behavior: smooth;

  ${({ theaterMode }) =>
    theaterMode
      ? `width: 90%;
      margin: 0 auto;`
      : ''}

  @media (max-width: 1024px) {
    width: 90%;
  }
`

export const RelatedTab = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  overflow-x: auto;
  width: 100%;
  user-select: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const RelatedTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  height: 30px;
  padding: 0px 10px;
  border-radius: 5px;
  background-color: rgb(63, 63, 63, 0.7);
  cursor: pointer;

  &:hover {
    transition: all 0.2s linear;
    background-color: rgb(63, 63, 63, 1);
  }

  &.selected {
    color: #000000;
    background-color: #ffffff;
  }
`

export const RelatedItem = styled(Link)`
  width: 100%;
  display: flex;
  gap: 10px;
  color: #ffffff;
  cursor: pointer;

  .thumbnail {
    width: 168px;
    height: 90px;
  }

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  img {
    border-radius: 7px;
  }
`
