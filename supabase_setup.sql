-- SQL setup for Supabase: create tracks table
create extension if not exists pgcrypto;

create table if not exists public.tracks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  title text not null,
  artist text,
  path text not null,
  public boolean default false,
  created_at timestamptz default now()
);
