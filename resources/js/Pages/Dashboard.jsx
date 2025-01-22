import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import TextSpeaker from "@/components/TextSpeaker";
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

export default function Dashboard({ payments }) {
    // Add payments prop
    return (
        <AuthenticatedLayout>
            <Head title="Lender" />
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <Card>
                                <div className="aspect-video rounded-xl bg-muted/50">
                                    <CardHeader>
                                        <CardTitle>3 Days remaining</CardTitle>
                                        <CardDescription>
                                            Ironing Board
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>Alan Squire</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Send an notifaction? </Button>
                                    </CardFooter>
                                </div>
                            </Card>
                            <div className="aspect-video rounded-xl bg-muted/50">
                                {/* <Scene3D modelUrl="/Chick.glb" /> */}
                                <Card>
                                    <div className="aspect-video rounded-xl bg-muted/50">
                                        <CardHeader>
                                            <CardTitle>
                                                Lend an item now
                                            </CardTitle>
                                            <CardDescription>
                                                Ironing Board
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Alan Squire</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button>
                                                Send an notifaction?{" "}
                                            </Button>
                                        </CardFooter>
                                    </div>
                                </Card>
                            </div>
                            <div className="aspect-video rounded-xl bg-muted/50"></div>
                        </div>
                        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                            <MasterTable payments={payments} />
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AuthenticatedLayout>
    );
}
