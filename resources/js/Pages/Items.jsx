import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { differenceInDays, parseISO } from "date-fns";
import { ArrowUpRight, ArrowDownLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Items() {
    const [items, setItems] = useState([]);

    const fetchItems = useCallback(async (pageUrl = "/api/items") => {
        try {
            const response = await fetch(pageUrl, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
                credentials: "include", // Ensures cookies are sent with the request
            });
            if (!response.ok) {
                throw new Error("Failed to fetch items");
            }

            const allItems = await response.json();
            console.log("API response:", allItems);
            setItems(allItems.data);
        } catch (error) {
            console.error("Error occurred when fetching items:", error);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const toggleReturned = async (id) => {
        try {
            // First, get the CSRF token
            const getCsrfToken = () => {
                const tokenMatch = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
                return tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;
            };

            const token = getCsrfToken();

            if (!token) {
                throw new Error("CSRF token not found");
            }

            // Find the current item to get its current status
            const currentItem = items.find((item) => item.id === id);
            const newStatus = !currentItem.is_returned;

            // Update UI optimistically
            const updatedItems = items.map((item) =>
                item.id === id ? { ...item, is_returned: newStatus } : item
            );
            setItems(updatedItems);

            // Send update to server
            const response = await fetch(`/api/items/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-XSRF-TOKEN": token,
                },
                credentials: "include",
                body: JSON.stringify({ is_returned: newStatus }),
            });

            if (!response.ok) {
                // If the server request fails, revert the UI change
                setItems(items);
                throw new Error("Failed to update item status");
            }
        } catch (error) {
            console.error("Error toggling returned status:", error);
            // You might want to add a user-visible error message here
        }
    };

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {items.length > 0 ? (
                items.map((item) => {
                    const daysRemaining = item.return_date
                        ? differenceInDays(
                              parseISO(item.return_date),
                              new Date()
                          )
                        : null;

                    const isLending = item.transaction_type !== "borrowing";

                    return (
                        <Card
                            key={item.id}
                            className={cn(
                                "flex flex-col transition-colors",
                                isLending
                                    ? "border-orange-200 hover:border-orange-300"
                                    : "border-blue-200 hover:border-blue-300"
                            )}
                        >
                            <CardHeader>
                                <div className="flex justify-between items-center mb-2">
                                    <Badge
                                        variant={
                                            isLending
                                                ? "destructive"
                                                : "default"
                                        }
                                        className="gap-1"
                                    >
                                        {isLending ? (
                                            <>
                                                <ArrowUpRight className="h-3 w-3" />
                                                Lending
                                            </>
                                        ) : (
                                            <>
                                                <ArrowDownLeft className="h-3 w-3" />
                                                Borrowing
                                            </>
                                        )}
                                    </Badge>
                                    <span
                                        className={cn(
                                            "text-sm font-medium",
                                            item.is_returned
                                                ? "text-green-600"
                                                : daysRemaining &&
                                                  daysRemaining < 0
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                        )}
                                    >
                                        {item.is_returned
                                            ? "Returned"
                                            : daysRemaining > 0
                                            ? `${daysRemaining} days remaining`
                                            : daysRemaining === 0
                                            ? "Due today"
                                            : `${Math.abs(
                                                  daysRemaining
                                              )} days overdue`}
                                    </span>
                                </div>
                                <CardTitle>{item.item_name}</CardTitle>
                                <CardTitle className="font-normal text-base text-muted-foreground">
                                    {item.contact_name}
                                </CardTitle>
                                <CardDescription>
                                    {item?.item_description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex items-end">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    asChild
                                >
                                    <a href={`/item/${item.id}`}>
                                        View Case
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })
            ) : (
                <Card className="flex flex-col items-center justify-center text-center p-6 border-dashed border-2 col-span-2 lg:col-span-1 h-60">
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Borrowed, but never forgotten
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                            Keep track of items you lend to friends and set
                            return dates. We'll help you remember what's out
                            there and chase them up when the time comes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-2 mt-2">
                            <div className="flex items-center gap-4">
                                <ArrowUpRight className="h-8 w-8 text-orange-500" />
                                <ArrowDownLeft className="h-8 w-8 text-blue-500" />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                                Start by adding an item using the form on the
                                right →
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
