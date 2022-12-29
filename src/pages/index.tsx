import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Container, Videos } from '~/styles/pages/home'

interface VideosProps {
  id: string
  title: string
  tags: string[]
}

export default function Home() {

  const [videos, setVideos] = useState<VideosProps[]>([])

  useEffect(() => {
    getRelated()
  }, [])

  const getRelated = async () => {
    const response = await axios.post('/api/videosList')
    setVideos(response.data.relatedVideos)
  }

  return (
    <>
      <Head>
        <title>Desafio Direção Concursos</title>
      </Head>

      <Container>
        {videos.map((video) => (
          <Videos href={`/watch/${video.id}`} key={video.id}>
            <div className='thumbnail'>
              <Image
                src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                fill={true}
                sizes={"100%"}
                priority={true}
              />
            </div>
            <div className='title'>
              {video.title}
              {video.title}
            </div>
          </Videos>
        ))}
      </Container>
    </>
  )
}
