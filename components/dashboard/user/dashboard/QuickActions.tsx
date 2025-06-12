"use client";
import { CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"

const QuickActions = () => {
    return (
        <Card className="col-span-3 rounded-sm shadow-none">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="w-full cursor-pointer p-3 text-left border rounded-sm hover:bg-muted/50 transition-colors">
                    <div className="font-medium">Make a Reservation</div>
                    <div className="text-sm text-muted-foreground">Book a table at your favorite restaurant</div>
                </div>
                <div className="w-full cursor-pointer p-3 text-left border rounded-sm hover:bg-muted/50 transition-colors">
                    <div className="font-medium">View Favorites</div>
                    <div className="text-sm text-muted-foreground">See your saved restaurants</div>
                </div>
                <div className="w-full cursor-pointer p-3 text-left border rounded-sm hover:bg-muted/50 transition-colors">
                    <div className="font-medium">Booking History</div>
                    <div className="text-sm text-muted-foreground">Review past dining experiences</div>
                </div>
            </CardContent>
        </Card>
    );
};

export default QuickActions;