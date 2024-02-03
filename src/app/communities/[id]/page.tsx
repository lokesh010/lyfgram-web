import { Metadata, ResolvingMetadata } from "next";
import { useEffect } from "react";

// ui
export default async function CommunityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const community = await getCommunity(id);

  function deepLink() {
    window.location.href = "lyfgram://communities/" + id;
  }

  return (
    <div>
      <p>{community.name}</p>
      <button className="p-2 bg-white" onClick={deepLink}>
        Redirect
      </button>
    </div>
  );
}

// get function
async function getCommunity(id: number | string) {
  const { data: community } = await fetch(
    process.env.NEXT_PUBLIC_BASE_API_URL + "/communities/" + id
  ).then((r) => r.json());

  return community;
}

// generate static page
export async function generateStaticParams() {
  const { data: communities } = await fetch(
    process.env.NEXT_PUBLIC_BASE_API_URL + "/communities/"
  ).then((res) => res.json());

  return communities.map(({ id }: any) => ({
    id,
  }));
}

// generate meta data
export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  const { data: community } = await fetch(
    process.env.NEXT_PUBLIC_BASE_API_URL + "/communities/" + id
  ).then((r) => r.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  function generateImage() {
    return (
      process.env.NEXT_PUBLIC_IMAGE_API_URL +
      "/media/og/" +
      community.image +
      ".png"
    );
  }

  return {
    applicationName: "Lyfgram",
    title: community.name,
    openGraph: {
      title: community.name,
      description: community.description,
      images: [generateImage(), ...previousImages],
    },
  };
}
