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
import { CheckCheck } from "lucide-react";
import { X } from "lucide-react";

// export interface allItems {
//     name: string;
//     borrower_id: number;
//     id: number;
//     created_at: number;
//     description: string;
//     expiry_date?: Date;
//     user_id: number;
//     is_returned: boolean;
// }

export default function Items() {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const response = await fetch("/api/items");
        const allItems = await response.json();
        return allItems;
    };
    useEffect(() => {
        fetchItems()
            .then((items) => {
                setItems(items);
                console.log(items);
            })
            .catch(() => {
                console.log("Error occured when fetching items blud");
            });
    }, []);

    return (
        <>
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

                    <div>
                        {items.map((item) => (
                            <div key={item.id}>
                                <Card>
                                    <div className="w-100 rounded-sm bg-muted/50">
                                        <CardHeader>
                                            <CardTitle>
                                                {" "}
                                                <p>Item Name:{item.name}</p>
                                            </CardTitle>
                                            <CardDescription>
                                                <p>
                                                    Item Description:{" "}
                                                    {item.description}
                                                </p>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            Item is Returned{" "}
                                            {item.is_returned ? (
                                                <CheckCheck
                                                    color="red"
                                                    size={24}
                                                />
                                            ) : (
                                                <X color="red" size={24} />
                                            )}
                                            {/* Is returned? {item.is_returned} */}
                                        </CardContent>
                                        <CardFooter>
                                            <Button>
                                                Send an notifaction?{" "}
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
