import { Outlet } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { PublicNavbar } from './PublicNavbar'
import { PublicFooter } from './PublicFooter'
import { BackToTop } from '@/components/common/BackToTop'

export function PublicLayout() {
  const whatsappUrl = 'https://wa.me/923489510788?text=Hi%20Jawad%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity.'
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicNavbar />
      <main className="flex-1"><Outlet /></main>
      <PublicFooter />
      <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" aria-label="Contact Jawad Khan on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-border bg-success text-white shadow-card transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        <MessageCircle className="h-5 w-5" aria-hidden />
      </a>
      <BackToTop />
    </div>
  )
}
