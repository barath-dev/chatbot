
export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-zinc-200 min-h-screen">

            <div className="max-w-5xl mx-auto bg-zinc-100 min-h-screen">
                {children}
            </div>
        </div>
    )
}
