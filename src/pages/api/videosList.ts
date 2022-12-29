import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getVideoDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const videos = [
    {
      id: 'bwGftC32wNw',
      title: 'Hungria Hip Hop - Temporal (Official Music Video)',
      tags: ['Músicas', 'Hungria Hip Hop', 'Rap'],
    },
    {
      id: '6Vl1BMPqGyA',
      title: 'Hungria Hip Hop - Só era Nós (Official Music Video)',
      tags: ['Músicas', 'Hungria Hip Hop', 'Rap'],
    },
    {
      id: 'ecyX5Nw6MhI',
      title:
        'Insônia - Tribo da Periferia part Hungria Hip Hop (Official Music)',
      tags: ['Músicas', 'Hungria Hip Hop', 'Rap', 'Tribo da Periferia'],
    },
    {
      id: 'NiQfZ_X8xdk',
      title: 'FILMES DA DC QUE VÃO PRO SACO COM O REBOOT [Maioria CANCELADO]',
      tags: ['Ei Nerd', 'Entretenimento', 'DC'],
    },
    {
      id: 'ba4Xn7cQZ6U',
      title:
        'A DC FICOU LOUCA DE VEZ? AQUAMAN, ADÃO NEGRO E MULHER MARAVILHA ESTÃO FORA? ENTENDA!',
      tags: ['Ei Nerd', 'Entretenimento', 'DC'],
    },
    {
      id: '_SfW7EUNrJs',
      title:
        'ALICE IN BORDERLAND 2 FINAL EXPLICADO! - ENTENDA O QUE É AQUELE MUNDO E O QUE O CURINGA SIGNIFICA!',
      tags: ['Entretenimento', 'Netflix', 'Alice In Borderland'],
    },
    {
      id: '_k6xHwz9f10',
      title:
        'WANDINHA - FINAL EXPLICADO! QUEM É O NOVO STALKER? [Entenda tudo]',
      tags: ['Ei Nerd', 'Entretenimento', 'Wandinha', 'Netflix'],
    },
    {
      id: 'Yj2I19R1rkY',
      title:
        'FASE 4 DA MARVEL FOI A PIOR? Análise COMPLETA de TODOS os FILMES e SÉRIES',
      tags: ['Ei Nerd', 'Entretenimento', 'Marvel'],
    },
    {
      id: 'sKA3td6VtmU',
      title: 'AVATAR 1 - RESUMO COMPLETO',
      tags: ['Ei Nerd', 'Entretenimento', 'Avatar'],
    },
    {
      id: 'b-PhvPKgWjY',
      title: 'Matuê - Kenny G',
      tags: ['Músicas', 'Matuê', 'Rap'],
    },
    {
      id: 'r_cbh4-SOmI',
      title: 'Hungria Hip Hop - Um Pedido (Official Music Video)',
      tags: ['Músicas', 'Hungria Hip Hop', 'Rap'],
    },
    {
      id: 'WVZ9uZc2ams',
      title: 'MATUÊ - MÁQUINA DO TEMPO ( ÁLBUM COMPLETO )',
      tags: ['Músicas', 'Matuê', 'Rap'],
    },
    {
      id: 'YrQLmElRT-E',
      title: 'Tribo da Periferia - Imprevisível (Official Music Video)',
      tags: ['Músicas', 'Hungria Hip Hop', 'Rap', 'Tribo da Periferia'],
    },
    {
      id: 'EiQmbrvvDaY',
      title: 'Lembranças - Hungria Hip Hop (Official Vídeo)',
      tags: ['Músicas', 'Hungria Hip Hop', 'Rap'],
    },
  ]

  const relatedVideos = videos.sort(() => Math.random() - 0.5)

  const tags = videos.map((video) => {
    let tags = [...video.tags]
    return tags
  })

  const mergedTags = tags.flat(1)

  const relatedTags = mergedTags.filter((item, pos) => {
    return mergedTags.indexOf(item) === pos
  }).sort(() => Math.random() - 0.5)

  return res.status(200).json({ relatedVideos, relatedTags })
}
