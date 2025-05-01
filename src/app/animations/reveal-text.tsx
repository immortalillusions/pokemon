"use client"

import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"
// must destructure the text prop object as a string
export default function RevealText({texts}: {texts:string}) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return

            // Hide the container until the fonts are loaded
            containerRef.current.style.visibility = "visible"

            const { chars } = splitText(
                containerRef.current.querySelector("h1")!
            )

            // Animate the words in the h1
            animate(
                chars,
                { opacity: [0, 1]},
                {
                    type: "keyframes",
                    duration: 0.01, // each char appears immediately/0.01 seconds
                    bounce: 0,
                    delay: stagger(0.1), // 0.2 seconds between each char
                }
            )
        })
    }, [])

    return (
        <div className="invisible" ref={containerRef}>
            <h1 className="h1">
                {texts}
            </h1>
            {/* <Stylesheet /> */}
        </div>
    )
}

