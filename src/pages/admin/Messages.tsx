import { useMemo, useState } from 'react'
import { Inbox, Mail, Trash2, ExternalLink, Send } from 'lucide-react'
import { useData, useToast } from '@/hooks'
import { MESSAGE_STATUSES, type ContactMessage, type MessageStatus } from '@/types'
import { timeAgo, formatLongDate } from '@/lib/format'
import { toErrorMessage } from '@/lib/errors'
import { AnchorButton, Avatar, Badge, Button, ConfirmDialog, EmptyState, FormField, Input, Modal, Textarea, type BadgeVariant } from '@/components/ui'
import { Seo } from '@/components/common/Seo'
import { AdminHeader, ListRow, ListShell, Toolbar } from '@/components/admin'

const STATUS_VARIANT: Record<MessageStatus, BadgeVariant> = { unread: 'accent', read: 'default', replied: 'success', archived: 'muted' }
const STATUS_LABEL: Record<MessageStatus, string> = { unread: 'Unread', read: 'Read', replied: 'Replied', archived: 'Archived' }
const FILTERS = ['all', ...MESSAGE_STATUSES] as const

function buildReplyBody(name: string) {
  return `Hi ${name},\n\nThank you for reaching out through my portfolio. I’ve received your enquiry and would be happy to discuss it further.\n\nBest regards,\nJawad Khan`
}

