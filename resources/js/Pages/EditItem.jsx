import { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function EditItem() {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = usePage().url;
    const id = url.split("/").pop();

    const { data, setData, patch, processing, errors } = useForm({
        transaction_type: "",
        item_name: "",
        item_description: "",
        contact_name: "",
        contact_email: "",
        return_date: "",
        notes: "",
    });

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/item/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch item");
                }
                const itemData = await response.json();

                setItem(itemData);
                // Update form data with fetched item data
                setData({
                    transaction_type: itemData.transaction_type,
                    item_name: itemData.item_name,
                    item_description: itemData.item_description || "",
                    contact_name: itemData.contact_name,
                    contact_email: itemData.contact_email,
                    return_date: itemData.return_date,
                    notes: itemData.notes || "",
                });
                setError(null);
            } catch (error) {
                setError("Error fetching item data. Please try again.");
                console.error("Error fetching item:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id, setData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("items.update", id));
    };

    if (loading) {
        return (
            <div className="container mx-auto p-6 max-w-2xl flex items-center justify-center min-h-[400px]">
                <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <p>Loading item...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-6 max-w-2xl">
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="container mx-auto p-6 max-w-2xl">
                <Alert variant="destructive">
                    <AlertDescription>Item not found.</AlertDescription>
                </Alert>
            </div>
        );
    }
    return <h1>Hi</h1>;
}

//     return (
//         <>
//             <Head title={`Edit - ${item.item_name}`} />

//             <div className="container mx-auto p-6 max-w-2xl">
//                 <div className="flex items-center mb-6">
//                     <Button variant="ghost" size="sm" asChild className="mr-4">
//                         <Link href={route("items.show", id)}>
//                             <ArrowLeft className="mr-2 h-4 w-4" />
//                             Back to Item
//                         </Link>
//                     </Button>
//                 </div>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Edit Item</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             <div className="space-y-4">
//                                 <div>
//                                     <Label>Transaction Type</Label>
//                                     <RadioGroup
//                                         value={data.transaction_type}
//                                         onValueChange={(value) =>
//                                             setData("transaction_type", value)
//                                         }
//                                         className="flex gap-4 mt-1.5"
//                                     >
//                                         <div className="flex items-center space-x-2">
//                                             <RadioGroupItem
//                                                 value="lending"
//                                                 id="lending"
//                                             />
//                                             <Label
//                                                 htmlFor="lending"
//                                                 className="font-normal"
//                                             >
//                                                 Lending
//                                             </Label>
//                                         </div>
//                                         <div className="flex items-center space-x-2">
//                                             <RadioGroupItem
//                                                 value="borrowing"
//                                                 id="borrowing"
//                                             />
//                                             <Label
//                                                 htmlFor="borrowing"
//                                                 className="font-normal"
//                                             >
//                                                 Borrowing
//                                             </Label>
//                                         </div>
//                                     </RadioGroup>
//                                     {errors.transaction_type && (
//                                         <p className="text-sm text-destructive mt-1">
//                                             {errors.transaction_type}
//                                         </p>
//                                     )}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="item_name">Item Name</Label>
//                                     <Input
//                                         id="item_name"
//                                         value={data.item_name}
//                                         onChange={(e) =>
//                                             setData("item_name", e.target.value)
//                                         }
//                                     />
//                                     {errors.item_name && (
//                                         <p className="text-sm text-destructive">
//                                             {errors.item_name}
//                                         </p>
//                                     )}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="item_description">
//                                         Description
//                                     </Label>
//                                     <Textarea
//                                         id="item_description"
//                                         value={data.item_description}
//                                         onChange={(e) =>
//                                             setData(
//                                                 "item_description",
//                                                 e.target.value
//                                             )
//                                         }
//                                         rows={3}
//                                     />
//                                     {errors.item_description && (
//                                         <p className="text-sm text-destructive">
//                                             {errors.item_description}
//                                         </p>
//                                     )}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="contact_name">
//                                         Contact Name
//                                     </Label>
//                                     <Input
//                                         id="contact_name"
//                                         value={data.contact_name}
//                                         onChange={(e) =>
//                                             setData(
//                                                 "contact_name",
//                                                 e.target.value
//                                             )
//                                         }
//                                     />
//                                     {errors.contact_name && (
//                                         <p className="text-sm text-destructive">
//                                             {errors.contact_name}
//                                         </p>
//                                     )}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="contact_email">
//                                         Contact Email
//                                     </Label>
//                                     <Input
//                                         id="contact_email"
//                                         type="email"
//                                         value={data.contact_email}
//                                         onChange={(e) =>
//                                             setData(
//                                                 "contact_email",
//                                                 e.target.value
//                                             )
//                                         }
//                                     />
//                                     {errors.contact_email && (
//                                         <p className="text-sm text-destructive">
//                                             {errors.contact_email}
//                                         </p>
//                                     )}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="return_date">
//                                         Return Date
//                                     </Label>
//                                     <Input
//                                         id="return_date"
//                                         type="date"
//                                         value={data.return_date}
//                                         onChange={(e) =>
//                                             setData(
//                                                 "return_date",
//                                                 e.target.value
//                                             )
//                                         }
//                                     />
//                                     {errors.return_date && (
//                                         <p className="text-sm text-destructive">
//                                             {errors.return_date}
//                                         </p>
//                                     )}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="notes">Notes</Label>
//                                     <Textarea
//                                         id="notes"
//                                         value={data.notes}
//                                         onChange={(e) =>
//                                             setData("notes", e.target.value)
//                                         }
//                                         rows={4}
//                                     />
//                                     {errors.notes && (
//                                         <p className="text-sm text-destructive">
//                                             {errors.notes}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="flex justify-end gap-4">
//                                 <Button type="button" variant="outline" asChild>
//                                     <Link href={route("items.show", id)}>
//                                         Cancel
//                                     </Link>
//                                 </Button>
//                                 <Button type="submit" disabled={processing}>
//                                     {processing ? (
//                                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                     ) : (
//                                         <Save className="mr-2 h-4 w-4" />
//                                     )}
//                                     {processing ? "Saving..." : "Save Changes"}
//                                 </Button>
//                             </div>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </div>
//         </>
//     );
// }
