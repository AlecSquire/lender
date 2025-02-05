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

export default function Dashboard({ payments }) {
    return (
        <AuthenticatedLayout>
            <Head title="Lender Dashboard" />
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="bg-background">
                    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <SidebarTrigger className="-ml-2" />
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                        <Separator
                            orientation="vertical"
                            className="mx-2 h-6"
                        />
                    </header>
                    <main className="container mx-auto p-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card className="md:col-span-1 flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4" />3
                                        Days remaining
                                    </CardTitle>
                                    <CardDescription>
                                        Ironing Board
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="font-medium">Alan Squire</p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">
                                        <Bell className="mr-2 h-4 w-4" />
                                        Send a notification
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card className="md:col-span-1">
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
                            <Card className="md:col-span-1">
                                <CardHeader>
                                    <CardTitle>Statistics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Add your statistics or charts here */}
                                    <p>Coming soon...</p>
                                </CardContent>
                            </Card>
                        </div>
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>Recent Transactions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <MasterTable payments={payments} />
                            </CardContent>
                        </Card>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </AuthenticatedLayout>
    );
}
