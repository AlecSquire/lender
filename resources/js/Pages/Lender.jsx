import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/Components/pagination";
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
import { CheckCheck, Send, UserCheck, CreditCard } from "lucide-react";
import { X } from "lucide-react";

export default function Lenders() {
    const [lenders, setLenders] = useState([]); // Stores the lender data
    const [pagination, setPagination] = useState(null); // Stores pagination metadata
    const [activeStatus, setActiveStatus] = useState(false);

    const fetchLenders = async (pageUrl = "/api/lenders") => {
        try {
            const response = await fetch(pageUrl);
            const allLenders = await response.json();
            setLenders(allLenders); // Update the lenders
            setPagination(allLenders); // Store pagination metadata
            console.log(allLenders);
        } catch (error) {
            console.error("Error occurred when fetching lenders:", error);
        }
    };

    useEffect(() => {
        fetchLenders(); // Fetch initial lenders
    }, []);

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <h1>All Lenders</h1>
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                        {lenders.map((lender) => (
                            <Card key={lender.id} className="w-full">
                                <div className="w-100 rounded-sm bg-muted/50">
                                    <CardHeader>
                                        <CardTitle>
                                            <p>{lender.name}</p>
                                        </CardTitle>
                                        <CardDescription>
                                            <p>Email: {lender.email}</p>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="mr-2" />
                                            Total Lent: $
                                            {lender.total_lent || 0}
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            Active Status{" "}
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setActiveStatus(
                                                        !activeStatus
                                                    )
                                                }
                                            >
                                                {activeStatus ? (
                                                    <UserCheck
                                                        color="green"
                                                        size={24}
                                                    />
                                                ) : (
                                                    <X color="red" size={24} />
                                                )}
                                            </Button>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="secondary">
                                            View Lending History
                                        </Button>
                                        <Button>
                                            <Send className="mr-2" size={16} />
                                            Contact Lender
                                        </Button>
                                    </CardFooter>
                                </div>
                            </Card>
                        ))}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
