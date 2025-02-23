import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { differenceInDays, parseISO } from "date-fns";

import { CheckCheck, X, Bell } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function Items() {
    const [items, setItems] = useState([]);

    const fetchItems = async (pageUrl = "/api/items") => {
        try {
            const response = await fetch(pageUrl);
            const allItems = await response.json();
            console.log(allItems.data);
            setItems(allItems.data);
        } catch (error) {
            console.error("Error occurred when fetching items:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

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

    return (
        <div>
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <h1 className="text-xl font-semibold">All Items</h1>
                <Separator orientation="vertical" className="mx-2 h-6" />
            </header>

            <main className="container mx-auto p-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => {
                        const daysRemaining = item.return_date
                            ? differenceInDays(
                                  parseISO(item.return_date),
                                  new Date()
                              )
                            : null;

                        return (
                            <Card key={item.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle>{item.item_name}</CardTitle>
                                    <CardTitle className={"font-thin"}>
                                        {item.contact_name}
                                    </CardTitle>
                                    <CardDescription>
                                        {item?.item_description}
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
                                            <>
                                                <X className="mr-2 h-4 w-4" />
                                                <p className="text-sm text-gray-600">
                                                    Returned
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <CheckCheck className="mr-2 h-4 w-4" />
                                                <p className="text-sm text-gray-600">
                                                    {daysRemaining > 0
                                                        ? `${daysRemaining} days to return`
                                                        : daysRemaining === 0
                                                        ? "Due today"
                                                        : `${Math.abs(
                                                              daysRemaining
                                                          )} days overdue`}
                                                </p>
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => notify(item)}
                                    >
                                        <Bell className="mr-2 h-4 w-4" />
                                        Send Notification
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
