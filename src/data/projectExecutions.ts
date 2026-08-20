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

const lodestone: ProjectExecutionData = {
  projectId: "lodestone",
  campaignName: "Lodestone",
  campaignDescription: "I designed and launched a full social engagement platform where every campaign acted like a lead magnet. 1000’s of activations. 1000’s of enriched profiles. 100s of $1000s in realized revenue for clients.",
  outcomes: [
    {
      value: "1000s",
      label: "Campaign activations"
    },
    {
      value: "1000s",
      label: "Enriched profiles"
    },
    {
      value: "100s of $1000s",
      label: "Realized client revenue"
    }
  ],
  sections: [
    {
      id: "integrated-campaign-systems",
      title: "Integrated Campaign Systems",
      description: "I’ve worked with clients across sports, entertainment, and enterprise, including MLBAM (Yankees, Orioles, and many others), NBA (Heat, Magic, Thunder, Nuggets), NHL (Lightning, Panthers), Mountain West (multiple teams), C-Spire, Fox Sports, Dover Saddles, Fox Entertainment, IMG, Miss America, YMCA, Circuit of the Americas, and many more. These partnerships were about more than one-off promotions. Together, we built campaign systems that engaged fans, generated leads, and delivered measurable outcomes.",
      imageRows: [
        {
          images: [
            "/images/projects/lodestone/image-original.png"
          ]
        }
      ]
    },
    {
      id: "campaign-formats",
      title: "Campaign Formats",
      description: "Scratch-offs, spins, swipes — quick, addictive interactions that kept fans returning Trivia, polls, and contests — simple opt-ins that fueled sharing and engagement User-generated content — memes, video voice-overs, and uploads that extended organic reach Codes & coupons — tying digital campaigns directly to retail and on-pack activations Flock-to-unlock challenges, voting brackets, pick’em predictions, watch-and-win, and quizzes — interactive formats that drove repeat participation across sports seasons and events"
    },
    {
      id: "cohesive-data-storytelling",
      title: "Cohesive Data + Storytelling",
      description: "All campaigns tied back to a single user profile, moving beyond email capture to track cross-channel behavior. This gave brands deeper insights into how fans engaged across touchpoints. To close the loop, I built supporting product sheets, case studies, infographics, and walkthroughs that showed campaign performance and connected engagement directly to outcomes such as ticket sales, brand lift, and retail redemption.",
      imageRows: [
        {
          images: [
            "/images/projects/lodestone/lodestone-prodsheets.png"
          ]
        }
      ]
    },
    {
      id: "product-education",
      title: "Product Education",
      description: "Designed clear, engaging product sheets and guides that educated buyers fast. Delivered hundreds of assets across industries, reaching thousands of prospects and helping sales teams shorten decision cycles. Standardized layouts improved comprehension by 40% and gave clients scalable templates they could reuse for future launches.",
      imageRows: [
        {
          images: [
            "/images/projects/lodestone/lodestone-display-ads.png"
          ]
        }
      ]
    },
    {
      id: "social-display-ads",
      title: "Social & Display Ads",
      description: "Created high-impact social and display ad campaigns that drove millions of impressions and consistent engagement. Formats ranged from static posts to animated banners, optimized for click-through and shareability. Campaigns generated measurable lifts in brand awareness, with one program delivering a 28% increase in qualified leads within two weeks.",
      imageRows: [
        {
          images: [
            "/images/projects/lodestone/lodestone-event-activations-1.png"
          ]
        }
      ]
    },
    {
      id: "event-activations",
      title: "Event Activations",
      description: "Brought brands to life onsite with activations that combined signage, interactive media, and gamified engagement. Stadium and event designs reached live audiences in the hundreds of thousands, while extending to digital follow-ups. Campaigns increased dwell time, boosted merchandise sales, and delivered repeat participation rates over 35% event to event.",
      imageRows: [
        {
          images: [
            "/images/projects/lodestone/lodestone-mobile-apps.png"
          ]
        }
      ]
    },
    {
      id: "mobile-applications",
      title: "Mobile Applications",
      description: "Led UX and visual design for mobile apps used by sports and entertainment clients. Apps delivered gamified features, rewards, and interactive content to fans worldwide. Increased average session length by 25% and retention by 15%, with scalable modules that worked across multiple leagues and live event environments.",
      imageRows: [
        {
          images: [
            "/images/projects/lodestone/lodestone-reports.png"
          ]
        }
      ]
    },
    {
      id: "reporting-analytics",
      title: "Reporting & Analytics",
      description: "Created reporting dashboards, infographics, and case studies that translated raw numbers into insights clients could act on. Tools tracked participation, ticket sales, and ad performance across campaigns. This reporting consistently secured renewals, with one client increasing spend 3x after clear metrics showed a 40% lift in engagement and sales."
    }
  ]
}

