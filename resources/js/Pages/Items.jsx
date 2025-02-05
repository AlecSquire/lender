import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/Components/pagination";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { CheckCheck, X, Bell } from "lucide-react";

export default function Items() {
    const [items, setItems] = useState([]);
    const [pagination, setPagination] = useState(null);

    const fetchItems = async (pageUrl = "/api/items") => {
        try {
            const response = await fetch(pageUrl);
            const allItems = await response.json();
            setItems(allItems.data);
            setPagination(allItems);
        } catch (error) {
            console.error("Error occurred when fetching items:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [fetchItems]); // Added fetchItems to the dependency array

    const toggleReturned = async (id) => {
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, is_returned: !item.is_returned } : item
        );
        setItems(updatedItems);

        // TODO: Implement API call to update the backend
        // try {
        //   await fetch(`/api/items/${id}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ is_returned: !items.find(item => item.id === id).is_returned })
        //   });
        // } catch (error) {
        //   console.error("Error updating item:", error);
        // }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-background">
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <SidebarTrigger className="-ml-2" />
                    <h1 className="text-xl font-semibold">All Items</h1>
                    <Separator orientation="vertical" className="mx-2 h-6" />
                </header>

                <main className="container mx-auto p-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                            <Card key={item.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle>{item.name}</CardTitle>
                                    <CardDescription>
                                        {item.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="mb-2">
                                        Status:{" "}
                                        <span
                                            className={
                                                item.is_returned
                                                    ? "text-green-600 font-medium"
                                                    : "text-red-600 font-medium"
                                            }
                                        >
                                            {item.is_returned
                                                ? "Returned"
                                                : "Not Returned"}
                                        </span>
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleReturned(item.id)}
                                        className="w-full"
                                    >
                                        {item.is_returned ? (
                                            <X className="mr-2 h-4 w-4" />
                                        ) : (
                                            <CheckCheck className="mr-2 h-4 w-4" />
                                        )}
                                        {item.is_returned
                                            ? "Mark as Not Returned"
                                            : "Mark as Returned"}
                                    </Button>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="w-full"
                                    >
                                        <Bell className="mr-2 h-4 w-4" />
                                        Send Notification
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {pagination && (
                        <div className="mt-8">
                            <Pagination
                                pagination={pagination}
                                onPageChange={(url) => fetchItems(url)}
                            />
                        </div>
                    )}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
