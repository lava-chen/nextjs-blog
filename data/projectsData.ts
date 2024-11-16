import type { Project } from "@/types/server";

const projectsData: Project[] = [
  //   {
  //     type: "work",
  //     title:
  //       "EcomHeat - Manage Market Share, Monitor Sales Performance, Optimize Store Operation",
  //     description:
  //       "The pioneering E-commerce data intelligence platform in Vietnam for brands with the most granular data information.",
  //     imgSrc: "/static/images/projects/ecom-heat.png",
  //     url: "https://youneteci.com/en/eci-ecomheat/?ref=karhdo.dev",
  //     builtWith: ["React", "Bootstrap", "FeathersJS", "MySQL", "RabbitMQ"],
  //   },

  {
    type: "self",
    title: "Personal website",
    imgSrc: "/projects/personal-blog.png",
    repo: "lava-chen/nextjs-blog",
    builtWith: ["Next.js", "Tailwind", "Typescript", "Vercel"],
  },
  {
    type: "self",
    title: "Mnist Handwritten Digit Recognition",
    imgSrc: "/projects/mnist.png",
    repo: "lava-chen/handwritten_digits",
    builtWith: ["Python", "Networks", "Numpy"],
  },
];

export default projectsData;
