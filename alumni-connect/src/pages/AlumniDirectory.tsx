import React, { useState, useMemo, useEffect } from "react";
import AlumniCard from "@/components/AlumniCard";
import { departments, companies, batches, skills } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alumni } from "@/types";

const AlumniDirectory: React.FC = () => {
  const [alumniData, setAlumniData] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch alumni data from API
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/alumni", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch alumni data");
        const data = await res.json();

        // Map _id to id for frontend consistency
        const formatted = data.alumni.map((alum: any) => ({
          ...alum,
          id: alum._id,
        }));

        console.log("Fetched Alumni Data:", formatted); // <-- Add this line to view data

        setAlumniData(formatted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  const filteredAlumni = useMemo(() => {
    return alumniData.filter((alumni) => {
      const matchesSearch =
        searchQuery === "" ||
        alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumni.currentCompany
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        alumni.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBatch =
        selectedBatch === "all" || alumni.batch === selectedBatch;
      const matchesDepartment =
        selectedDepartment === "all" ||
        alumni.department === selectedDepartment;
      const matchesCompany =
        selectedCompany === "all" || alumni.currentCompany === selectedCompany;
      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.some((skill) => alumni.skills.includes(skill));

      return (
        matchesSearch &&
        matchesBatch &&
        matchesDepartment &&
        matchesCompany &&
        matchesSkills
      );
    });
  }, [
    alumniData,
    searchQuery,
    selectedBatch,
    selectedDepartment,
    selectedCompany,
    selectedSkills,
  ]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBatch("all");
    setSelectedDepartment("all");
    setSelectedCompany("all");
    setSelectedSkills([]);
  };

  const activeFiltersCount =
    (selectedBatch !== "all" ? 1 : 0) +
    (selectedDepartment !== "all" ? 1 : 0) +
    (selectedCompany !== "all" ? 1 : 0) +
    selectedSkills.length;

  if (loading)
    return <div className="text-center py-12">Loading alumni...</div>;
  if (error)
    return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Alumni Directory
          </h1>
          <p className="text-muted-foreground">
            Connect with {alumniData.length} alumni from various batches and
            companies
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name, company, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant={showFilters ? "secondary" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-1 px-1.5 py-0.5 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-card p-4 rounded-lg border shadow-sm space-y-4 animate-in slide-in-from-top-2">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Batch
                  </label>
                  <Select
                    value={selectedBatch}
                    onValueChange={setSelectedBatch}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Batches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Batches</SelectItem>
                      {batches.map((batch) => (
                        <SelectItem key={batch} value={batch}>
                          {batch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Department
                  </label>
                  <Select
                    value={selectedDepartment}
                    onValueChange={setSelectedDepartment}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Company
                  </label>
                  <Select
                    value={selectedCompany}
                    onValueChange={setSelectedCompany}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Companies" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Companies</SelectItem>
                      {companies.map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Skills</label>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={
                        selectedSkills.includes(skill) ? "default" : "outline"
                      }
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-1"
                >
                  <X className="h-4 w-4" />
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredAlumni.length} of {alumniData.length} alumni
        </div>

        {/* Alumni Grid */}
        {filteredAlumni.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No alumni found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;
