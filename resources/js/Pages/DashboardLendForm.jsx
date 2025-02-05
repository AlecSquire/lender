import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function DashboardLendForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            transaction_type: "lending",
            item: "",
            name: "",
            date: "",
            email: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch("/transaction", {
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
        <div className="h-full w-full flex flex-col justify-between p-4">
            <h2 className="text-lg font-semibold mb-2">I am</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                {/* Radio Buttons */}
                <div className="flex space-x-4 mb-2">
                    <div className="flex items-center">
                        <input
                            {...register("transaction_type", {
                                required: true,
                            })}
                            type="radio"
                            value="lending"
                            id="dashboard-lending"
                            className="mr-1 h-3 w-3"
                        />
                        <label htmlFor="dashboard-lending" className="text-xs">
                            Lending
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            {...register("transaction_type", {
                                required: true,
                            })}
                            type="radio"
                            value="borrowing"
                            id="dashboard-borrowing"
                            className="mr-1 h-3 w-3"
                        />
                        <label
                            htmlFor="dashboard-borrowing"
                            className="text-xs"
                        >
                            Borrowing
                        </label>
                    </div>
                </div>

                {/* Item Input */}
                <h2 className="text-lg font-semibold mb-2">A</h2>
                <input
                    {...register("item", { required: "Item is required" })}
                    placeholder="Item Name"
                    className="w-full px-2 py-1 text-xs border rounded"
                />
                {errors.item && (
                    <p className="text-red-500 text-xs">
                        {errors.item.message}
                    </p>
                )}

                {/* User Name */}
                <h2 className="text-lg font-semibold mb-2">From</h2>
                <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="User"
                    className="w-full px-2 py-1 text-xs border rounded"
                />
                {errors.name && (
                    <p className="text-red-500 text-xs">
                        {errors.name.message}
                    </p>
                )}

                {/* Date Input */}
                <h2 className="text-lg font-semibold mb-2">Until</h2>
                <input
                    {...register("date", { required: "Date is required" })}
                    type="date"
                    placeholder="How long?"
                    className="w-full px-2 py-1 text-xs border rounded"
                />
                {errors.date && (
                    <p className="text-red-500 text-xs">
                        {errors.date.message}
                    </p>
                )}

                {/* Email Input */}
                <h2 className="text-lg font-semibold mb-2">Contact at</h2>
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email format",
                        },
                    })}
                    type="email"
                    placeholder="Email"
                    className="w-full px-2 py-1 text-xs border rounded"
                />
                {errors.email && (
                    <p className="text-red-500 text-xs">
                        {errors.email.message}
                    </p>
                )}

                {/* Submit Button */}
                <Button type="submit" size="sm" className="w-full mt-2">
                    <Send className="mr-2" size={12} />
                    Submit
                </Button>
            </form>
        </div>
    );
}
