import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# About Me

![Vipin](https://raw.githubusercontent.com/Vipin-V/imgHub/refs/heads/main/images/blogAboutVipin.avif)

hey, i'm Vipin.

so this is my blog. no niche, no content strategy, no posting schedule, just me dumping my thoughts on the internet like it's 2009 and nobody's watching.

i write about whatever's going on in my head at the time. sometimes it's places i visited. sometimes it's a meal that genuinely changed my life. sometimes it's a tech thing i went down a rabbit hole on at 2am. and sometimes it's just... life stuff. the weird, the good, the "why did i do that" moments.

i'm not trying to be an influencer or a thought leader or whatever. i just like writing, and i figured someone out there might find it relatable or useful or at least mildly entertaining.

if you're here, cool. stick around. or don't. no pressure.

— Vipin`;

export async function generateMetadata() {
  return {
    title: "About Me",
    description: "Learn more about Vipin and his experiences",
    openGraph: {
      title: "About Me",
      description: "Learn more about Vipin and his experiences",
      images: [
        signOgImageUrl({
          title: "Vipin",
          label: "About Me",
          brand: config.blog.name,
        }),
      ],
    },
  };
}

const Page = async () => {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content">
        <Markdown>{content}</Markdown>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
