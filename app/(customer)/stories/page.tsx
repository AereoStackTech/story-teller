"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, Plus, FileText, BarChart2, CheckCircle2, Feather } from "lucide-react";
import { calculateStoryMetrics, generateNarrativeOutline } from "@/lib/business-logic";
import { storySchema } from "@/lib/validations";

export default function StoriesPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Sci-Fi / Cyberpunk");
  const [synopsis, setSynopsis] = useState("");
  const [tone, setTone] = useState("Dramatic");
  const [targetAudience, setTargetAudience] = useState("Adult Fiction");
  const [content, setContent] = useState("");
  
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTabStory, setActiveTabStory] = useState<any | null>(null);

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/stories");
      const data = await res.json();
      if (data.stories) {
        setStories(data.stories);
        // Only set active tab if we have stories and no active tab is currently selected
        // We use a functional state update to avoid adding activeTabStory to dependencies
        setActiveTabStory((prev: any) => {
           if (!prev && data.stories.length > 0) return data.stories[0];
           return prev;
        });
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleCreateStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = storySchema.safeParse({
      title,
      genre,
      synopsis,
      tone,
      targetAudience,
      content,
    });

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      if (res.ok) {
        const data = await res.json();
        setStories([data.story, ...stories]);
        setActiveTabStory(data.story);
        setShowCreateModal(false);
        // Reset form
        setTitle("");
        setSynopsis("");
        setContent("");
      } else {
        const errData = await res.json();
        setError(errData.error || "Failed to save story");
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const metrics = activeTabStory?.content
    ? calculateStoryMetrics(activeTabStory.content)
    : null;

  const outline = activeTabStory
    ? generateNarrativeOutline(activeTabStory.title, activeTabStory.genre, activeTabStory.tone)
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Narrative Story Studio</h1>
          <p className="text-sm text-slate-400 mt-1">Draft, structure, and analyze your manuscript chapters.</p>
        </div>
        <Button variant="gradient" onClick={() => setShowCreateModal(!showCreateModal)} className="gap-2">
          <Plus className="h-4 w-4" /> {showCreateModal ? "Close Creator" : "New Manuscript"}
        </Button>
      </div>

      {/* Creation Modal / Inline Form */}
      {showCreateModal && (
        <Card className="border-indigo-500/40 bg-slate-900/90 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-indigo-300">
              <Sparkles className="h-5 w-5" /> Generate & Save New Story Manuscript
            </CardTitle>
            <CardDescription>Fill out the narrative core metadata to seed your manuscript.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateStory} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Story Title</label>
                  <Input
                    placeholder="e.g. Echoes of the Void Protocol"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Genre</label>
                  <Input
                    placeholder="e.g. Sci-Fi Thriller"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Narrative Tone</label>
                  <Input
                    placeholder="e.g. Gritty, High-Stakes, Dark"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Target Audience</label>
                  <Input
                    placeholder="e.g. Young Adult / Adult Fiction"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Logline / Synopsis</label>
                <textarea
                  className="w-full h-20 rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter a brief high-level summary of the main conflict..."
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Chapter 1 Manuscript Content</label>
                <textarea
                  className="w-full h-40 rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-serif leading-relaxed"
                  placeholder="Write or paste your initial chapter text here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gradient" disabled={isSubmitting}>
                  {isSubmitting ? "Saving to Database..." : "Save Manuscript"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Main Studio View Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Story List Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">Manuscripts Library</h3>
          {stories.length === 0 ? (
            <Card className="border-dashed border-white/20 bg-slate-900/40 p-6 text-center text-slate-500 text-xs">
              No manuscripts found. Click &quot;New Manuscript&quot; to create your first story!
            </Card>
          ) : (
            stories.map((s) => (
              <div
                key={s.id}
                onClick={() => setActiveTabStory(s)}
                className={`p-4 rounded-xl cursor-pointer border transition-all ${
                  activeTabStory?.id === s.id
                    ? "border-indigo-500 bg-indigo-950/30 text-white shadow-lg"
                    : "border-white/10 bg-slate-900/60 hover:bg-slate-900/90 text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold truncate">{s.title}</h4>
                  <Badge variant="outline" className="text-[10px]">{s.genre}</Badge>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{s.synopsis}</p>
                <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-white/5">
                  <span>{s.wordCount || 1200} words</span>
                  <span>Tone: {s.tone}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Story Workspace Editor & Telemetry */}
        <div className="lg:col-span-8 space-y-6">
          {activeTabStory ? (
            <>
              {/* Telemetry Bar */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-white/10 bg-slate-900/60 p-4 text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Word Count</p>
                  <p className="text-xl font-bold text-indigo-400 mt-1">{metrics?.totalWords || 0}</p>
                </Card>
                <Card className="border-white/10 bg-slate-900/60 p-4 text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Est. Read Time</p>
                  <p className="text-xl font-bold text-purple-400 mt-1">{metrics?.estimatedReadTimeMinutes || 1} min</p>
                </Card>
                <Card className="border-white/10 bg-slate-900/60 p-4 text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Pacing Profile</p>
                  <p className="text-xl font-bold text-emerald-400 mt-1">{metrics?.pacingRating || "Balanced"}</p>
                </Card>
              </div>

              {/* Manuscript Content View */}
              <Card className="border-white/10 bg-slate-900/80">
                <CardHeader className="border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-white">{activeTabStory.title}</CardTitle>
                      <CardDescription className="text-xs text-slate-400 mt-1">
                        {activeTabStory.genre} • Target: {activeTabStory.targetAudience}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{activeTabStory.tone} Tone</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">Premise</h4>
                    <p className="text-xs text-slate-300 italic bg-slate-950 p-3 rounded-lg border border-white/5">
                      &quot;{activeTabStory.synopsis}&quot;
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">Chapter 1 Manuscript</h4>
                    <div className="p-4 rounded-xl bg-slate-950 border border-white/5 font-serif text-sm text-slate-200 leading-relaxed whitespace-pre-wrap min-h-[180px]">
                      {activeTabStory.content}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">5-Act Plot Blueprint</h4>
                    <div className="space-y-2">
                      {outline.map((act, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300 p-2 rounded bg-slate-950/60 border border-white/5">
                          <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-white/10 bg-slate-900/40 p-12 text-center text-slate-500">
              <Feather className="h-10 w-10 text-indigo-500/40 mx-auto mb-3" />
              <p className="text-sm font-medium">Select a manuscript from the list to view telemetry and content.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
