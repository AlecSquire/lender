import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function DashboardLendForm() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div className="h-full w-full flex flex-col justify-between p-4">
            <h2 className="text-lg font-semibold mb-2">Quick Lend</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <div className="flex space-x-4 mb-2">
                    <div className="flex items-center">
                        <input
                            {...register("transaction_type")}
                            type="radio"
                            name="transaction_type"
                            value="lender"
                            id="dashboard-lending"
                            className="mr-1 h-3 w-3"
                        />
                        <label htmlFor="dashboard-lending" className="text-xs">
                            Lender
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            {...register("transaction_type")}
                            type="radio"
                            name="transaction_type"
                            value="borrower"
                            id="dashboard-borrowing"
                            className="mr-1 h-3 w-3"
                        />
                        <label
                            htmlFor="dashboard-borrowing"
                            className="text-xs"
                        >
                            Borrower
                        </label>
                    </div>
                </div>

                <input
                    {...register("item")}
                    placeholder="Item Name"
                    className="w-full px-2 py-1 text-xs border rounded"
                />

                <input
                    {...register("name")}
                    placeholder="User Name"
                    className="w-full px-2 py-1 text-xs border rounded"
                />

                <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="w-full px-2 py-1 text-xs border rounded"
                />

                <Button type="submit" size="sm" className="w-full mt-2">
                    <Send className="mr-2" size={12} />
                    Submit
                </Button>
            </form>
        </div>
    );
}
