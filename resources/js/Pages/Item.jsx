import { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowUpRight,
    ArrowDownLeft,
    Calendar,
    Mail,
    User,
    Package,
    CheckCircle2,
    XCircle,
    Pencil,
    ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function Item() {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = usePage().url;
    const id = url.split("/").pop();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/items/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch item");
                }
                const data = await response.json();
                setItem(data.data);
                setError(null);
            } catch (error) {
                setError("Error fetching item data. Please try again.");
                console.error("Error fetching item:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const notify = async (itemData) => {
        try {
            const response = await fetch("/api/notify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(itemData),
            });

            if (!response.ok) {
                throw new Error("Failed to send notification");
            }

            const result = await response.json();
            console.log("Notification sent:", result);
        } catch (error) {
            console.error("Error sending notification:", error);
            // Here you might want to show a user-friendly error message
        }
    };

    if (loading) {
        return <div className="container mx-auto p-6">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto p-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-red-500">{error}</div>
                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}
                            className="mt-4"
                        >
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!item) {
        return <div className="container mx-auto p-6">Item not found</div>;
    }

    return (
        <>
            <Head title={`Item - ${item.item_name}`} />

            <div className="container mx-auto p-6 max-w-5xl">
                <div className="flex items-center mb-6">
                    <Button variant="ghost" size="sm" asChild className="mr-4">
                        <Link href={route("dashboard")}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </Button>
                    <Badge
                        variant={
                            item.transaction_type !== "borrowing"
                                ? "destructive"
                                : "default"
                        }
                        className="gap-1"
                    >
                        {item.transaction_type !== "borrowing" ? (
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
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl">
                                        {item.item_name}
                                    </CardTitle>
                                    <CardDescription className="mt-2">
                                        {item.item_description}
                                    </CardDescription>
                                </div>
                                <Link href={route("item.edit", item.id)}>
                                    <Button variant="outline" size="sm">
                                        <Pencil className="h-4 w-4 mr-2" />
                                        Edit Details
                                    </Button>
                                </Link>
                                {/* <Link
                                    href={route("item.delete", item.id)}
                                    method="delete"
                                    as="button"
                                >
                                    <Button variant="destructive">
                                        Delete Case
                                    </Button>
                                </Link> */}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="details" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="details">
                                        Details
                                    </TabsTrigger>
                                    {/* <TabsTrigger value="edit">
                                        History
                                    </TabsTrigger> */}
                                    <TabsTrigger value="notes">
                                        Notes
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent
                                    value="details"
                                    className="space-y-4"
                                >
                                    <div className="grid gap-4 py-4">
                                        {[
                                            {
                                                icon: User,
                                                label: "Contact Name",
                                                value: item.contact_name,
                                            },
                                            {
                                                icon: Mail,
                                                label: "Contact Email",
                                                value: item.contact_email,
                                            },
                                            {
                                                icon: Package,
                                                label: "Item Name",
                                                value: item.item_name,
                                            },
                                            {
                                                icon: Calendar,
                                                label: "Return Date",
                                                value: format(
                                                    new Date(item.return_date),
                                                    "PPP"
                                                ),
                                            },
                                        ].map(
                                            ({ icon: Icon, label, value }) => (
                                                <div
                                                    key={label}
                                                    className="grid grid-cols-4 items-center gap-4"
                                                >
                                                    <Label className="text-right">
                                                        <Icon className="h-4 w-4 ml-auto" />
                                                    </Label>
                                                    <div className="col-span-3">
                                                        <p className="font-medium">
                                                            {value}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {label}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="history">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Badge
                                                variant="outline"
                                                className="rounded-full"
                                            >
                                                Created
                                            </Badge>
                                            <span className="text-muted-foreground">
                                                {format(
                                                    new Date(item.created_at),
                                                    "PPP"
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="notes">
                                    <Textarea
                                        placeholder="Add notes about this item..."
                                        className="min-h-[200px]"
                                        defaultValue={item.notes}
                                    />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Current Status
                                        </span>
                                        <Badge
                                            variant={
                                                item.is_returned
                                                    ? "outline"
                                                    : "secondary"
                                            }
                                            className={cn(
                                                item.is_returned
                                                    ? "text-green-600"
                                                    : "text-yellow-600"
                                            )}
                                        >
                                            {item.is_returned
                                                ? "Returned"
                                                : "Active"}
                                        </Badge>
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        <Label className="text-sm">
                                            Mark as:
                                        </Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {/* <Link
                                                href={route(
                                                    "items.mark-returned",
                                                    item.id
                                                )}
                                                method="patch"
                                                as="button"
                                                preserveScroll
                                            > */}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full"
                                            >
                                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                                                Returned
                                            </Button>
                                            {/* </Link> */}
                                            {/* <Link
                                                href={route(
                                                    "items.mark-active",
                                                    item.id
                                                )}
                                                method="patch"
                                                as="button"
                                                preserveScroll
                                            > */}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full"
                                            >
                                                <XCircle className="mr-2 h-4 w-4 text-yellow-600" />
                                                Active
                                            </Button>
                                            {/* </Link> */}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link
                                    href={"/"}
                                    method="post"
                                    as="button"
                                    preserveScroll
                                >
                                    <Button
                                        className="w-full"
                                        variant="secondary"
                                    >
                                        Send Reminder
                                    </Button>
                                </Link>
                                <Link
                                    href={route("item.delete", item.id)}
                                    method="delete"
                                    as="button"
                                >
                                    <Button variant="destructive">
                                        Delete Case
                                    </Button>
                                </Link>
                                {/* <Link
                                    href={route("items.destroy", item.id)}
                                    method="delete"
                                    as="button"
                                >
                                    <Button
                                        className="w-full"
                                        variant="destructive"
                                    >
                                        Delete Case
                                    </Button>
                                </Link> */}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
