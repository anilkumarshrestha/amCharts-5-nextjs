import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-20">
      <div>
        <h1 className="my-10 font-medium text-2xl ">
          Example of using amCharts 5 with Nextjs
        </h1>
        <Link href={"/map-with-clustered-points"}>
          <button className="p-4 bg-blue-900 rounded text-white ">
            World Map With Clustered Points
          </button>
        </Link>
      </div>
    </main>
  );
}
