"use client";
import { CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"


const RecentBooking = () => {
    return (
        <Card className="col-span-4 rounded-sm shadow-none">
            <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-sm">
                        <div>
                            <p className="font-medium">The Garden Bistro</p>
                            <p className="text-sm text-muted-foreground">Tomorrow, 7:30 PM • 4 guests</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Confirmed</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-sm">
                        <div>
                            <p className="font-medium">Coastal Kitchen</p>
                            <p className="text-sm text-muted-foreground">Dec 28, 6:00 PM • 2 guests</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Pending</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-sm">
                        <div>
                            <p className="font-medium">Urban Spice</p>
                            <p className="text-sm text-muted-foreground">Dec 30, 8:00 PM • 6 guests</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Confirmed</span>
                    </div>
                </div>
            </CardContent>
        </Card>



    );
};

export default RecentBooking;