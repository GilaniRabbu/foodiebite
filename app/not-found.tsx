import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 pt-20 pb-16">
      <div className="text-center max-w-lg space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f1f7f9]">
          <UtensilsCrossed className="h-9 w-9 text-muted-foreground" />
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Error 404
          </p>
          <h1 className="text-4xl uppercase font-bold text-gray-900">
            Page not found
          </h1>
          <p className="text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
            have been moved or no longer exists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-orange-500">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/meals">Browse Meals</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
