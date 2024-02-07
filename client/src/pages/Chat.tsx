import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useChat from "@/hooks/useChat"
import AppLayout from "@/layouts/AppLayout"
import { useState } from "react"
type Message = {
    type: string
    message: string
    sender: string
    temperature?: string
    weather?: string
    icon?: string
}
export default function Chat() {

    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<Message[]>([

    ])
    const { getChat } = useChat()
    const handleSend = async () => {
        const { response } = await getChat(message)
        setMessages([...messages, {
            type: "text",
            message: message,
            sender: "user"
        },
        {
            type: response.type,
            message: response.message,
            temperature: response.temperature,
            weather: response.weather,
            icon: response.icon,
            sender: "bot"

        }])
        setMessage('')

    }
    return (
        <AppLayout>
            <div className="flex flex-col h-screen">
                <main className="flex flex-col gap-4 p-4 md:p-6 lg:p-8 overflow-auto mb-20">
                    {
                        messages.map((item, index) => {
                            return (
                                item.type === 'temperature' && <TemperatureMessage key={index} message={item.message} temperature={item.temperature!} /> ||
                                item.type === 'text' && item.sender === 'user' && <UserMessage key={index} message={item.message} /> ||
                                item.type === 'text' && item.sender === 'bot' && <BotMessage key={index} message={item.message} /> ||
                                item.type === 'weather' && <WeatherMessage key={index} weather={item.weather!} icon={item.icon!} message={item.message} />
                            )
                        })
                    }
                </main>
                <div className="flex fixed bottom-0 max-w-5xl w-full items-center gap-4 p-4 bg-white dark:bg-gray-800 border-t border-zinc-300 dark:border-gray-700">
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-grow" placeholder="Type a message..." />
                    <Button
                        onClick={handleSend}
                    >Send</Button>
                </div>
            </div>
        </AppLayout>
    )
}
const TemperatureMessage = ({ temperature, message }: { temperature: string, message: string }) => {
    return (
        <div className="flex items-end gap-4 mr-auto">
            <Avatar className="h-9 w-9 border-2">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 text-sm">
                <div className="font-medium">Bot</div>
                <div className={"rounded-lg p-3 bg-gradient-to-br from-blue-200 to-purple-300"}>
                    <p>{message}</p>
                    <p className="font-medium text-xl">{temperature} °F</p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">10:16 AM</div>
            </div>
        </div>

    )
}
const UserMessage = ({ message }: { message: string }) => {
    return (
        <div className="flex items-end gap-4 ml-auto">
            <Avatar className="h-9 w-9 border-2">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 text-sm">
                <div className="font-medium">You</div>
                <div className={"rounded-lg p-3 bg-gradient-to-br from-green-200 to-blue-300"}>{message}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">10:16 AM</div>
            </div>
        </div>
    )
}
const BotMessage = ({ message }: { message: string }) => {
    return (
        <div className="flex items-end gap-4">
            <Avatar className="h-9 w-9 border-2">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 text-sm">
                <div className="font-medium">Bot</div>
                <div className={"rounded-lg p-3 bg-gradient-to-br from-blue-200 to-purple-300"}>{message}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">10:16 AM</div>
            </div>
        </div>
    )
}
const WeatherMessage = ({ weather, icon, message }: { weather: string, icon: string, message: string }) => {
    console.log(icon)
    return (
        <div className="flex items-end gap-4">
            <Avatar className="h-9 w-9 border-2">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 text-sm">
                <div className="font-medium">Bot</div>
                <div className={"rounded-lg p-3 bg-gradient-to-br from-blue-200 to-purple-300"}>
                    <p>{message}</p>
                    <img src={icon} className="mx-auto" alt={weather} />
                    <p className="text-xl uppercase">{weather}</p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">10:16 AM</div>
            </div>
        </div>
    )
}