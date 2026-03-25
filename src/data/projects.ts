import projectsData from './projects.json';

export type ProjectCategory = 'Product' | 'Campaign' | 'Website' | 'Print' | 'Systems' | 'Systems Management' | 'AI Build';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  clientName: string;
  clientType: string;
  tagline: string;
  description: string;
  thumbnail: string;
  thumbnailVideo?: string;
  images: string[];
  services: string[];
  featured?: boolean;
  caseStudy?: boolean;
  content?: string;
}

export const projects: Project[] = projectsData as Project[];
