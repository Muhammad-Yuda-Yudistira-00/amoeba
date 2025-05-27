import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: false
  }
};

export default withFlowbiteReact(nextConfig);