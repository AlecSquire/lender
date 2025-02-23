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
            const response = await fetch(pageUrl);
            const allItems = await response.json();
            setItems(allItems.data);
        } catch (error) {
            console.error("Error occurred when fetching items:", error);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const toggleReturned = async (id) => {
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, is_returned: !item.is_returned } : item
        );
        setItems(updatedItems);
    };

    const notify = async (item) => {
        try {
            const response = await fetch("/api/notify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {items.map((item) => {
                const daysRemaining = item.return_date
                    ? differenceInDays(parseISO(item.return_date), new Date())
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
                                        isLending ? "destructive" : "default"
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
                                            : daysRemaining && daysRemaining < 0
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
            })}
        </div>
    );
}
