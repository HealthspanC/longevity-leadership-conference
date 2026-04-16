import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Longevity Leadership Conference",
    short_name: "LLC 2026",
    description:
      "A Premium Executive Forum for the Longevity Industry. April 30, 2026.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f7",
    theme_color: "#2d1b4e",
    icons: [
      {
        src: "/icon.png",
        sizes: "1000x1000",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "1000x1000",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
