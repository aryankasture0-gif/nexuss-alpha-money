import { useCallback, useEffect, useMemo, useState } from 'react';
import { BarChart3, LockKeyhole, RefreshCw, Users, MessageSquareText, MousePointerClick } from 'lucide-react';

type EventRow = { event_type: string; session_id: string; path: string; device_type: string | null; created_at: string };
type Enquiry = { id: string; name: string; email: string | null; phone: string | null; loan_type: string; loan_amount: number | null; applicant_profile: string | null; requirement: string | null; status: string; created_at: string };
type Data = { events: EventRow[]; enquiries: Enquiry[] };

function formatDate(value: string) { return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)); }

export default function AdminDashboard() {
  const [token, setToken] = useState(() => sessionStorage.getItem('nexuss_dashboard_token') || '');
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!token) return setError('Enter your dashboard access token.');
    setLoading(true); setError('');
    const response = await fetch('/.netlify/functions/dashboard-data', { headers: { Authorization: `Bearer ${token}` } });
    const body = await response.json().catch(() => ({}));
    setLoading(false);
    if (!response.ok) return setError(body.error || 'Could not load dashboard.');
    sessionStorage.setItem('nexuss_dashboard_token', token); setData(body);
  }, [token]);

  useEffect(() => { if (token) void load(); }, [load, token]);

  const metrics = useMemo(() => {
    const events = data?.events || [];
    return { visitors: new Set(events.map((event) => event.session_id)).size, views: events.filter((event) => event.event_type === 'page_view').length, clicks: events.filter((event) => event.event_type.endsWith('_click')).length, enquiries: data?.enquiries.length || 0 };
  }, [data]);
  const metricCards = [{ Icon: Users, label: 'Unique visitors', value: metrics.visitors }, { Icon: BarChart3, label: 'Page views', value: metrics.views }, { Icon: MousePointerClick, label: 'Contact clicks', value: metrics.clicks }, { Icon: MessageSquareText, label: 'Enquiries', value: metrics.enquiries }];

  if (!data) return <main className="min-h-screen bg-navy-radial px-6 py-16 text-white"><div className="mx-auto max-w-md card-premium p-8"><LockKeyhole className="text-gold-400" /><h1 className="mt-5 font-display text-3xl font-bold">Website dashboard</h1><p className="mt-3 text-sm text-white/60">Private analytics and enquiry view. Visitor names/emails appear only when they submit the enquiry form.</p><input type="password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Dashboard access token" className="mt-6 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none" /><button onClick={() => void load()} className="btn-primary mt-4 w-full">{loading ? 'Checking…' : 'Open dashboard'}</button>{error && <p className="mt-4 text-sm text-red-300">{error}</p>}</div></main>;

  return <main className="min-h-screen bg-navy-radial px-5 py-10 text-white sm:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-center justify-between gap-4"><div><span className="section-label"><BarChart3 className="h-4 w-4" /> Private website analytics</span><h1 className="mt-4 font-display text-4xl font-bold">Nexuss Alpha Money</h1><p className="mt-2 text-white/55">Anonymous visits, enquiries and contact activity.</p></div><button onClick={() => void load()} className="btn-secondary"><RefreshCw className="h-4 w-4" /> Refresh</button></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{metricCards.map(({ Icon, label, value }) => <div className="card-premium p-6" key={label}><Icon className="text-gold-400" /><p className="mt-5 text-sm text-white/55">{label}</p><p className="mt-2 text-4xl font-bold">{value}</p></div>)}</div><section className="mt-8 card-premium overflow-hidden"><div className="border-b border-white/10 px-6 py-5"><h2 className="font-display text-2xl font-semibold">Recent enquiries</h2></div><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-white/5 text-white/50"><tr>{['Name', 'Contact', 'Loan', 'Profile', 'Status', 'Received'].map((heading) => <th className="px-6 py-4 font-medium" key={heading}>{heading}</th>)}</tr></thead><tbody>{data.enquiries.map((lead) => <tr className="border-t border-white/10" key={lead.id}><td className="px-6 py-4 font-semibold">{lead.name}</td><td className="px-6 py-4 text-white/65">{lead.phone || '—'}<br />{lead.email || '—'}</td><td className="px-6 py-4">{lead.loan_type}<br /><span className="text-white/50">{lead.loan_amount ? `₹${lead.loan_amount.toLocaleString('en-IN')}` : 'Amount not shared'}</span></td><td className="px-6 py-4 text-white/65">{lead.applicant_profile || '—'}</td><td className="px-6 py-4 uppercase text-gold-300">{lead.status}</td><td className="px-6 py-4 text-white/50">{formatDate(lead.created_at)}</td></tr>)}</tbody></table>{data.enquiries.length === 0 && <p className="p-8 text-white/55">No enquiries yet.</p>}</div></section></div></main>;
}
