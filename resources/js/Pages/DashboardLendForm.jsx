import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Send,
    LogIn,
    UserPlus,
    ChevronDown,
    ChevronUp,
    PenLine,
} from "lucide-react";

export default function DashboardLendForm({ isAuthenticated }) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            transaction_type: "lending",
            item_name: "",
            return_date: "",
            contact_name: "",
            contact_email: "",
            item_description: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    // Watch transaction type for dynamic placeholder text
    const transactionType = watch("transaction_type");

    // Use a simpler approach with a wrapper div
    const FormWrapper = ({ children }) => {
        // If authenticated, just render children normally
        if (isAuthenticated) {
            return <>{children}</>;
        }

        // If not authenticated, add a click handler to the wrapper
        return (
            <div
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowAuthModal(true);
                }}
                className="relative"
            >
                {/* Semi-transparent overlay to indicate form is disabled */}
                <div className="absolute inset-0 bg-background/50 z-10 cursor-pointer" />
                {children}
            </div>
        );
    };

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            // First, get the CSRF cookie
            await fetch("/sanctum/csrf-cookie", {
                method: "GET",
                credentials: "include", // Ensures cookies are sent
            });

            // Then, make the API request
            const response = await fetch("/api/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Ensures session is recognized
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to submit");
            }

            alert("Item saved successfully!");
        } catch (error) {
            alert(`Submission failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = () => {
        window.location.href = "/login";
    };

    const handleRegister = () => {
        window.location.href = "/register";
    };

    return (
        <>
            <Card className="h-full shadow-sm">
                <CardHeader className="pb-3 border-b">
                    <CardTitle className="text-xl font-semibold">
                        Add New Item
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Record an item you're{" "}
                        {transactionType === "lending"
                            ? "lending to someone"
                            : "borrowing from someone"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <FormWrapper>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-5">
                                {/* Transaction Type */}
                                <div className="flex items-center justify-start gap-6 bg-muted/30 p-3 rounded-lg">
                                    <span className="text-sm font-medium">
                                        I am:
                                    </span>
                                    <div className="flex gap-4">
                                        <Controller
                                            name="transaction_type"
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            id="lending"
                                                            value="lending"
                                                            className="peer sr-only"
                                                            checked={
                                                                field.value ===
                                                                "lending"
                                                            }
                                                            onChange={() =>
                                                                field.onChange(
                                                                    "lending"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="lending"
                                                            onClick={() =>
                                                                field.onChange(
                                                                    "lending"
                                                                )
                                                            }
                                                            className="px-3 py-1 rounded-full text-sm cursor-pointer transition-colors border border-transparent hover:border-muted-foreground/20"
                                                            style={{
                                                                backgroundColor:
                                                                    field.value ===
                                                                    "lending"
                                                                        ? "var(--primary)"
                                                                        : "transparent",
                                                                color:
                                                                    field.value ===
                                                                    "lending"
                                                                        ? "var(--primary-foreground)"
                                                                        : "inherit",
                                                            }}
                                                        >
                                                            Lending
                                                        </label>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            id="borrowing"
                                                            value="borrowing"
                                                            className="peer sr-only"
                                                            checked={
                                                                field.value ===
                                                                "borrowing"
                                                            }
                                                            onChange={() =>
                                                                field.onChange(
                                                                    "borrowing"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="borrowing"
                                                            onClick={() =>
                                                                field.onChange(
                                                                    "borrowing"
                                                                )
                                                            }
                                                            className="px-3 py-1 rounded-full text-sm cursor-pointer transition-colors border border-transparent hover:border-muted-foreground/20"
                                                            style={{
                                                                backgroundColor:
                                                                    field.value ===
                                                                    "borrowing"
                                                                        ? "var(--primary)"
                                                                        : "transparent",
                                                                color:
                                                                    field.value ===
                                                                    "borrowing"
                                                                        ? "var(--primary-foreground)"
                                                                        : "inherit",
                                                            }}
                                                        >
                                                            Borrowing
                                                        </label>
                                                    </div>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Item Name */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="item_name"
                                        className="text-sm font-medium"
                                    >
                                        Item Name{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        id="item_name"
                                        className="h-10"
                                        {...register("item_name", {
                                            required: "Item name is required",
                                        })}
                                        placeholder={
                                            transactionType === "lending"
                                                ? "What are you lending?"
                                                : "What are you borrowing?"
                                        }
                                    />
                                    {errors.item_name && (
                                        <p className="text-xs text-destructive mt-1">
                                            {errors.item_name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Contact Name */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="contact_name"
                                        className="text-sm font-medium"
                                    >
                                        Contact Name{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        id="contact_name"
                                        className="h-10"
                                        {...register("contact_name", {
                                            required:
                                                "Contact name is required",
                                        })}
                                        placeholder={
                                            transactionType === "lending"
                                                ? "Who are you lending to?"
                                                : "Who are you borrowing from?"
                                        }
                                    />
                                    {errors.contact_name && (
                                        <p className="text-xs text-destructive mt-1">
                                            {errors.contact_name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Contact Email */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="contact_email"
                                        className="text-sm font-medium"
                                    >
                                        Contact Email{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        id="contact_email"
                                        type="email"
                                        className="h-10"
                                        {...register("contact_email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Invalid email format",
                                            },
                                        })}
                                        placeholder="Email address"
                                    />
                                    {errors.contact_email && (
                                        <p className="text-xs text-destructive mt-1">
                                            {errors.contact_email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Return Date */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="return_date"
                                        className="text-sm font-medium"
                                    >
                                        Return Date{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        id="return_date"
                                        type="date"
                                        className="h-10"
                                        {...register("return_date", {
                                            required: "Return date is required",
                                        })}
                                    />
                                    {errors.return_date && (
                                        <p className="text-xs text-destructive mt-1">
                                            {errors.return_date.message}
                                        </p>
                                    )}
                                </div>

                                {/* Description Toggle Button */}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="flex items-center text-sm text-muted-foreground w-full justify-start px-0 hover:bg-transparent"
                                    onClick={() =>
                                        setShowDescription(!showDescription)
                                    }
                                >
                                    {showDescription ? (
                                        <>
                                            <ChevronUp className="h-4 w-4 mr-1" />
                                            Hide description
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="h-4 w-4 mr-1" />
                                            <PenLine className="h-4 w-4 mr-1" />
                                            Add description (optional)
                                        </>
                                    )}
                                </Button>

                                {/* Optional Description Field */}
                                {showDescription && (
                                    <div className="space-y-2 animate-in fade-in-50 duration-200">
                                        <Label
                                            htmlFor="item_description"
                                            className="text-sm font-medium flex items-center"
                                        >
                                            Description{" "}
                                            <span className="text-xs text-muted-foreground ml-1">
                                                (optional)
                                            </span>
                                        </Label>
                                        <Textarea
                                            id="item_description"
                                            className="h-24 resize-none"
                                            {...register("item_description")}
                                            placeholder="Add details about the item..."
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-8">
                                <Button
                                    type="submit"
                                    className="w-full h-10 font-medium"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Saving...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <Send className="mr-2 h-4 w-4" />
                                            Save Item
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </FormWrapper>
                </CardContent>
            </Card>

            {/* Authentication Modal */}
            <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Authentication Required</DialogTitle>
                        <DialogDescription>
                            You need to be logged in or registered to save an
                            item.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                        <Button
                            className="w-full sm:w-auto"
                            onClick={handleLogin}
                            variant="default"
                        >
                            <LogIn className="mr-2 h-4 w-4" />
                            Login
                        </Button>
                        <Button
                            className="w-full sm:w-auto"
                            onClick={handleRegister}
                            variant="outline"
                        >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Register
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