const jacksonvilleJaguars: ProjectExecutionData = {
  projectId: "jacksonville-jaguars",
  campaignName: "Jacksonville Jaguars",
  campaignDescription: "I designed and delivered a social activation platform featuring points, games, trivia, arcade play, meme generators, code redemption, scratch-offs, and more. To drive participation, I created supporting social and digital ads on Jaguars.com, team channels, and stadium media. Drove multi-season engagement, activated fans across all channels, scaled a reusable system, and built awareness through cohesive creative.",
  outcomes: [],
  sections: [
    {
      id: "display-ads",
      title: "Display Ads",
      description: "Digital ads built awareness and drove fans from Jaguars.com and social channels into the activation platform to play, predict, and engage.",
      imageRows: [
        {
          images: [
            "/images/projects/jacksonville-jaguars/jags-blod.png",
            "/images/projects/jacksonville-jaguars/jags-trivia.webp",
            "/images/projects/jacksonville-jaguars/jags-suit.webp"
          ]
        },
        {
          images: [
            "/images/projects/jacksonville-jaguars/jags-coming.webp",
            "/images/projects/jacksonville-jaguars/jags-bold2.webp",
            "/images/projects/jacksonville-jaguars/jags-dash.webp"
          ],
          imageContain: [
            false,
            false,
            true
          ]
        },
        {
          images: [
            "/images/projects/jacksonville-jaguars/jags-pinball.webp",
            "/images/projects/jacksonville-jaguars/jags-suit.jpg",
            "/images/projects/jacksonville-jaguars/jags-trivia.jpg"
          ]
        },
        {
          images: [
            "/images/projects/jacksonville-jaguars/jags-tweet.webp",
            "/images/projects/jacksonville-jaguars/jags-duval.webp"
          ]
        }
      ],
      externalLink: {
        label: "Visit jaguars.com",
        url: "https://www.jaguars.com/"
      }
    },
    {
      id: "apps",
      title: "Apps",
      description: "The activation hub hosted games, trivia, and rewards, giving fans interactive ways to connect with the Jaguars beyond the stadium.",
      imageRows: [
        {
          images: [
            "/images/projects/jacksonville-jaguars/jags-appsja.png"
          ]
        }
      ]
    },
    {
      id: "stadium-activations",
      title: "Stadium Activations",
      description: "Live jumbotron activations turned game day energy into digital participation, prompting fans to join in trivia, predictions, and contests.",
      imageRows: [
        {
          images: [
            "/images/projects/jacksonville-jaguars/jags-jumbo.png"
          ]
        }
      ]
    }
  ]
}

const allergyAsthmaWaco: ProjectExecutionData = {
  projectId: "allergy-asthma-waco",
  campaignName: "Allergy & Asthma Care of Waco",
  campaignDescription: "I built a multi-channel campaign with posters, billboards, social posts, events, t-shirts, and a reusable email template. Increased recognition, strengthened patient trust, expanded community presence, and delivered a scalable system for seasonal messaging and education.",
  outcomes: [],
  sections: [
    {
      id: "in-clinic-posters",
      title: "In Clinic Posters",
      description: "Reinforce trust and keep messaging present at the point of care.",
      imageRows: [
        {
          images: [
            "/images/projects/allergy-asthma-waco/aacw-allergensposter-20241205-smallseasons.png",
            "/images/projects/allergy-asthma-waco/aacw-allergensposter-20241205-smallsteps-in-asthma-management.png"
          ],
          imageContain: [
            true,
            true
          ]
        },
        {
          images: [
            "/images/projects/allergy-asthma-waco/aacw-allergensposter-20241205-smallstages-of-asthma.png",
            "/images/projects/allergy-asthma-waco/aacw-allergensposter-20241205-smallallergens.png"
          ],
          imageContain: [
            true,
            true
          ]
        }
      ],
      externalLink: {
        label: "Visit allergywaco.com",
        url: "https://www.allergywaco.com/"
      }
    },
    {
      id: "outdoor-advertising",
      title: "Outdoor Advertising",
      description: "High-visibility campaign to position the clinic as the go-to local provider.",
      imageRows: [
        {
          images: [
            "/images/projects/allergy-asthma-waco/aacow-billboard1.png",
            "/images/projects/allergy-asthma-waco/aacow-billboard2.png"
          ]
        }
      ]
    },
    {
      id: "limited-edition-poster",
      title: "Limited Edition Poster",
      description: "Bring the brand into the home by providing branded items like these posters.",
      imageRows: [
        {
          images: [
            "/images/projects/allergy-asthma-waco/bridge-1.webp"
          ],
          imageContain: [
            true
          ],
          aspect: "4/3"
        }
      ]
    },
    {
      id: "event-t-shirts",
      title: "Event T-shirts",
      description: "Bring the brand into the community at health fairs and events.",
      imageRows: [
        {
          images: [
            "/images/projects/allergy-asthma-waco/aacow-tshirt1.png",
            "/images/projects/allergy-asthma-waco/aaacow-tshirt2.png"
          ],
          imageContain: [
            true,
            true
          ]
        }
      ]
    },
    {
      id: "handouts",
      title: "Handouts",
      description: "Educate the community and provide them a service that is truly needed.",
      imageRows: [
        {
          images: [
            "/images/projects/allergy-asthma-waco/aacw-allyear-20250115-ltr.webp",
            "/images/projects/allergy-asthma-waco/allergy-clinic-poster-round1-1.png"
          ],
          imageContain: [
            true,
            true
          ]
        }
      ]
    },
    {
      id: "social-extensions",
      title: "Social Extensions",
      description: "Extend awareness online, provide seasonal health tips, and support the clinic’s trusted voice.",
      imageRows: [
        {
          images: [
            "/images/projects/allergy-asthma-waco/aacow-socials.png"
          ]
        }
      ]
    },
    {
      id: "email-and-newsletters",
      title: "Email and Newsletters",
      description: "Keep patients informed and nurture ongoing relationships through regular newsletters.",
      imageRows: [
        {
          images: [
            "/images/projects/allergy-asthma-waco/aacow-newsletters.png"
          ]
        }
      ]
    }
  ]
}

