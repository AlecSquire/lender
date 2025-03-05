import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import MasterTable from "@/Pages/MasterTable/Index";
import DashboardLendForm from "./DashboardLendForm";
import { Bell, Calendar, Users } from "lucide-react";

import { useEffect, useState } from "react";
import { CheckCheck, X } from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";
import { ModeToggle } from "@/Components/mode-toggle";
import Items from "./Items";

export default function Dashboard({ payments }) {
    // Use usePage to get auth information from Inertia shared props
    const { auth } = usePage().props;

    // Check if user is authenticated
    const isAuthenticated = auth && auth.user;

    return (
        <AuthenticatedLayout>
            <Head title="Lender Dashboard" />
            <SidebarProvider>
                <SidebarInset className="bg-background min-h-screen">
                    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center border-b bg-background px-6">
                        <h1 className="text-xl font-semibold"> Lender</h1>
                        <Separator
                            orientation="vertical"
                            className="mx-4 h-6"
                        />
                        <a
                            href="/dashboard"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {isAuthenticated &&
                                (() => {
                                    const hour = new Date().getHours();
                                    let greeting = "Good evening";
                                    if (hour < 12) greeting = "Good morning";
                                    else if (hour < 18)
                                        greeting = "Good afternoon";
                                    return `${greeting}, ${auth.user.name}`;
                                })()}
                        </a>
                        <div className="ml-auto flex items-center gap-4">
                            {isAuthenticated ? (
                                // Show logout link if user is authenticated
                                <Link
                                    href="/logout"
                                    method="post"
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Log out
                                </Link>
                            ) : (
                                // Show login and register links if user is not authenticated
                                <>
                                    <Link
                                        href="/login"
                                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                            <ModeToggle />
                        </div>
                    </header>

                    <div className="container mx-auto p-6 space-y-6">
                        {/* Top Section with Items and Form */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Items List */}
                            <Card className="lg:h-[800px] flex flex-col">
                                <CardContent className="flex-1 overflow-auto p-0">
                                    <Items />
                                </CardContent>
                            </Card>

                            {/* Quick Lend Form */}
                            <Card className="lg:h-[800px] flex flex-col">
                                <DashboardLendForm
                                    isAuthenticated={isAuthenticated}
                                />
                            </Card>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AuthenticatedLayout>
    );
}
