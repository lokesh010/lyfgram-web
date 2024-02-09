import { Metadata, ResolvingMetadata } from "next";

// ui
export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const post = await getPost(id);

  return (
    <div>
      <p>{post.caption}</p>
    </div>
  );
}

// get function
async function getPost(id: number | string) {
  const { data: post } = await fetch(
    process.env.NEXT_PUBLIC_BASE_API_URL + "/posts/" + id
  ).then((r) => r.json());

  return post;
}

// generate static page
export async function generateStaticParams() {
  const { data: posts } = await fetch(
    process.env.NEXT_PUBLIC_BASE_API_URL + "/posts"
  ).then((res) => res.json());

  return posts.map(({ id }: any) => ({
    id,
  }));
}

// generate meta data
export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  const { data: post } = await fetch(
    process.env.NEXT_PUBLIC_BASE_API_URL + "/posts/" + id
  ).then((r) => r.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  function generateImage() {
    return (
      process.env.NEXT_PUBLIC_IMAGE_API_URL + "/media/og/" + post.image + ".png"
    );
  }

  return {
    applicationName: "Lyfgram",
    title: post.caption,
    openGraph: {
      title: post.caption,
      description: post.caption,
      images: "/assets/app-icon.png",
      // images: [generateImage(), ...previousImages],
    },
  };
}
