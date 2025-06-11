import MealDetails from "@/components/home/MealDetails";
import { NextPage } from "next";

// Use Next.js's built-in type for dynamic route pages
type MealPageProps = {
  params: Promise<{ id: string }>; // params is a Promise in Next.js 13+
};

// Use NextPage type for the page component
const Page: NextPage<MealPageProps> = async ({ params }) => {
  const { id } = await params; // Await the params to resolve the Promise

  return (
    <main className="min-h-screen bg-white">
      <MealDetails id={id} />
    </main>
  );
};

export default Page;
