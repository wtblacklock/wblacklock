export interface ExecutionOutcome {
  value: string
  label: string
}

export interface ImageRow {
  images: string[]
  fullWidth?: boolean
  aspect?: string
  contain?: boolean
  imageContain?: boolean[]
}

export interface ExecutionSection {
  id: string
  title: string
  description: string
  externalLink?: { label: string; url: string }
  images?: string[]
  imageRows?: ImageRow[]
  videos?: string[]
  videoRows?: string[][]
  videosFirst?: boolean
  youtubeUrls?: string[]
  instagramFeed?: boolean
  instagramPosts?: { src: string; href: string }[]
}

export interface ProjectExecutionData {
  projectId: string
  campaignName: string
  campaignDescription: string
  outcomes: ExecutionOutcome[]
  sections: ExecutionSection[]
}

const beastPutty: ProjectExecutionData = {
  projectId: 'beast-putty',
  campaignName: 'Beast Putty',
  campaignDescription: '',
  outcomes: [],
  sections: [
    {
      id: 'beast-brand',
      title: 'Beast Brand',
      description:
        'Brand exploration boards used to define tone, typography, color, and visual attitude across campaign touchpoints.',
      imageRows: [
        {
          images: ['/images/projects/beast-putty/Beast%20Brand/moodboard.png'],
          fullWidth: true,
          aspect: '16/9',
        },
        {
          images: ['/images/projects/beast-putty/Beast%20Brand/moodboard2.png'],
          fullWidth: true,
          aspect: '16/9',
        },
      ],
    },
    {
      id: 'beast-site',
      title: 'Beast Site',
      description:
        'Landing page and website explorations designed for conversion, with messaging and UX tuned for campaign traffic.',
      externalLink: { label: 'Visit beastputty.com', url: 'https://beastputty.com' },
      videos: ['/images/projects/beast-putty/Beast%20Site/beast_site.mp4'],
      videosFirst: true,
    },
    {
      id: 'beast-ads',
      title: 'Beast Ads',
      description:
        'Campaign ad concepts and paid placements developed to test hooks, visual language, and click-through behavior across channels.',
      imageRows: [
        {
          images: [
            '/images/projects/beast-putty/Beast%20Ads/beast_highlife.png',
            '/images/projects/beast-putty/Beast%20Ads/beast_luck.png',
            '/images/projects/beast-putty/Beast%20Ads/beastad_calmcountry.png',
          ],
          aspect: '9/16',
        },
      ],
    },
    {
      id: 'beast-animations',
      title: 'Beast Animations',
      description:
        'AI-assisted animation and motion studies for social and short-form video, built for rapid iteration and publishing velocity.',
      images: [],
      videoRows: [
        [
          '/images/projects/beast-putty/Beast%20Animations/BeastPutty_Ani.mp4',
          '/images/projects/beast-putty/Beast%20Animations/beastputty_animation_blkputty.mov',
          '/images/projects/beast-putty/Beast%20Animations/beastputty_animation_vectormorph.mp4',
        ],
        [
          '/images/projects/beast-putty/Beast%20Animations/Hands_Reveal_Jars_Video_Generated.mp4',
          '/images/projects/beast-putty/Beast%20Animations/green_hands_product.mp4',
          '/images/projects/beast-putty/Beast%20Animations/purple_hands.mp4',
        ],
      ],
    },
    {
      id: 'beast-packaging',
      title: 'Beast Packaging',
      description:
        'Packaging concepts and product presentation studies optimized for shelf impact and ecommerce clarity.',
      imageRows: [
        {
          images: [
            '/images/projects/beast-putty/Beast%20Packaging/BeastPutty_BIGWAD_concepts-01.png',
            '/images/projects/beast-putty/Beast%20Packaging/BeastPutty_BIGWAD_concepts-02.png',
            '/images/projects/beast-putty/Beast%20Packaging/BeastPutty_BIGWAD_concepts-03.png',
          ],
          aspect: '4/3',
        },
        {
          images: [
            '/images/projects/beast-putty/Beast%20Packaging/BeastPutty_BIGWAD_og.png',
          ],
          fullWidth: true,
          aspect: '16/9',
        },
      ],
      videoRows: [
        [
          '/images/projects/beast-putty/Beast%20Packaging/beast_package.mp4',
          '/images/projects/beast-putty/Beast%20Packaging/beast_products.mp4',
        ],
      ],
    },
    {
      id: 'beast-social',
      title: 'Beast Social',
      description:
        'Published social content system with YouTube short-form placements and Instagram output connected to the campaign pipeline.',
      images: [],
      youtubeUrls: [
        'https://youtu.be/KhqQ33TrpZg',
        'https://youtu.be/P6i2UqYDjIs',
        'https://youtu.be/JIdhpw8XD7U',
        'https://youtu.be/-qI7bWV2pos',
        'https://youtu.be/psls-y5aJfU',
        'https://youtu.be/Rj1wgSqoNKM',
        'https://youtu.be/VTcobdy4reQ',
        'https://youtu.be/yH2gsxglHXE',
      ],
      instagramFeed: true,
      instagramPosts: [
        { src: '/images/projects/beast-putty/Beast%20Social/beast_blood_hands.MP4', href: '' },
        { src: '/images/projects/beast-putty/Beast%20Social/beast_icy_hands.MP4', href: '' },
        { src: '/images/projects/beast-putty/Beast%20Social/beast_tacos.MP4', href: '' },
      ],
    },
  ],
}

const executionProjects: ProjectExecutionData[] = [beastPutty]

export function getProjectExecutions(projectId: string): ProjectExecutionData | undefined {
  return executionProjects.find((p) => p.projectId === projectId)
}
