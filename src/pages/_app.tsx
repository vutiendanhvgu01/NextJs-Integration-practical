import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ResusedLayout from "../common/reused-layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ResusedLayout>
        <Component {...pageProps} />
      </ResusedLayout>
    </>
  );
}
