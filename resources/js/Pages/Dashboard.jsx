import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
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
    return (
        <AuthenticatedLayout>
            <Head title="Lender Dashboard" />
            <SidebarProvider>
                {/* <AppSidebar /> */}
                <SidebarInset className="bg-background">
                    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        {/* <SidebarTrigger className="-ml-2" /> */}
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                        <Separator
                            orientation="vertical"
                            className="mx-2 h-6"
                        />
                        <header>
                            <a href="/dashboard">Lender</a>
                        </header>
                        <ModeToggle />
                    </header>
                    <main className="container mx-auto p-4">
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            {/* Due Soon (Left) */}
                            <Card className="flex flex-col h-full">
                                <Items />
                            </Card>

                            {/* Quick Lend (Right) */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Users className="mr-2 h-4 w-4" />
                                        Quick Lend
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <DashboardLendForm />
                                </CardContent>
                            </Card>

                            {/* Full-width MasterTable (Bottom) */}
                            <Card className="md:col-span-2">
                                <CardContent>
                                    <MasterTable payments={payments} />
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </AuthenticatedLayout>
    );
}
