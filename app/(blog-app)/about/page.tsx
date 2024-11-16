import Image from "next/image";
import Avatar from "@/public/avatar.png";
import { siteMetadata } from "@/data/siteMetaData";
import SocialIcon from "@/components/ui/social-icons";

function Emoji({ symbol, label }: { symbol: string; label?: string }) {
  return (
    <span
      role="img"
      aria-label={label || ""}
      aria-hidden={label ? "false" : "true"}
    >
      {symbol}
    </span>
  );
}

export default function AboutPage() {
  return (
    <>
      <div className="about divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About Me 🌟
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 md:text-lg md:leading-7">
            进一步了解我和这个博客的目的。
          </p>
        </div>

        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8 sm:pt-28">
            <Image
              src={Avatar}
              alt="头像"
              width={192}
              height={192}
              objectFit="cover"
              className="h-48 w-48 rounded-full"
            />

            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
              {siteMetadata.author}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">
              {siteMetadata.occupation}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {siteMetadata.school}
            </div>

            <div className="mt-2 flex gap-3">
              <SocialIcon
                kind="mail"
                href={`mailto:${siteMetadata.email}`}
                size={6}
              />

              <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            </div>
          </div>

          <div className="prose max-w-none pb-8 dark:prose-dark xl:col-span-2">
            <p></p>
            <h2>
              大家好！ <Emoji symbol="🚀" label="火箭" />
              我是 lava-chen
            </h2>
            <p>
              我是一名个人开发者，热爱编程，喜欢分享知识。我目前在读大学，专注于学习各种计算机科学知识以及其他科学知识，同时会搭建各种个人感兴趣的项目。
            </p>
            <h2>为什么要开这个博客？</h2>
            <blockquote>
              <p>
                我的想法是分享我所学到的知识，以提升自己的能力。同时作为一个前端的开发项目
                🔧。
              </p>
            </blockquote>
            <p>
              我创办这个博客是为了记录和分享我在软件工程师之路上所获取的知识和实践经验。
            </p>
            <p>
              写作和笔记帮助我巩固对新概念和技术的理解。我希望我的博客能成为同为网络开发者的有用资源
              🌐。
            </p>
            <p>
              我非常欢迎您对我所写内容的反馈和评论 <Emoji symbol="💬" />。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
