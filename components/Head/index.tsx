import Head from "next/head";
import React from "react";

interface HeadProps {
  children: React.ReactNode;
}

const title = "SOLIDS";
const imgPath = "/images/solidsgrid.jpeg";
const url = "https://solids.live/";
const description =
  "SOLIDS by FAR is one of the first generative architecture projects for the Metaverse.";

const HeadWithMeta = ({ children }: HeadProps) => {
  return (
    <Head>
      {/* Primary Meta Tags  */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook  */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgPath} />

      {/* Twitter  */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imgPath} />
      <link rel="icon" href="/favicon.ico" />

      {children}
    </Head>
  );
};

export default HeadWithMeta;
