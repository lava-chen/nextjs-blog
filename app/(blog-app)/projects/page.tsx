import { Metadata } from "next";
import ProjectCard from "@/components/ui/projects/projectCard";
import projectsData from "@/data/projectsData";
import { fetchRepoData } from "@/lib/github.server";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function Page() {
  await Promise.all(
    projectsData.map(async (p) => {
      if (p.repo && typeof p.repo === "string") {
        p.repo = await fetchRepoData(p.repo as string);
      }
    })
  );
  const description = "我开发的开源业余项目";
  // const workProjects = projectsData.filter(({ type }) => type === "work");
  const sideProjects = projectsData.filter(({ type }) => type === "self");

  return (
    <>
      <div className="dark:divide-gray divide-y divide-gray-200">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* <div className="container py-12">
          <h3 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Work
          </h3>
          <div className="-m-4 flex flex-wrap">
            {workProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div> */}

        <div className="container py-12">
          <h3 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Personal projects
          </h3>
          <div className="-m-4 flex flex-wrap">
            {sideProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
