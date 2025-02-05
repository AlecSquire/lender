import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { CheckCheck, Send } from "lucide-react";
import { X } from "lucide-react";

import React from "react";
import { Head } from "@inertiajs/react";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";

export default function Lend() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <h1>Lend</h1>
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                    </div>
                </header>

                <Head title="Form" />
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-md mx-auto">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle className="text-center text-2xl">
                                    Lender Form
                                </CardTitle>
                                <CardDescription className="text-center">
                                    Fill out the details for lending or
                                    borrowing
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium">
                                            Transaction Type
                                        </label>
                                        <div className="flex space-x-4">
                                            <div className="flex items-center">
                                                <input
                                                    {...register(
                                                        "transaction_type"
                                                    )}
                                                    type="radio"
                                                    name="transaction_type"
                                                    value="lender"
                                                    id="lending"
                                                    className="mr-2 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                                />
                                                <label
                                                    htmlFor="lending"
                                                    className="text-sm font-medium text-gray-700"
                                                >
                                                    Lender
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    {...register(
                                                        "transaction_type"
                                                    )}
                                                    type="radio"
                                                    name="transaction_type"
                                                    value="borrower"
                                                    id="borrowing"
                                                    className="mr-2 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                                />
                                                <label
                                                    htmlFor="borrowing"
                                                    className="text-sm font-medium text-gray-700"
                                                >
                                                    Borrower
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            User Selector
                                        </label>
                                        <input
                                            {...register("name")}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Item Name
                                        </label>
                                        <input
                                            {...register("item")}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Contact Info
                                        </label>
                                        <input
                                            {...register("description")}
                                            placeholder="Great condition"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            {...register("phone")}
                                            type="tel"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            {...register("email")}
                                            type="email"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            className="w-full flex items-center justify-center"
                                        >
                                            <Send className="mr-2" size={16} />
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Footer />
            </SidebarInset>
        </SidebarProvider>
    );
}