export default function AdminMessages() {
  const { messages, actions } = useData()
  const toast = useToast()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<ContactMessage | null>(null)
  const [replyOpen, setReplyOpen] = useState(false)
  const [replySubject, setReplySubject] = useState('')
  const [replyBody, setReplyBody] = useState('')
  const [statusBusy, setStatusBusy] = useState(false)
  const [deleteBusy, setDeleteBusy] = useState(false)

  const sorted = useMemo(() => [...messages].sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [messages])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sorted.filter((m) => {
      if (filter !== 'all' && m.status !== filter) return false
      if (!q) return true
      return [m.name, m.email, m.message, m.company, m.projectType].some((v) => v.toLowerCase().includes(q))
    })
  }, [sorted, filter, query])

  const unreadCount = messages.filter((m) => m.status === 'unread').length
  const active = selectedId ? messages.find((m) => m.id === selectedId) ?? null : null

  const open = (message: ContactMessage) => {
    setSelectedId(message.id)
    if (message.status === 'unread') void actions.messages.update(message.id, { status: 'read' }).catch(() => {})
  }

  const setStatus = async (status: MessageStatus) => {
    if (!active) return
    setStatusBusy(true)
    try {
      await actions.messages.update(active.id, { status })
      toast.success(`Marked as ${STATUS_LABEL[status].toLowerCase()}`)
    } catch (err) {
      toast.error('Could not update', toErrorMessage(err))
    } finally { setStatusBusy(false) }
  }

  const startReply = async (message: ContactMessage) => {
    setReplySubject(`Re: Your enquiry — Jawad Khan`)
    setReplyBody(buildReplyBody(message.name))
    try {
      await actions.messages.update(message.id, { status: 'replied' })
    } catch (err) {
      toast.error('Could not update message', toErrorMessage(err))
    }
    setReplyOpen(true)
  }

  const markReplied = async () => {
    if (!active) return
    try {
      await actions.messages.update(active.id, { status: 'replied' })
    } catch (err) {
      toast.error('Could not update message', toErrorMessage(err))
    }
  }

  const openMailClient = async () => {
    if (!active) return
    await markReplied()
    window.location.href = `mailto:${encodeURIComponent(active.email)}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyBody)}`
    setReplyOpen(false)
  }

  const openGmail = async () => {
    if (!active) return
    await markReplied()
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(active.email)}&su=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyBody)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setReplyOpen(false)
  }

  const confirmDelete = async () => {
    if (!pendingDelete) return
    setDeleteBusy(true)
    try {
      await actions.messages.remove(pendingDelete.id)
      if (selectedId === pendingDelete.id) setSelectedId(null)
      setPendingDelete(null)
      toast.success('Message deleted')
    } catch (err) { toast.error('Could not delete', toErrorMessage(err)) }
    finally { setDeleteBusy(false) }
  }

  return (
    <>
      <Seo title="Messages" noindex />
      <AdminHeader title="Messages" description={unreadCount ? `${unreadCount} unread · ${messages.length} total` : `${messages.length} total`} />
      <Toolbar search={query} onSearch={setQuery} placeholder="Search messages…" right={<div className="flex flex-wrap gap-1.5">{FILTERS.map((f) => <button key={f} type="button" onClick={() => setFilter(f)} className={'rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors ' + (filter === f ? 'border-accent bg-accent-soft text-accent' : 'border-border text-muted hover:text-foreground')}>{f}</button>)}</div>} />

      {filtered.length > 0 ? <ListShell>{filtered.map((m) => <ListRow key={m.id} className="cursor-pointer transition-colors hover:bg-surface-2/40"><button type="button" onClick={() => open(m)} className="flex min-w-0 flex-1 items-center gap-3 text-left"><Avatar name={m.name} size={40} /><div className="min-w-0 flex-1"><p className="flex items-center gap-2 truncate text-sm font-medium text-foreground">{m.name}{m.status === 'unread' && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}</p><p className="truncate text-xs text-muted">{m.message}</p></div><div className="hidden shrink-0 flex-col items-end gap-1 sm:flex"><Badge variant={STATUS_VARIANT[m.status]}>{STATUS_LABEL[m.status]}</Badge><span className="text-xs text-faint">{timeAgo(m.createdAt)}</span></div></button></ListRow>)}</ListShell> : <EmptyState icon={<Inbox className="h-5 w-5" />} title={query || filter !== 'all' ? 'No matching messages' : 'No messages yet'} description={query || filter !== 'all' ? 'Try a different search or filter.' : 'Enquiries from your contact form will appear here.'} />}

      <Modal open={!!active} onClose={() => setSelectedId(null)} size="lg" title={active?.name} description={active ? formatLongDate(active.createdAt) : undefined} footer={active && <div className="flex w-full flex-wrap items-center justify-between gap-2"><Button variant="ghost" size="sm" className="text-muted hover:text-danger" leftIcon={<Trash2 className="h-4 w-4" aria-hidden />} onClick={() => setPendingDelete(active)}>Delete</Button><div className="flex flex-wrap gap-2"><Button variant="outline" size="sm" leftIcon={<Mail className="h-4 w-4" aria-hidden />} onClick={() => void startReply(active)}>Reply</Button></div></div>}>
        {active && <div className="space-y-5">
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 text-sm sm:grid-cols-2">
            <Detail label="Email" value={active.email} href={`mailto:${active.email}`} />
            {active.company && <Detail label="Company" value={active.company} />}
            {active.website && <Detail label="Website" value={active.website} href={active.website} />}
            {active.projectType && <Detail label="Project type" value={active.projectType} />}
            {active.budget && <Detail label="Budget" value={active.budget} />}
            <Detail label="Date" value={formatLongDate(active.createdAt)} />
          </div>
          <div><p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-faint">Message</p><p className="whitespace-pre-line rounded-lg border border-border bg-background-elevated p-4 text-sm leading-relaxed text-foreground">{active.message}</p></div>
          <div><p className="mb-2 text-xs font-medium uppercase tracking-wide text-faint">Status</p><div className="flex flex-wrap gap-1.5">{MESSAGE_STATUSES.map((s) => <button key={s} type="button" disabled={statusBusy} onClick={() => setStatus(s)} className={'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-60 ' + (active.status === s ? 'border-accent bg-accent-soft text-accent' : 'border-border text-muted hover:text-foreground')}>{STATUS_LABEL[s]}</button>)}</div></div>
        </div>}
      </Modal>

      <Modal open={replyOpen && !!active} onClose={() => setReplyOpen(false)} size="lg" title="Reply to enquiry" description={active?.email} footer={active && <div className="flex w-full flex-wrap justify-end gap-2"><Button variant="outline" leftIcon={<ExternalLink className="h-4 w-4" aria-hidden />} onClick={() => void openGmail()}>Reply in Gmail</Button><Button leftIcon={<Send className="h-4 w-4" aria-hidden />} onClick={() => void openMailClient()}>Open email reply</Button></div>}>
        {active && <div className="space-y-4">
          <FormField label="Recipient"><Input value={active.email} readOnly aria-label="Reply recipient" /></FormField>
          <FormField label="Subject"><Input value={replySubject} onChange={(e) => setReplySubject(e.target.value)} /></FormField>
          <FormField label="Message"><Textarea rows={10} value={replyBody} onChange={(e) => setReplyBody(e.target.value)} /></FormField>
          <p className="text-xs text-faint">Sending through Gmail or your default email client will open that service. The original message remains in the CMS and is marked Replied.</p>
        </div>}
      </Modal>

      <ConfirmDialog open={!!pendingDelete} onClose={() => setPendingDelete(null)} onConfirm={confirmDelete} loading={deleteBusy} title="Delete this message?" description={pendingDelete ? `The message from ${pendingDelete.name} will be permanently removed.` : undefined} confirmLabel="Delete" />
    </>
  )
}

function Detail({ label, value, href }: { label: string; value: string; href?: string }) {
  return <div className="min-w-0"><p className="text-xs font-medium uppercase tracking-wide text-faint">{label}</p>{href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer noopener' : undefined} className="break-all text-accent hover:underline">{value}</a> : <p className="truncate text-foreground">{value}</p>}</div>
}
