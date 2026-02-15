-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Newsletter Subscribers Table
create table if not exists public.newsletter_subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  source text default 'website',
  subscribed_at timestamptz default now(),
  is_active boolean default true
);

-- Contact Messages Table
create table if not exists public.contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text default 'new', -- new, read, replied, archived
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Calculator Usage Tracking Table (Anonymous)
create table if not exists public.calculator_usage (
  id uuid default uuid_generate_v4() primary key,
  calculator_type text not null, -- e.g., 'federal-tax', 'take-home-pay'
  inputs jsonb, -- e.g., { income: 50000, state: 'CA', filing_status: 'single' }
  results jsonb, -- e.g., { tax_total: 12000, effective_rate: 0.24 }
  user_agent text,
  referer text,
  created_at timestamptz default now()
);

-- Row Level Security (RLS) Policies

-- Newsletter: Public can insert, only service role can read/update
alter table public.newsletter_subscribers enable row level security;

create policy "Enable insert for public" on public.newsletter_subscribers
  for insert with check (true);

create policy "Enable read access for service role only" on public.newsletter_subscribers
  for select using (auth.role() = 'service_role');

-- Contact Messages: Public can insert, only service role can read/update
alter table public.contact_messages enable row level security;

create policy "Enable insert for public" on public.contact_messages
  for insert with check (true);

create policy "Enable read access for service role only" on public.contact_messages
  for select using (auth.role() = 'service_role');

-- Calculator Usage: Public can insert, only service role can read
alter table public.calculator_usage enable row level security;

create policy "Enable insert for public" on public.calculator_usage
  for insert with check (true);

create policy "Enable read access for service role only" on public.calculator_usage
  for select using (auth.role() = 'service_role');

-- Create indexes for performance
create index if not exists idx_newsletter_email on public.newsletter_subscribers(email);
create index if not exists idx_contact_status on public.contact_messages(status);
create index if not exists idx_calculator_usage_type on public.calculator_usage(calculator_type);
create index if not exists idx_calculator_usage_created_at on public.calculator_usage(created_at);
