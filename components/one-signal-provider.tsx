"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    OneSignalDeferred?: Array<(oneSignal: any) => void>
    OneSignal?: any
  }
}

interface OneSignalProviderProps {
  appId: string
  children?: React.ReactNode
}

export function OneSignalProvider({ appId, children }: OneSignalProviderProps) {
  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== "undefined") {
      window.OneSignalDeferred = window.OneSignalDeferred || []
      window.OneSignalDeferred.push((OneSignal: any) => {
        OneSignal.init({
          appId: appId,
          safari_web_id: "web.onesignal.auto.4e6ae055-7872-4c1f-b42a-6c60bed16bbe",
          notifyButton: {
            enable: true,
          },
          // Optional: Add more configuration options
          allowLocalhostAsSecureOrigin: process.env.NODE_ENV === "development",
        })
      })

      // Load OneSignal SDK script
      if (!document.getElementById("onesignal-sdk")) {
        const script = document.createElement("script")
        script.id = "onesignal-sdk"
        script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
        script.defer = true
        document.head.appendChild(script)
      }
    }
  }, [appId])

  return <>{children}</>
}
