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
import { CheckCheck } from "lucide-react";
import { X } from "lucide-react";

export default function Items() {
    const [items, setItems] = useState([]); // Stores the item data
    const [pagination, setPagination] = useState(null); // Stores pagination metadata
    const [returned, setReturned] = useState(items.is_returned);
    console.log(returned);

    // const toggler = (id) => {
    //     setReturned((prev) => !prev);
    // };

    // add toggler prev state function to take an id and toggle that items returned value
    // send path or put request to update the be with the new state
    // implement back end

    const fetchItems = async (pageUrl = "/api/items") => {
        try {
            const response = await fetch(pageUrl);
            const allItems = await response.json();
            setItems(allItems.data); // Update the items
            setPagination(allItems); // Store pagination metadata
        } catch (error) {
            console.error("Error occurred when fetching items:", error);
        }
    };

    useEffect(() => {
        fetchItems(); // Fetch initial items
    }, []);

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <h1>All items</h1>
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
                                                <p>Item Name: {item.name}</p>
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
                                            <Button
                                                onClick={() =>
                                                    setReturned(!returned)
                                                }
                                            >
                                                {returned ? (
                                                    <CheckCheck
                                                        color="red"
                                                        size={24}
                                                    />
                                                ) : (
                                                    <X color="red" size={24} />
                                                )}
                                            </Button>
                                        </CardContent>
                                        <CardFooter>
                                            <Button>
                                                Send a notification?
                                            </Button>
                                        </CardFooter>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {pagination && (
                        <Pagination
                            pagination={pagination}
                            onPageChange={(url) => fetchItems(url)} // Fetch items for the selected page
                        />
                    )}
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