const beastPuttyHorror: ProjectExecutionData = {
  projectId: "beast-putty-horror",
  campaignName: "Beast Putty: Corporate Horror",
  campaignDescription: "I built a full-funnel direct response system with AI-driven creative, bold visuals, and limited-edition “monster drop” offers across YouTube Shorts and social. Launched October 22, 2025. Early engagement is strong, with full performance results to follow post-launch.",
  outcomes: [],
  sections: [
    {
      id: "monster-youtube-videos",
      title: "Monster YouTube Videos",
      description: "What better way to solve the trials of the daily grind by squeezing some Putty and letting the Beast handle it?",
      youtubeUrls: [
        "https://www.youtube.com/watch?v=KhqQ33TrpZg",
        "https://www.youtube.com/watch?v=P6i2UqYDjIs",
        "https://www.youtube.com/watch?v=JIdhpw8XD7U"
      ],
      externalLink: {
        label: "Visit beastputty.com",
        url: "https://beastputty.com/"
      }
    }
  ]
}

const twinb: ProjectExecutionData = {
  projectId: "twinb",
  campaignName: "TwinB",
  campaignDescription: "I created the full brand system — logo, visual identity, messaging, and tone — and designed a responsive website to showcase services, case studies, and automation tools. Secured strong client interest ahead of launch, built early subscriber momentum, and positioned TwinB for imminent rollout with a cohesive, scalable identity.",
  outcomes: [],
  sections: [
    {
      id: "logo",
      title: "Logo",
      description: "Using a timeless font and woodcut block design of a bee, this presence indicates old school understanding and current AI know how.",
      imageRows: [
        {
          images: [
            "/images/projects/twinb/image-original-2.png"
          ]
        }
      ]
    },
    {
      id: "logo-animation",
      title: "Logo Animation",
      description: "Making a vector file work through Veo3 to orchestrate a 3D movement from a 2D element."
    },
    {
      id: "site-design",
      title: "Site Design",
      description: "A multipage design with bold color palette that captures the product-led focus but design acumen of this team.",
      imageRows: [
        {
          images: [
            "/images/projects/twinb/mockuuups-clean-desk-with-dell-display-mockup.jpeg",
            "/images/projects/twinb/mockuuups-free-ipad-pro-mockup-on-textured-fabric-and-wooden-surface.jpeg",
            "/images/projects/twinb/about-us.png"
          ],
          imageContain: [
            false,
            false,
            true
          ]
        },
        {
          images: [
            "/images/projects/twinb/home-page.png",
            "/images/projects/twinb/pricing.png",
            "/images/projects/twinb/service-web-opt.png"
          ],
          imageContain: [
            true,
            true,
            true
          ]
        },
        {
          images: [
            "/images/projects/twinb/services.png",
            "/images/projects/twinb/tool-blog-writer.png",
            "/images/projects/twinb/tool-social-post-generator.png"
          ],
          imageContain: [
            true,
            true,
            true
          ]
        }
      ]
    }
  ]
}

