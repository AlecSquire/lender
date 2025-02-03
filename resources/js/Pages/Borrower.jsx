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
import { CheckCheck, Send, UserCheck } from "lucide-react";
import { X } from "lucide-react";

export default function Borrowers() {
    const [borrowers, setBorrowers] = useState([]); // Stores the borrower data
    const [pagination, setPagination] = useState(null); // Stores pagination metadata
    const [activeStatus, setActiveStatus] = useState(false);

    const fetchBorrowers = async (pageUrl = "/api/borrowers") => {
        try {
            const response = await fetch(pageUrl);
            const allBorrowers = await response.json();
            setBorrowers(allBorrowers.data); // Update the borrowers
            setPagination(allBorrowers); // Store pagination metadata
            console.log(allBorrowers);
        } catch (error) {
            console.error("Error occurred when fetching borrowers:", error);
        }
    };

    useEffect(() => {
        fetchBorrowers(); // Fetch initial borrowers
    }, []);

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <h1>All Borrowers</h1>
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                        </div>
                    </header>

                    <div>
                        {borrowers.map((borrower) => (
                            <div key={borrower.id} className="mb-4">
                                <Card>
                                    <div className="w-100 rounded-sm bg-muted/50">
                                        <CardHeader>
                                            <CardTitle>
                                                <p>Name: {borrower.name}</p>
                                            </CardTitle>
                                            <CardDescription>
                                                <p>Email: {borrower.email}</p>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center gap-2">
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
                                                        <X
                                                            color="red"
                                                            size={24}
                                                        />
                                                    )}
                                                </Button>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            <Button variant="secondary">
                                                View Details
                                            </Button>
                                            <Button>
                                                <Send
                                                    className="mr-2"
                                                    size={16}
                                                />
                                                Send Notification
                                            </Button>
                                        </CardFooter>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
