import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"

export function ToastDemo() {
    const { toast } = useToast()

    return (
        <Button
            variant="outline"
            onClick={() => {
                toast({
                    title: "Scheduled: Catch up ",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                    action: (
                        <ToastAction
                            altText="Go to the news detail page"
                            asChild // Use `asChild` to render a custom link instead of a button
                        >
                            <a
                                href={`${import.meta.env.PUBLIC_APP_URL}/news/1`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                詳細
                            </a>
                        </ToastAction>
                    ),
                })
            }}
        >
            Add to calendar
        </Button>
    )
}
