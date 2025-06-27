import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MealsComponent = () => {
  const meals = [
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
    <div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meals Management</h1>
        <p className="text-muted-foreground">
          Manage your restaurant&apos;s menu items and pricing
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meals.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Meals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {meals.filter((meal) => meal.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(meals.map((meal) => meal.category)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Different categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {(
                meals.reduce((sum, meal) => sum + meal.price, 0) / meals.length
              ).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Across all meals</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MealsComponent;
