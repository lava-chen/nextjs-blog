import type projectsData from "@/data/projectsData";

export type ProjectDataType = (typeof projectsData)[0];

export interface ProjectCardProps {
  project: ProjectDataType;
}
export interface GithubRepository {
  stargazerCount: number;
  description: string;
  homepageUrl: string;
  languages: {
    color: string;
    name: string;
  }[];
  name: string;
  nameWithOwner: string;
  url: string;
  forkCount: number;
  repositoryTopics: string[];
}

export interface Project {
  type: "work" | "self";
  title: string;
  description?: string;
  imgSrc: string;
  url?: string;
  repo?: string | GithubRepository | null;
  builtWith: string[];
}
