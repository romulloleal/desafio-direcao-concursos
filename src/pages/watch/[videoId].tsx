import axios from 'axios'
import ytdl from 'ytdl-core'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import Player from '~/components/Player'
import {
  Container,
  Related,
  RelatedTab,
  RelatedItem,
  RelatedTag,
  PlayerContainer,
  VideoTitle,
} from '~/styles/pages/watch'

interface RelatedVideos {
  id: string
  title: string
  tags: string[]
}

const Watch = ({ url, videoDetails }: { url: string; videoDetails: any }) => {
  const [theaterMode, setTheaterMode] = useState(false)
  const [relatedVideos, setRelatedVideos] = useState<RelatedVideos[]>([])
  const [searchRelatedVideos, setSearchRelatedVideos] = useState<
    RelatedVideos[]
  >([])
  const [relatedTags, setRelatedTags] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState('Todos')

  const tabRelated = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let activeDrag = false
    tabRelated.current?.addEventListener('mousemove', (drag) => {
      if (!activeDrag) return
      if (tabRelated.current) {
        tabRelated.current.scrollLeft -= drag.movementX
      }
    })

    tabRelated.current?.addEventListener('mouseup', () => {
      activeDrag = false
    })

    tabRelated.current?.addEventListener('mousedown', () => {
      activeDrag = true
    })
  }, [])

  useEffect(() => {
    getRelated()
  }, [url])

  const getRelated = async () => {
    const response = await axios.post('/api/videosList')
    setRelatedTags(response.data.relatedTags)
    setRelatedVideos(response.data.relatedVideos)
    setSearchRelatedVideos(response.data.relatedVideos)
    setSelectedTag('Todos')
    if (tabRelated.current) {
      tabRelated.current.scrollLeft = 0
    }
  }

  const filterByTag = (value: string) => {
    setSelectedTag(value)
    if (value === 'Todos') {
      setSearchRelatedVideos(relatedVideos)
    } else {
      const result = relatedVideos.filter((video) => video.tags.includes(value))
      setSearchRelatedVideos(result)
    }
  }

  return (
    <>
      <Head>
        <title>{videoDetails.title}</title>
      </Head>
      <Container theaterMode={theaterMode}>
        <PlayerContainer>
          <Player
            videoUrl={url}
            videoDetails={videoDetails}
            theaterMode={theaterMode}
            setTheaterMode={setTheaterMode}
          />
          <VideoTitle>{videoDetails.title}</VideoTitle>
        </PlayerContainer>
        <Related theaterMode={theaterMode}>
          <RelatedTab ref={tabRelated}>
            <RelatedTag
              className={`${selectedTag === 'Todos' && 'selected'}`}
              onClick={() => filterByTag('Todos')}
            >
              Todos
            </RelatedTag>
            {relatedTags.map((tag, i) => (
              <RelatedTag
                key={i}
                className={`${selectedTag === tag && 'selected'}`}
                onClick={() => filterByTag(tag)}
              >
                {tag}
              </RelatedTag>
            ))}
          </RelatedTab>
          {searchRelatedVideos.map((video, i) => (
            <RelatedItem href={`/watch/${video.id}`} key={i}>
              <div className='thumbnail'>
                <Image
                  src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  width='168'
                  height='90'
                />
              </div>
              <div className='infos'>
                <div className='title'>{video.title}</div>
              </div>
            </RelatedItem>
          ))}
        </Related>
      </Container>
    </>
  )
}

export default Watch

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { videoId: string }> = async ({
  params,
}) => {
  try {
    const videoId = params?.videoId || ''

    const info = await ytdl.getInfo(videoId)

    const video = ytdl.chooseFormat(info.formats, { filter: 'videoandaudio' })

    return {
      props: {
        url: video.url,
        videoDetails: info.videoDetails,
      },
      revalidate: 60 * 60 * 1,
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
