export interface Metric {
  value: string
  label: string
}

export interface Quote {
  text: string
  attribution: string
}

export interface Persona {
  name: string
  description: string
}

export interface GalleryItem {
  src: string
  caption?: string
}

export interface CaseStudySection {
  id: string
  heading: string
  image?: string           // full-width image rendered above the section row
  imageGrid?: string[]     // 2- or 3-up grid rendered above the section row
  video?: string           // full-width autoplaying video rendered above the section row
  videoGrid?: string[]     // 2- or 3-up grid of autoplaying videos rendered above the section row
  paragraphs?: string[]
  highlight?: string       // pull-quote / leadership quote
  list?: string[]
  trailingParagraph?: string
  personas?: Persona[]
  metrics?: Metric[]
  quotes?: Quote[]
  tools?: string[]
  gallery?: GalleryItem[]  // static image grid, e.g. Instagram feed
}

export interface CaseStudyData {
  projectId: string
  hero?: string
  hasDesigns?: boolean
  sections: CaseStudySection[]
}

const ibmGarage: CaseStudyData = {
  projectId: 'ibm-garage',
  hero: '/images/case-study/ibm-garage/hero.jpg',
  hasDesigns: true,
  sections: [
    {
      id: 'context',
      heading: 'Context',
      paragraphs: [
        'IBM Garage is a collaborative innovation methodology used by IBM Consulting to help organizations accelerate digital transformation through co-creation, rapid prototyping, and iterative delivery.',
        'In 2019, IBM Consulting leadership set an ambitious goal: 80% of client engagements should be delivered through IBM Garage within three years.',
        'The challenge was that the organization was not yet Garage-ready. Methods were inconsistent, tooling was fragmented, and teams across the organization were reinventing the process on every engagement.',
        'As the design lead and program manager, my responsibility was to help create a scalable ecosystem that would enable IBM Garage to operate consistently across hundreds of consulting teams worldwide.',
      ],
    },
    {
      id: 'problem',
      heading: 'Problem',
      paragraphs: [
        'IBM Consulting lacked a unified way to plan, sell, and deliver Garage engagements.',
        'Garages existed globally, but each operated slightly differently. There were no standardized tools, little shared knowledge between teams, and inconsistent resources for onboarding new practitioners.',
      ],
      highlight: '"Stop reinventing the wheel on every engagement. I want every Garage to be better than the last Garage because it learns from the prior Garages."',
      list: [
        'Consistent tools and frameworks',
        'Clear guidance for practitioners',
        'Shared knowledge across teams',
        'A repeatable system that could scale globally',
      ],
    },
    {
      id: 'role',
      heading: 'My Role',
      paragraphs: [
        'I served as both Design Lead and Program Manager, responsible for guiding the design, prioritization, and delivery of the Garage enablement ecosystem.',
      ],
      list: [
        'Information architecture and experience design',
        'UX research and persona development',
        'Wireframing and interaction design',
        'Visual design aligned with the Carbon Design System',
        'Agile program management and roadmap planning',
        'Development coordination and launch planning',
        'Content production and tool deployment',
        'Feedback loops and product iteration',
      ],
    },
    {
      id: 'users',
      heading: 'Understanding the Users',
      paragraphs: [
        'A one-size-fits-all approach would not work. Different practitioners interacted with Garage in very different ways.',
        'Through research and design thinking workshops, we identified five primary personas:',
      ],
      personas: [
        {
          name: 'Sellers',
          description: 'Need guidance on when Garage is the right solution and how to present it to clients.',
        },
        {
          name: 'Newcomers',
          description: 'Need a simple overview of the Garage methodology and how to get started quickly.',
        },
        {
          name: 'Go-Getters',
          description: 'Want to connect with other Garage teams to learn from their successes and failures.',
        },
        {
          name: 'Pinch Hitters',
          description: 'Need a fast way to onboard into existing engagements.',
        },
        {
          name: 'Pack Leaders',
          description: 'Need high-level frameworks and governance accepted by leadership.',
        },
      ],
    },
    {
      id: 'solution',
      heading: 'Solution',
      paragraphs: [
        'Over a nine-month period, my team designed and launched seven integrated tools that formed the core of the IBM Garage practitioner ecosystem.',
        'The goal was clarity, scalability, and speed.',
      ],
      list: [
        'IBM Garage Experience',
        'IBM Garage Squad Insights',
        'IBM Garage Playbook',
        'IBM Garage Resources',
        'IBM Garage Answers',
        'IBM Garage Outcomes',
        'IBM Garage Command Center',
      ],
      trailingParagraph:
        'Each product focused on a specific stage of the Garage lifecycle while remaining connected through a consistent experience framework.',
    },
    {
      id: 'concept-testing',
      heading: 'Rapid Concept Testing',
      image: '/images/case-study/ibm-garage/sharp-sticks.jpg',
      paragraphs: [
        'We used a rapid evaluation method we called "sharp sticks." These were intentionally low-fidelity concept artifacts used to quickly test ideas with practitioners in the field.',
        'Instead of building full products, we created simple concept cards representing potential tools and presented them during global Garage bootcamps. Participants ranked the concepts by importance and provided direct feedback.',
      ],
      list: [
        'Quickly identify high-value solutions',
        'Eliminate weaker ideas early',
        'Prioritize tools that solved real practitioner needs',
      ],
    },
    {
      id: 'execution',
      heading: 'Execution with Enterprise Design Thinking',
      image: '/images/case-study/ibm-garage/ebr_garage.jpg',
      paragraphs: [
        'Once the tools were prioritized, we organized the work using Experience-based Roadmaps, which broke long-term experiences into near-term outcomes.',
        'Each tool followed the same delivery structure:',
      ],
      list: [
        'Discovery',
        'Research synthesis',
        'Wireframes',
        'Iterative prototyping',
        'Stakeholder playbacks',
        'Production design',
        'Developer handoff',
      ],
      trailingParagraph:
        'Every two weeks we held Playbacks, presenting the work to stakeholders and collecting feedback before progressing to the next iteration. This ensured alignment across teams and allowed the solutions to evolve through real practitioner input.',
    },
    {
      id: 'tools',
      heading: 'Tools and Platforms',
      image: '/images/case-study/ibm-garage/ibm_resources.jpg',
      tools: [
        'Sketch',
        'Adobe Illustrator',
        'Adobe Photoshop',
        'Carbon Design System',
        'InVision',
        'Trello',
        'Mural',
        'Monday.com',
        'JIRA',
        'GitHub',
        'Tribe Community Platform',
        'Heap Analytics',
        'In-house NPS Product',
        'Seismic',
        'WordPress Headless',
        'Slack Apps',
        'PowerPoint / Keynote',
      ],
    },
    {
      id: 'outcomes',
      heading: 'Outcomes',
      paragraphs: [
        'Within four months of launch, the ecosystem saw strong adoption across IBM Consulting.',
      ],
      metrics: [
        { value: '73', label: 'Net Promoter Score' },
        { value: '9,594', label: 'Users' },
        { value: '13,000', label: 'Sessions' },
        { value: '10,700', label: 'Downloads' },
        { value: '80%', label: 'Power user conversion' },
        { value: '$500k/mo', label: 'Estimated time savings returned to the business' },
      ],
    },
    {
      id: 'feedback',
      heading: 'Feedback from the Field',
      quotes: [
        {
          text: 'Playbook is the first place I send our sellers. There is so much information in there.',
          attribution: 'Associate Partner',
        },
        {
          text: 'We continue to use the Playbook on a daily basis.',
          attribution: 'Garage Leader',
        },
        {
          text: 'It has come such a long way. I am grateful for the incredible work done by the team.',
          attribution: 'Partner, Seller',
        },
      ],
    },
    {
      id: 'impact',
      heading: 'Impact',
      paragraphs: [
        'The work helped transform IBM Garage from a loosely defined consulting concept into a repeatable operating model supported by tools, resources, and shared knowledge.',
        'The ecosystem allowed consulting teams to move faster, onboard new practitioners more effectively, and deliver more consistent Garage engagements worldwide.',
      ],
    },
    {
      id: 'summary',
      heading: 'Summary',
      paragraphs: [
        'This project demonstrated how design leadership and operational structure can enable large organizations to scale complex methodologies.',
        'Key principles that guided the work:',
      ],
      list: [
        'User-centered design',
        'Agile iteration',
        'Cross-functional collaboration',
        'Clear storytelling and stakeholder alignment',
        'Structured frameworks for scaling innovation',
      ],
      trailingParagraph:
        'By combining these principles with continuous feedback loops, the team successfully delivered a system that allowed IBM Garage to expand rapidly while maintaining a consistent practitioner experience.',
    },
  ],
}

