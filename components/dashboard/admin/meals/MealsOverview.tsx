/* eslint-disable */
"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetAllMealsQuery } from "@/redux/api/mealApi";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Loader from "@/components/shared/Loader";
import Image from "next/image";
import MealsForm from "./MealsForm";

const MealsOverview = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useGetAllMealsQuery(undefined);

  if (isLoading) <Loader />;

  if (isError || !data?.data) {
    return <div className="text-red-500">Failed to load meals.</div>;
  }

  const meals = data.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meals Management</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your restaurant&apos;s menu items and pricing
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-none rounded-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-none rounded-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Meals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground">Currently available</p>
          </CardContent>
        </Card>
        <Card className="shadow-none rounded-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Different categories
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-none rounded-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18</div>
            <p className="text-xs text-muted-foreground">Across all meals</p>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-md p-4 flex gap-4 flex-wrap items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          All Meals Details
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="px-4 py-2 cursor-pointer text-sm rounded-md bg-indigo-600 text-white">
              Create Meal
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create a New Meal</DialogTitle>
              <DialogDescription>
                Fill the form below to add a new meal.
              </DialogDescription>
            </DialogHeader>

            <MealsForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[120px]">Image</TableHead>
              <TableHead className="min-w-[150px]">Name</TableHead>
              <TableHead className="min-w-[120px]">Type</TableHead>
              <TableHead className="min-w-[120px]">Price</TableHead>
              <TableHead className="min-w-[120px]">Available</TableHead>
              <TableHead className="min-w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meals.map((meal: any) => (
              <TableRow key={meal._id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={meal.images?.[0]?.url || "/placeholder.png"}
                      alt={meal.images?.[0]?.altText || "Meal image"}
                      width={50}
                      height={50}
                      className="rounded-md object-cover aspect-square"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-gray-800">
                  {meal.name}
                </TableCell>
                <TableCell>
                  <span className="text-xs rounded px-2 py-1 bg-indigo-100 text-indigo-700">
                    {meal.type}
                  </span>
                </TableCell>
                <TableCell>${meal.price.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded ${
                      meal.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {meal.isAvailable ? "Yes" : "No"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-50"
                    // onClick={() => handleDelete(meal._id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MealsOverview;
