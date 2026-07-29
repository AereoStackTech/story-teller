"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  Plus, 
  ArrowUpRight,
  FileText
} from "lucide-react";

export default function CustomerDashboard() {
  const [stories, setStories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stories")
      .then((res) => res.json())
      .then((data) => {
        if (data.stories) setStories(data.stories);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Writer Studio Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Manage active narrative projects, characters, and AI credits.</p>
        </div>
        <Link href="/stories">
          <Button variant="gradient" className="gap-2">
            <Plus className="h-4 w-4" /> Create New Story
          </Button>
        </Link>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-white/10 bg-slate-900/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-400 uppercase">Active Stories</CardTitle>
            <BookOpen className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stories.length || 3}</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-400" /> +2 this week
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-slate-900/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-400 uppercase">Total Words Synthesized</CardTitle>
            <FileText className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">42,850</div>
            <p className="text-xs text-slate-500 mt-1">Avg 8,500 wpm drafting speed</p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-slate-900/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-400 uppercase">Character Bibles</CardTitle>
            <Users className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-slate-500 mt-1">Across 3 active universes</p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-slate-900/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-400 uppercase">AI Credit Balance</CardTitle>
            <Sparkles className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2,150 / 2,500</div>
            <p className="text-xs text-slate-500 mt-1">Renews on Aug 15</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Story Projects */}
        <Card className="lg:col-span-2 border-white/10 bg-slate-900/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Narrative Projects</CardTitle>
              <CardDescription>Your latest manuscript drafts and plots</CardDescription>
            </div>
            <Link href="/stories" className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <p className="text-sm text-slate-500 py-4">Loading projects...</p>
            ) : stories.length > 0 ? (
              stories.map((story) => (
                <div
                  key={story.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-950/60 border border-white/5 hover:border-indigo-500/30 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">{story.title}</h4>
                      <Badge variant="secondary" className="text-[10px] py-0">{story.genre}</Badge>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{story.synopsis}</p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1 pt-1">
                      <Clock className="h-3 w-3" /> {story.wordCount || 1200} words • Updated recently
                    </p>
                  </div>
                  <Link href="/stories">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-slate-950/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">Chronicles of the Star Forge</h4>
                      <Badge variant="secondary" className="text-[10px] py-0">Sci-Fi</Badge>
                    </div>
                    <p className="text-xs text-slate-400">An interstellar mining crew stumbles upon an ancient AI artifact.</p>
                  </div>
                  <Badge variant="outline">2,450 words</Badge>
                </div>
                <div className="p-4 rounded-lg bg-slate-950/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">The Whispering Codex</h4>
                      <Badge variant="secondary" className="text-[10px] py-0">High Fantasy</Badge>
                    </div>
                    <p className="text-xs text-slate-400">A young librarian unlocks magic in forbidden capital archives.</p>
                  </div>
                  <Badge variant="outline">5,100 words</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Character Bible Widget */}
        <Card className="border-white/10 bg-slate-900/60 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-400" /> Character Roster Quick View
            </CardTitle>
            <CardDescription>Key protagonists active in current manuscripts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-sm">
                K
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Kaelen Vance</p>
                <p className="text-[10px] text-slate-400">Protagonist • Hacker Rogue</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-sm">
                S
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Dr. Sophia Vane</p>
                <p className="text-[10px] text-slate-400">Antagonist • Cyber-Genetist</p>
              </div>
            </div>
            <Link href="/characters" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Manage Character Bibles
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
