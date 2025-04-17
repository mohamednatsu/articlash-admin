import React from 'react'

interface MainButtonProps {
    children: React.ReactNode;
}

export default function MainButton({ children }: MainButtonProps) {
    return (
        <button className="px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-primary to-accent transition-all duration-[0.5s] hover:bg-gradient-to-l shadow-md">{children}</button>
    )
}
