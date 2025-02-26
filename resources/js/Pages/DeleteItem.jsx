import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function Delete({ item }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route("items.destroy", item.id), {
            onSuccess: () => {
                // Redirect is handled by the controller
            },
        });
    };

    return (
        <>
            <Head title={`Delete - ${item.item_name}`} />

            <div className="container mx-auto p-6 max-w-xl">
                <div className="flex items-center mb-6">
                    <Button variant="ghost" size="sm" asChild className="mr-4">
                        <Link href={route("items.show", item.id)}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Item
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-destructive/10">
                                <AlertTriangle className="h-6 w-6 text-destructive" />
                            </div>
                            <div>
                                <CardTitle>Delete Item</CardTitle>
                                <CardDescription>
                                    Are you sure you want to delete this item?
                                    This action cannot be undone.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-lg border border-muted p-4">
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm font-medium">
                                        Item Name
                                    </span>
                                    <p className="text-sm text-muted-foreground">
                                        {item.item_name}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium">
                                        Contact
                                    </span>
                                    <p className="text-sm text-muted-foreground">
                                        {item.contact_name}
                                    </p>
                                </div>
                                {item.item_description && (
                                    <div>
                                        <span className="text-sm font-medium">
                                            Description
                                        </span>
                                        <p className="text-sm text-muted-foreground">
                                            {item.item_description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                            <Link href={route("items.show", item.id)}>
                                Cancel
                            </Link>
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={processing}
                        >
                            {processing ? "Deleting..." : "Delete Item"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
