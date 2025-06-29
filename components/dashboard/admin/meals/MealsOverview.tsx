/* eslint-disable */
"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllMealsQuery } from "@/redux/api/mealApi";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Loader from "@/components/shared/Loader";
import Image from "next/image";

const MealsOverview = () => {
  const { data, isLoading, isError } = useGetAllMealsQuery(undefined);

  if (isLoading) <Loader />;

  if (isError || !data?.data) {
    return <div className="text-red-500">Failed to load meals.</div>;
  }

  const meals = data.data;

  const meal = [
    {
      id: 1,
      name: "Grilled Salmon",
      category: "Main Course",
      price: 24.99,
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
      description: "Fresh Atlantic salmon with herbs",
      ingredients: "Salmon, herbs, lemon",
      calories: 350,
      preparationTime: "25 min",
    },
    {
      id: 2,
      name: "Caesar Salad",
      category: "Appetizer",
      price: 12.99,
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
      description: "Classic Caesar salad with croutons",
      ingredients: "Lettuce, parmesan, croutons",
      calories: 180,
      preparationTime: "10 min",
    },
    {
      id: 3,
      name: "Chocolate Cake",
      category: "Dessert",
      price: 8.99,
      status: "inactive",
      image: "/placeholder.svg?height=40&width=40",
      description: "Rich chocolate cake with ganache",
      ingredients: "Chocolate, flour, eggs",
      calories: 420,
      preparationTime: "45 min",
    },
    {
      id: 4,
      name: "Beef Burger",
      category: "Main Course",
      price: 16.99,
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
      description: "Juicy beef burger with fries",
      ingredients: "Beef, bun, lettuce, tomato",
      calories: 650,
      preparationTime: "20 min",
    },
    {
      id: 5,
      name: "Vegetable Soup",
      category: "Appetizer",
      price: 9.99,
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
      description: "Fresh seasonal vegetable soup",
      ingredients: "Mixed vegetables, broth",
      calories: 120,
      preparationTime: "30 min",
    },
    {
      id: 6,
      name: "Tiramisu",
      category: "Dessert",
      price: 7.99,
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
      description: "Classic Italian tiramisu",
      ingredients: "Mascarpone, coffee, ladyfingers",
      calories: 380,
      preparationTime: "15 min",
    },
  ];

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
            <div className="text-2xl font-bold">{meals.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-none rounded-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Meals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {meal.filter((m) => m.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently available</p>
          </CardContent>
        </Card>
        <Card className="shadow-none rounded-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(meal.map((m) => m.category)).size}
            </div>
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
            <div className="text-2xl font-bold">
              $
              {(
                meal.reduce((sum, m) => sum + m.price, 0) / meal.length
              ).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Across all meals</p>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-md p-4 flex gap-4 flex-wrap items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          All Meals Details
        </h2>
        <Button className="px-4 py-2 cursor-pointer text-sm rounded-md bg-indigo-600 text-white">
          Create Meal
        </Button>
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