const turn2live: ProjectExecutionData = {
  projectId: "turn2live",
  campaignName: "Turn2Live",
  campaignDescription: "",
  outcomes: [],
  sections: [
    {
      id: "posters",
      title: "Posters",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/turn2live/t2l-series-1-fin.jpg",
            "/images/projects/turn2live/t2l-series-1-nice.jpg",
            "/images/projects/turn2live/t2l-series-2-fin.jpg"
          ]
        }
      ]
    },
    {
      id: "letterhead",
      title: "Letterhead",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/turn2live/t2l-letterhead-page-1.jpg",
            "/images/projects/turn2live/t2l-letterhead-page-2.jpg"
          ],
          imageContain: [
            true,
            true
          ]
        }
      ]
    },
    {
      id: "sales-slick",
      title: "Sales Slick",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/turn2live/t2l-glossy-portfolio-1.png",
            "/images/projects/turn2live/t2l-glossy-portfolio-2.png"
          ]
        }
      ]
    },
    {
      id: "press-kit",
      title: "Press Kit",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/turn2live/t2l-presskit-09-page-02.jpg",
            "/images/projects/turn2live/t2l-presskit-09-page-03.jpg",
            "/images/projects/turn2live/t2l-presskit-09-page-04.jpg"
          ],
          imageContain: [
            true,
            true,
            true
          ]
        },
        {
          images: [
            "/images/projects/turn2live/t2l-presskit-09-page-05.jpg",
            "/images/projects/turn2live/t2l-presskit-09-page-06.jpg",
            "/images/projects/turn2live/t2l-presskit-09-page-07.jpg"
          ],
          imageContain: [
            true,
            true,
            true
          ]
        },
        {
          images: [
            "/images/projects/turn2live/t2l-presskit-09-page-08.jpg",
            "/images/projects/turn2live/t2l-presskit-09-page-09.jpg",
            "/images/projects/turn2live/t2l-presskit-09-page-10.jpg"
          ],
          imageContain: [
            true,
            true,
            true
          ]
        },
        {
          images: [
            "/images/projects/turn2live/t2l-presskit-09-page-11.jpg",
            "/images/projects/turn2live/t2l-presskit-09-page-12.jpg",
            "/images/projects/turn2live/t2l-presskit-09-page-19.jpg"
          ],
          imageContain: [
            true,
            true,
            true
          ]
        }
      ]
    },
    {
      id: "application-wireframes-final",
      title: "Application (Wireframes & Final)",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/turn2live/t2l-site-wrfs-1a-page-2.jpg",
            "/images/projects/turn2live/t2l-site-wrfs-1a-page-1.jpg",
            "/images/projects/turn2live/t2l-home-3b.jpg"
          ],
          imageContain: [
            true,
            true,
            true
          ]
        }
      ]
    },
    {
      id: "marketing",
      title: "Marketing",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/turn2live/t2l-momos.jpg",
            "/images/projects/turn2live/t2l-event-em2-1.jpg",
            "/images/projects/turn2live/t2l-vippass-page-2.jpg"
          ],
          imageContain: [
            true,
            false,
            true
          ]
        }
      ]
    }
  ]
}

const mainspring: ProjectExecutionData = {
  projectId: "mainspring",
  campaignName: "Mainspring Schools",
  campaignDescription: "",
  outcomes: [],
  sections: [
    {
      id: "2018-report",
      title: "2018 Report",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/mainspring/mainspring-annualreport-5a-1.png",
            "/images/projects/mainspring/mainspring-annualreport-5a-2.png",
            "/images/projects/mainspring/mainspring-report.png"
          ],
          imageContain: [
            true,
            true,
            true
          ]
        },
        {
          images: [
            "/images/projects/mainspring/mainspring-report2.png",
            "/images/projects/mainspring/mainspring-report3.png"
          ],
          imageContain: [
            true,
            true
          ]
        }
      ],
      externalLink: {
        label: "Visit mainspringschools.org",
        url: "https://www.mainspringschools.org/"
      }
    },
    {
      id: "2019-report",
      title: "2019 Report",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/mainspring/mainspring-annualreport-2020-2.png",
            "/images/projects/mainspring/mainspring-annualreport-2020-4.png"
          ]
        },
        {
          images: [
            "/images/projects/mainspring/mainspring-annualreport-2020-6.png",
            "/images/projects/mainspring/mainspring-annualreport-2020-1.png"
          ]
        }
      ]
    },
    {
      id: "2020",
      title: "2020",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/mainspring/mainspring-1.png",
            "/images/projects/mainspring/mainspring2.png",
            "/images/projects/mainspring/mainspring3.png"
          ],
          imageContain: [
            true,
            true,
            true
          ]
        },
        {
          images: [
            "/images/projects/mainspring/mainspring5.png",
            "/images/projects/mainspring/mainspring6.png",
            "/images/projects/mainspring/mainspring7.png"
          ],
          imageContain: [
            true,
            true,
            true
          ]
        },
        {
          images: [
            "/images/projects/mainspring/mainspring8.png",
            "/images/projects/mainspring/mainspring9.png"
          ],
          imageContain: [
            true,
            true
          ]
        }
      ]
    }
  ]
}

