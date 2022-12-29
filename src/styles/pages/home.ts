import Link from 'next/link'
import styled from 'styled-components'

export const Container = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  gap: 30px 2%;
  margin: 0 auto;
`

export const Videos = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  cursor: pointer;

  .thumbnail {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;

    img {
      border-radius: 15px;
    }
  }

  .title {
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  @media (min-width: 500px) {
    width: 49%;
  }

  @media (min-width: 768px) {
    width: 32%;
  }

  @media (min-width: 1140px) {
    width: 23.5%;
  }
`
