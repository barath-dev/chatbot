import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AppLayout from "@/layouts/AppLayout"

export default function Chat() {
    return (
        <AppLayout>
            <div className="flex flex-col h-screen">
                <main className="flex flex-col gap-4 p-4 md:p-6 lg:p-8 overflow-auto">
                    <div className="flex items-end gap-4">
                        <Avatar className="h-9 w-9">
                            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                            <AvatarFallback>JP</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1 text-sm">
                            <div className="font-medium">John Doe</div>
                            <div className="rounded-lg bg-gradient-to-br from-blue-200 to-purple-300 p-3">Hi, how are you doing?</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">10:15 AM</div>
                        </div>
                    </div>
                    <div className="flex items-end gap-4 ml-auto">
                        <div className="grid gap-1 text-sm text-right">
                            <div className="font-medium">You</div>
                            <div className="rounded-lg bg-gradient-to-br from-green-200 to-blue-300 p-3">
                                I'm doing great! How about you?
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">10:16 AM</div>
                        </div>
                        <Avatar className="h-9 w-9">
                            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                            <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex items-end gap-4">
                        <Avatar className="h-9 w-9">
                            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                            <AvatarFallback>JP</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1 text-sm">
                            <div className="font-medium">John Doe</div>
                            <div className="rounded-lg bg-gradient-to-br from-blue-200 to-purple-300 p-3">
                                I'm doing well too. Thanks for asking!
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">10:17 AM</div>
                        </div>
                    </div>
                </main>
                <div className="flex fixed bottom-0 max-w-5xl w-full items-center gap-4 p-4 bg-white dark:bg-gray-800 border-t border-zinc-300 dark:border-gray-700">
                    <Input className="flex-grow" placeholder="Type a message..." />
                    <Button>Send</Button>
                </div>
            </div>
        </AppLayout>
    )
}

