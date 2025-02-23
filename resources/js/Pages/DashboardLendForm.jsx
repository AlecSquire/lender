import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Send } from "lucide-react";

export default function DashboardLendForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            transaction_type: "lending",
            item_name: "",
            return_date: "",
            contact_name: "",
            contact_email: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Failed to submit");
            alert("Form submitted successfully!");
        } catch (error) {
            alert("Submission failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="h-full">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg">Add New Item</CardTitle>
                <CardDescription className="text-sm">
                    Record an item you&apos;re lending or borrowing
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-4">
                        <div>
                            <Label className="text-sm">Transaction Type</Label>
                            <RadioGroup
                                defaultValue="lending"
                                className="flex gap-4 mt-1.5"
                                {...register("transaction_type", {
                                    required: true,
                                })}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="lending"
                                        id="dashboard-lending"
                                    />
                                    <Label
                                        htmlFor="dashboard-lending"
                                        className="font-normal text-sm"
                                    >
                                        Lending
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="borrowing"
                                        id="dashboard-borrowing"
                                    />
                                    <Label
                                        htmlFor="dashboard-borrowing"
                                        className="font-normal text-sm"
                                    >
                                        Borrowing
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div>
                            <Label htmlFor="item_name" className="text-sm">
                                Item Name
                            </Label>
                            <Input
                                id="item_name"
                                className="mt-1.5 h-8"
                                {...register("item_name", {
                                    required: "Item name is required",
                                })}
                                placeholder="What are you lending/borrowing?"
                            />
                            {errors.item_name && (
                                <p className="text-xs text-destructive mt-1">
                                    {errors.item_name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="contact_name" className="text-sm">
                                Contact Name
                            </Label>
                            <Input
                                id="contact_name"
                                className="mt-1.5 h-8"
                                {...register("contact_name", {
                                    required: "Contact name is required",
                                })}
                                placeholder="Who are you lending to/borrowing from?"
                            />
                            {errors.contact_name && (
                                <p className="text-xs text-destructive mt-1">
                                    {errors.contact_name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="return_date" className="text-sm">
                                Return Date
                            </Label>
                            <Input
                                id="return_date"
                                type="date"
                                className="mt-1.5 h-8"
                                {...register("return_date", {
                                    required: "Return date is required",
                                })}
                            />
                            {errors.return_date && (
                                <p className="text-xs text-destructive mt-1">
                                    {errors.return_date.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="contact_email" className="text-sm">
                                Contact Email
                            </Label>
                            <Input
                                id="contact_email"
                                type="email"
                                className="mt-1.5 h-8"
                                {...register("contact_email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email format",
                                    },
                                })}
                                placeholder="Email address"
                            />
                            {errors.contact_email && (
                                <p className="text-xs text-destructive mt-1">
                                    {errors.contact_email.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-8 mt-2"
                        disabled={isLoading}
                    >
                        <Send className="mr-2 h-3.5 w-3.5" />
                        {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
