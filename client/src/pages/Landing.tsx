import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/AppLayout";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <AppLayout>
            <div className="flex flex-col gap-5 text-center items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">Smart Chatbot</h1>
                <p className="w-1/2">
                    Our chatbot can give you up to date information about the temperature and weather of a place, direction helping and information about historical places
                </p>
                <Button>
                    <Link to="/chat">Chat Now</Link>
                </Button>
                <div>

                    <p>Built With</p>
                    <p className="text-zinc-500">React • Tailwind CSS • FastAPI • Tensorflow • NLTK</p>
                </div>
            </div>
        </AppLayout>
    )
}