const beastPutty: CaseStudyData = {
  projectId: 'addiction-campaign',
  hero: '/images/case-study/beast-putty/Kill-It.mov',
  sections: [
    {
      id: 'challenge',
      heading: 'Challenge',
      image: '/images/case-study/beast-putty/beast-calm.jpg',
      paragraphs: [
        "Beast Putty's YouTube ads were underperforming and failing to capture leads. The brand had a compelling product but lacked a cohesive visual identity across platforms, and existing content was not connecting with the target audience.",
        "The business needed to go from near-zero digital presence to a fully integrated campaign across social, print, video, and online channels — fast.",
      ],
    },
    {
      id: 'solution',
      heading: 'Solution',
      paragraphs: [
        'I built a multi-channel integrated campaign anchored around a clear brand vibe: playful, addictive, tactile. Every touchpoint was designed to drive attention, build brand recall, and convert curiosity into action.',
      ],
      list: [
        'Print advertising and in-store collateral',
        'Social media ads and content calendar',
        'Product and environmental photography',
        'AI-generated animation for YouTube Shorts',
        'Landing page and conversion flow design',
        'Logo animation and motion identity',
      ],
    },
    {
      id: 'print',
      heading: 'Print & Collateral',
      imageGrid: [
        '/images/case-study/beast-putty/beast-flyer.jpg',
        '/images/case-study/beast-putty/beast-pole.jpg',
      ],
      paragraphs: [
        "I designed print collateral to communicate the brand's tactile product experience in a flat medium — bold type, high-contrast imagery, and a minimal layout that reads fast in physical spaces.",
      ],
      list: [
        'Event flyers and trade show materials',
        'Pole cards and out-of-home placements',
        'In-store point-of-purchase signage',
      ],
    },
    {
      id: 'product-shots',
      heading: 'Product & Environmental Photography',
      imageGrid: [
        '/images/case-study/beast-putty/1up_product.jpg',
        '/images/case-study/beast-putty/3up_products.jpg',
        '/images/case-study/beast-putty/4up_products.jpg',
      ],
      paragraphs: [
        'I shot the product photography to capture what makes Beast Putty distinct — the color-changing properties that are impossible to describe in words and have to be seen. The goal was gritty and tactile, not polished or clinical.',
        'Shots were staged to show the putty mid-transformation — stretched, pulled, compressed — in environments that matched the raw energy of the campaign rather than a clean studio setup.',
      ],
      list: [
        'Color-shift product documentation across SKUs',
        'Environmental and lifestyle setups to show texture and transformation',
        'Multi-SKU lineup to show the full color range side by side',
      ],
    },
    {
      id: 'ai-animation',
      heading: 'AI Animation & Video',
      videoGrid: [
        '/images/case-study/beast-putty/beast_blood_hands.MP4',
        '/images/case-study/beast-putty/beast_tacos.MP4',
        '/images/case-study/beast-putty/beast_icy_hands.MP4',
      ],
      paragraphs: [
        'Using Kling.ai and Veo 2, I produced AI-animated short-form video content purpose-built for YouTube Shorts. ChatGPT assisted with scripting and concept iteration at speed.',
        'The production workflow combined AI image generation (MidJourney, Stable Diffusion), AI video (Kling.ai, Veo 2), and post-production editing (CapCut, After Effects) to create a high-volume content pipeline without a traditional production team.',
      ],
      list: [
        'YouTube Shorts scripted, produced, and published in rapid cycles',
        'AI-generated character and product animation',
        'Logo animation and brand motion identity',
        'A/B creative testing across video formats',
      ],
    },
    {
      id: 'landing-page',
      heading: 'Landing Page & Website',
      image: '/images/case-study/beast-putty/beast-lp.jpg',
      paragraphs: [
        'I designed a focused landing page to capture leads from paid advertising and convert organic traffic from YouTube and social. The UI prioritized speed, clarity, and a single call-to-action.',
      ],
      list: [
        'Mobile-first conversion landing page',
        'Shopify and Etsy product page optimization',
        'Email capture and lead flow design',
      ],
    },
    {
      id: 'social',
      heading: 'Social Media',
      paragraphs: [
        'I built a full social content system around Instagram and YouTube — including a content calendar, editorial templates, and a posting cadence designed to build consistent reach over time.',
        'Ad creative was tested across formats — static, carousel, and video — to identify highest-converting combinations.',
      ],
      list: [
        'Instagram content calendar and publishing system',
        'Paid ad creative for Meta and YouTube',
        'Template system for consistent organic posts',
        'Campaign performance tracking and iteration',
      ],
    },
    {
      id: 'instagram',
      heading: 'Instagram Feed',
      gallery: [
        { src: '/images/case-study/beast-putty/1up_product.jpg', caption: 'Product hero' },
        { src: '/images/case-study/beast-putty/beast-calm.jpg', caption: 'Calm mode — lifestyle' },
        { src: '/images/case-study/beast-putty/beast-pole.jpg', caption: 'Pole card OOH' },
      ],
    },
    {
      id: 'tools',
      heading: 'Tools & Platforms',
      tools: [
        'Figma',
        'Cursor',
        'Adobe Illustrator',
        'Adobe Photoshop',
        'After Effects',
        'Canva',
        'CapCut',
        'MidJourney',
        'Veo 2',
        'Kling.ai',
        'ChatGPT',
        'Stable Diffusion',
        'Shopify',
        'Etsy',
        'Google Analytics',
        'Heap Analytics',
        'Adobe InDesign',
      ],
    },
    {
      id: 'results',
      heading: 'Results',
      paragraphs: [
        'Within 21 days of launch, the campaign drove significant growth across every tracked metric.',
      ],
      metrics: [
        { value: '+999%', label: 'Increase in watch time vs previous period' },
        { value: '34,310', label: 'Views in first 21 days' },
        { value: '22', label: 'New subscribers — first month' },
        { value: '88.6 hrs', label: 'Total watch time' },
      ],
    },
    {
      id: 'reflection',
      heading: 'Reflection',
      paragraphs: [
        'Beast Putty showed what becomes possible when brand strategy, design, and AI tooling are tightly integrated from the start. The speed of the AI production pipeline allowed me to test creative directions in days rather than weeks — and the data came back fast enough to course-correct in real time.',
        'For early-stage consumer brands, the combination of a clear vibe, multi-channel presence, and rapid content iteration outperforms any single polished campaign.',
      ],
    },
  ],
}

export const caseStudies: CaseStudyData[] = [ibmGarage, beastPutty]

export function getCaseStudy(projectId: string): CaseStudyData | undefined {
  return caseStudies.find((cs) => cs.projectId === projectId)
}
