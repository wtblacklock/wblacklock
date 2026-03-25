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

export interface CaseStudySection {
  id: string
  heading: string
  image?: string           // full-width image rendered above the section row
  paragraphs?: string[]
  highlight?: string       // pull-quote / leadership quote
  list?: string[]
  trailingParagraph?: string
  personas?: Persona[]
  metrics?: Metric[]
  quotes?: Quote[]
  tools?: string[]
}

export interface CaseStudyData {
  projectId: string
  hero?: string
  sections: CaseStudySection[]
}

const ibmGarage: CaseStudyData = {
  projectId: 'ibm-garage',
  hero: '/images/projects/ibm-garage/hero.jpg',
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
      image: '/images/projects/ibm-garage/sharp-sticks.jpg',
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
      image: '/images/projects/ibm-garage/ebr_garage.jpg',
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
      image: '/images/projects/ibm-garage/ibm_resources.jpg',
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

export const caseStudies: CaseStudyData[] = [ibmGarage]

export function getCaseStudy(projectId: string): CaseStudyData | undefined {
  return caseStudies.find((cs) => cs.projectId === projectId)
}