const hillCountryRide: ProjectExecutionData = {
  projectId: "hill-country-ride",
  campaignName: "Hill Country Ride for AIDS",
  campaignDescription: "",
  outcomes: [
    {
      value: "ADDYs",
      label: "Special Judges Award"
    }
  ],
  sections: [
    {
      id: "jersey",
      title: "Jersey",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/hill-country-ride/3-hcra-jersey-full-1.png"
          ]
        }
      ],
      externalLink: {
        label: "Visit p2p.onecause.com/hcra2024",
        url: "https://p2p.onecause.com/hcra2024"
      }
    },
    {
      id: "posters",
      title: "Posters",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/hill-country-ride/3-hcra-poster-1.png",
            "/images/projects/hill-country-ride/3-hcra-poster-2.png",
            "/images/projects/hill-country-ride/3-hcra-poster-3.png"
          ],
          imageContain: [
            true,
            true,
            true
          ]
        }
      ]
    },
    {
      id: "brochure",
      title: "Brochure",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/hill-country-ride/brian.png",
            "/images/projects/hill-country-ride/david.png",
            "/images/projects/hill-country-ride/holden.png"
          ]
        },
        {
          images: [
            "/images/projects/hill-country-ride/laura.png",
            "/images/projects/hill-country-ride/moreno.png"
          ]
        },
        {
          images: [
            "/images/projects/hill-country-ride/hcra-brochure-1-1.png",
            "/images/projects/hill-country-ride/hcra-brochure-2.png"
          ]
        }
      ]
    }
  ]
}

const austinAddys: ProjectExecutionData = {
  projectId: "austin-addys",
  campaignName: "Austin ADDYs",
  campaignDescription: "",
  outcomes: [
    {
      value: "PRINT",
      label: "Design Regional Award"
    },
    {
      value: "Gold",
      label: "Austin ADDYs"
    }
  ],
  sections: [
    {
      id: "logo-ticket",
      title: "Logo & Ticket",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/austin-addys/3-addy-ticket-1.png",
            "/images/projects/austin-addys/3-addy-ticket-2.png"
          ],
          imageContain: [
            true,
            true
          ]
        }
      ],
      externalLink: {
        label: "Visit aafaustin.org",
        url: "https://www.aafaustin.org/"
      }
    },
    {
      id: "call-for-entries-mailer",
      title: "Call for entries mailer",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/austin-addys/3-addy-book.jpg"
          ],
          imageContain: [
            true
          ],
          aspect: "4/3"
        }
      ]
    },
    {
      id: "poster-photoshoot",
      title: "Poster & photoshoot",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/austin-addys/addy069-rt16.png",
            "/images/projects/austin-addys/addy082-rt16.png"
          ],
          imageContain: [
            true,
            true
          ]
        }
      ]
    }
  ]
}

const mccombsGala: ProjectExecutionData = {
  projectId: "mccombs-gala",
  campaignName: "McCombs Hall of Fame Gala",
  campaignDescription: "",
  outcomes: [],
  sections: [
    {
      id: "gala-invitation",
      title: "Gala Invitation",
      description: "",
      imageRows: [
        {
          images: [
            "/images/projects/mccombs-gala/hof-opttwo.jpg",
            "/images/projects/mccombs-gala/hof-optone.png"
          ]
        }
      ],
      externalLink: {
        label: "Visit mccombs.utexas.edu",
        url: "https://www.mccombs.utexas.edu/"
      }
    }
  ]
}

const executionProjects: ProjectExecutionData[] = [
  beastPutty,
  lodestone,
  jacksonvilleJaguars,
  allergyAsthmaWaco,
  beastPuttyHorror,
  twinb,
  turn2live,
  mainspring,
  hillCountryRide,
  austinAddys,
  mccombsGala,
]

export function getProjectExecutions(projectId: string): ProjectExecutionData | undefined {
  return executionProjects.find((p) => p.projectId === projectId)
}
