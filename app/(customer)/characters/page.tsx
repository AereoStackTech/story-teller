"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Sparkles, User, Shield, Target } from "lucide-react";
import { characterSchema } from "@/lib/validations";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("Protagonist");
  const [archetype, setArchetype] = useState("The Reluctant Hero");
  const [bio, setBio] = useState("");
  const [traits, setTraits] = useState("Cunning, Analytical, Loyal");
  const [goal, setGoal] = useState("Expose corrupt corporate syndicate");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCharacters = async () => {
    try {
      const res = await fetch("/api/characters");
      const data = await res.json();
      if (data.characters) setCharacters(data.characters);
    } catch (err) {}
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleCreateCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = characterSchema.safeParse({
      name,
      role,
      archetype,
      bio,
      traits,
      goal,
    });

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      if (res.ok) {
        const data = await res.json();
        setCharacters([data.character, ...characters]);
        setShowCreateModal(false);
        // Reset form
        setName("");
        setBio("");
        setGoal("");
      } else {
        const errData = await res.json();
        setError(errData.error || "Failed to create character");
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Character Bible Manager</h1>
          <p className="text-sm text-slate-400 mt-1">Define psychological archetypes, motivation web, and character arcs.</p>
        </div>
        <Button variant="gradient" onClick={() => setShowCreateModal(!showCreateModal)} className="gap-2">
          <Plus className="h-4 w-4" /> {showCreateModal ? "Close Form" : "Add Character Entity"}
        </Button>
      </div>

      {/* Creation Modal */}
      {showCreateModal && (
        <Card className="border-amber-500/40 bg-slate-900/90 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-amber-300">
              <Users className="h-5 w-5" /> Add Character Profile to Bible
            </CardTitle>
            <CardDescription>Enter structural attributes for consistency during story generation.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateCharacter} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Full Name</label>
                  <Input
                    placeholder="e.g. Commander Marcus Kane"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-10 rounded-lg border border-white/10 bg-slate-950 px-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option>Protagonist</option>
                    <option>Antagonist</option>
                    <option>Deuteragonist</option>
                    <option>Mentor</option>
                    <option>Supporting</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Archetype</label>
                  <Input
                    placeholder="e.g. The Cynical Veteran"
                    value={archetype}
                    onChange={(e) => setArchetype(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Traits (Comma Separated)</label>
                  <Input
                    placeholder="e.g. Strategic, Stoic, Secretive"
                    value={traits}
                    onChange={(e) => setTraits(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Primary Goal / Drive</label>
                  <Input
                    placeholder="e.g. Avenge fallen companion"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Biography & Backstory</label>
                <textarea
                  className="w-full h-24 rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter detailed backstory notes..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gradient" disabled={isSubmitting}>
                  {isSubmitting ? "Saving to Bible..." : "Save Character Profile"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Character Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.length === 0 ? (
          <>
            {/* Fallback Display Cards */}
            <Card className="border-white/10 bg-slate-900/60 flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="default" className="bg-amber-600/30 text-amber-300 border-amber-500/40">
                    Protagonist
                  </Badge>
                  <span className="text-[10px] text-slate-500">Archetype: Hacker Rogue</span>
                </div>
                <CardTitle className="text-xl text-white mt-2">Kaelen Vance</CardTitle>
                <CardDescription className="text-xs text-slate-400">Former intelligence officer turned black-market data runner.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-slate-400 block mb-1">Key Traits:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline">Cunning</Badge>
                    <Badge variant="outline">Paranoid</Badge>
                    <Badge variant="outline">Technopath</Badge>
                  </div>
                </div>
                <div className="text-xs text-slate-300 pt-2 border-t border-white/5 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Goal: Decrypt the Sector 7 anomaly</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-slate-900/60 flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="destructive">Antagonist</Badge>
                  <span className="text-[10px] text-slate-500">Archetype: Cold Genius</span>
                </div>
                <CardTitle className="text-xl text-white mt-2">Dr. Sophia Vane</CardTitle>
                <CardDescription className="text-xs text-slate-400">Chief Technologist at Aether Corp with unyielding ambitions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-slate-400 block mb-1">Key Traits:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline">Ruthless</Badge>
                    <Badge variant="outline">Visionary</Badge>
                    <Badge variant="outline">Calculated</Badge>
                  </div>
                </div>
                <div className="text-xs text-slate-300 pt-2 border-t border-white/5 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="truncate">Goal: Control global neuro-links</span>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          characters.map((char) => (
            <Card key={char.id} className="border-white/10 bg-slate-900/60 flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant={char.role === "Antagonist" ? "destructive" : "default"}>
                    {char.role}
                  </Badge>
                  <span className="text-[10px] text-slate-500">{char.archetype}</span>
                </div>
                <CardTitle className="text-xl text-white mt-2">{char.name}</CardTitle>
                <CardDescription className="text-xs text-slate-400 line-clamp-2">{char.bio}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-slate-400 block mb-1">Key Traits:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {char.traits.split(",").map((t: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-[10px]">
                        {t.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
                {char.goal && (
                  <div className="text-xs text-slate-300 pt-2 border-t border-white/5 flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">Goal: {char.goal}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
