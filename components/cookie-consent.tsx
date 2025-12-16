"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Cookie, Settings, X, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const COOKIE_CONSENT_KEY = "cookie-consent"

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  functional: boolean
  marketing: boolean
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    functional: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setShowBanner(true)
      }, 1000)
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent)
        setPreferences(saved)
      } catch (e) {
        // If parsing fails, show banner again
        setShowBanner(true)
      }
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    }
    savePreferences(allAccepted)
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
    }
    savePreferences(onlyNecessary)
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    savePreferences(preferences)
    setShowSettings(false)
    setShowBanner(false)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs))
    // Here you would typically initialize/disable analytics based on preferences
    if (prefs.analytics) {
      // Initialize analytics (e.g., Google Analytics, Vercel Analytics)
      // Vercel Analytics is already in the layout, but you could conditionally load it
    }
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return // Can't disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-4 animate-in slide-in-from-bottom duration-300">
        <div className="mx-auto max-w-4xl">
          <Card className="border shadow-xl bg-card/95 backdrop-blur-xl relative overflow-hidden py-0">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            
            <CardContent className="p-4 md:p-5 relative z-10">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {/* Icon Section */}
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <Cookie className="h-5 w-5 text-primary" />
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="text-base font-semibold text-foreground">
                    We Value Your Privacy
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    We use cookies to enhance your experience. By clicking "Accept All", you consent to our use of cookies.{" "}
                    <Link 
                      href="/privacy" 
                      className="text-primary hover:underline font-medium"
                      aria-label="Read our Privacy Policy to learn more about cookie usage"
                    >
                      Read our Privacy Policy
                    </Link>
                    {" "}to learn more.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSettings(true)}
                      className="flex items-center gap-1.5 h-8 text-xs"
                    >
                      <Settings className="h-3.5 w-3.5" />
                      Customize
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRejectAll}
                      className="text-muted-foreground hover:text-foreground h-8 text-xs"
                    >
                      Reject All
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAcceptAll}
                      className="flex items-center gap-1.5 h-8 text-xs font-medium"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Accept All
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. You can enable or disable different types of cookies below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="space-y-3 p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">Necessary Cookies</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      Always Active
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These cookies are essential for the website to function properly. They cannot be disabled as they are required for core functionality.
                  </p>
                </div>
                <Checkbox checked={true} disabled className="mt-1" />
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-3 p-4 rounded-lg border border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. 
                    This helps us improve our website and user experience.
                  </p>
                </div>
                <Checkbox
                  checked={preferences.analytics}
                  onCheckedChange={() => togglePreference("analytics")}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="space-y-3 p-4 rounded-lg border border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">Functional Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                  </p>
                </div>
                <Checkbox
                  checked={preferences.functional}
                  onCheckedChange={() => togglePreference("functional")}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="space-y-3 p-4 rounded-lg border border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">Marketing Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    These cookies are used to deliver personalized advertisements and track campaign performance. 
                    Currently, we do not use marketing cookies, but this option is available for future use.
                  </p>
                </div>
                <Checkbox
                  checked={preferences.marketing}
                  onCheckedChange={() => togglePreference("marketing")}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-4">
                For more information about how we use cookies, please read our{" "}
                <Link href="/privacy" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowSettings(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSavePreferences}>
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

