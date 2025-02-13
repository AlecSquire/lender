import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import MasterTable from "@/Pages/MasterTable/Index";
import DashboardLendForm from "./DashboardLendForm";
import { Bell, Calendar, Users } from "lucide-react";

import { useEffect, useState } from "react";
import { CheckCheck, X } from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";

export default function Dashboard({ payments }) {
    const [items, setItems] = useState([]);
    const [pagination, setPagination] = useState(null);

    const fetchItems = async (pageUrl = "/api/items") => {
        try {
            const response = await fetch(pageUrl);
            const allItems = await response.json();
            console.log(items);
            setItems(allItems.data);
            setPagination(allItems);
        } catch (error) {
            console.error("Error occurred when fetching items:", error);
        }
    };
    console.log(items);
    useEffect(() => {
        fetchItems();
    }, []); // Added fetchItems to the dependency array

    const notify = async (item) => {
        try {
            const response = await fetch("/api/notify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Specifies JSON request body
                    Accept: "application/json", // Requests JSON response
                },

                body: JSON.stringify({
                    ...item,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to send notification");
            }

            const result = await response.json();
            console.log("Notification sent:", result);
        } catch (error) {
            console.error("Error occurred when sending notification:", error);
        }
    };

    const toggleReturned = async (id) => {
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, is_returned: !item.is_returned } : item
        );
        setItems(updatedItems);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Lender Dashboard" />
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="bg-background">
                    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <SidebarTrigger className="-ml-2" />
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                        <Separator
                            orientation="vertical"
                            className="mx-2 h-6"
                        />
                    </header>
                    <main className="container mx-auto p-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card className="md:col-span-1 flex flex-col h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Due Soon
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="overflow-y-auto max-h-[400px]">
                                    {items.map((item) => {
                                        const daysRemaining = differenceInDays(
                                            parseISO(item.return_date),
                                            new Date()
                                        );
                                        return (
                                            <div
                                                key={item.id}
                                                className="border-b pb-2 mb-2"
                                            >
                                                <CardDescription>
                                                    Item Name: {item.item_name}
                                                </CardDescription>
                                                <CardDescription></CardDescription>
                                                <p className="font-medium">
                                                    {item.contact_name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {daysRemaining > 0
                                                        ? `${daysRemaining} days to return`
                                                        : daysRemaining === 0
                                                        ? "Due today"
                                                        : `${Math.abs(
                                                              daysRemaining
                                                          )} days overdue`}
                                                </p>
                                                <CardFooter>
                                                    <Button
                                                        className="w-full"
                                                        onClick={() =>
                                                            notify({ ...item })
                                                        }
                                                    >
                                                        <Bell className="mr-2 h-4 w-4" />
                                                        Notify?
                                                    </Button>
                                                </CardFooter>
                                            </div>
                                        );
                                    })}
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-1">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Users className="mr-2 h-4 w-4" />
                                        Quick Lend
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <DashboardLendForm />
                                </CardContent>
                            </Card>
                            {/* <Card className="md:col-span-1">
                                <CardHeader>
                                    <CardTitle>Statistics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Coming soon...</p>
                                </CardContent>
                            </Card> */}
                            <Card className="mt-4">
                                <CardHeader>
                                    <CardTitle>Recent Transactions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <MasterTable payments={payments} />
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </AuthenticatedLayout>
    );
}
