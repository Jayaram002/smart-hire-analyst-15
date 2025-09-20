import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload, Zap, TrendingUp, Clock, Users } from "lucide-react";
import { FileUploadZone } from "./FileUploadZone";
import { AnalysisResults } from "./AnalysisResults";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface AnalysisData {
  id: string;
  candidateName: string;
  score: number;
  verdict: "High" | "Medium" | "Low";
  analysisTime: string;
  missingSkills: string[];
  matchedSkills: string[];
  recommendations: string[];
  experience: string;
  education: string;
}

// Enhanced mock data for demonstration - showing capability to handle large datasets
const generateMockResults = (count: number): AnalysisData[] => {
  const names = [
    "Priya Sharma", "Rajesh Kumar", "Sneha Patel", "Amit Singh", "Kavya Reddy",
    "Arjun Nair", "Deepika Iyer", "Rohit Gupta", "Ananya Joshi", "Vikram Mehta",
    "Pooja Agarwal", "Siddharth Rao", "Nisha Verma", "Kiran Pandey", "Shreya Das",
    "Abhishek Shah", "Riya Malhotra", "Varun Saxena", "Tanya Bhatt", "Nikhil Jain"
  ];
  
  const experiences = [
    "3+ years Data Science", "2 years Frontend Development", "4 years Backend Development",
    "1.5 years ML Engineering", "5 years Full Stack", "2.5 years DevOps",
    "1 year Business Analyst", "3 years Cloud Architecture", "2 years Mobile Development",
    "4 years QA Engineering", "1.5 years Product Management", "3 years UI/UX Design"
  ];
  
  const educations = [
    "M.Tech CSE, IIT Delhi", "B.Tech IT, NIT Warangal", "M.S. Computer Science, IISc",
    "B.E. CSE, VIT Vellore", "M.Tech AI, IIIT Hyderabad", "B.Tech ECE, IIT Bombay",
    "MCA, Anna University", "B.Sc IT, Mumbai University", "M.Tech Data Science, BITS Pilani"
  ];

  return Array.from({ length: count }, (_, index) => {
    const score = Math.floor(Math.random() * 60) + 40; // 40-100 range
    const verdict = score >= 80 ? "High" : score >= 60 ? "Medium" : "Low";
    
    return {
      id: (index + 1).toString(),
      candidateName: names[index % names.length] + (index >= names.length ? ` ${Math.floor(index / names.length) + 1}` : ''),
      score,
      verdict: verdict as "High" | "Medium" | "Low",
      analysisTime: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      missingSkills: score >= 80 ? ["Docker"] : score >= 60 ? ["React", "Node.js"] : ["Python", "Machine Learning", "AWS"],
      matchedSkills: score >= 80 ? ["Python", "ML", "TensorFlow", "AWS", "SQL"] : score >= 60 ? ["JavaScript", "HTML", "CSS"] : ["Excel", "SQL"],
      recommendations: score >= 80 ? ["Add containerization projects"] : score >= 60 ? ["Complete MERN stack projects"] : ["Build comprehensive portfolio"],
      experience: experiences[index % experiences.length],
      education: educations[index % educations.length]
    };
  }).sort((a, b) => b.score - a.score); // Pre-sorted by score descending
};

const mockResults: AnalysisData[] = generateMockResults(4);

export const ResumeAnalyzer = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [resumes, setResumes] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisData[]>([]);

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || resumes.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis time based on number of resumes
    const analysisTime = Math.min(5000, resumes.length * 50); // Cap at 5 seconds
    await new Promise(resolve => setTimeout(resolve, analysisTime));
    
    // Generate results based on actual resume count
    const generatedResults = generateMockResults(resumes.length);
    setResults(generatedResults);
    setIsAnalyzing(false);
    setActiveTab("results");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Resume Analyzer</h1>
                <p className="text-sm text-muted-foreground">Innomatics Research Labs</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{results.length} Analyzed</span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Fast Analysis</span>
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-400px">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload & Analyze</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Results ({results.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Job Description Input */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span>Job Description</span>
                  </CardTitle>
                  <CardDescription>
                    Enter the job requirements and description manually
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Paste or type the job description here...

Example:
Position: Senior Software Engineer
Requirements:
- 3+ years experience in React/Node.js
- Strong knowledge of TypeScript
- Experience with AWS cloud services
- Familiar with Docker and Kubernetes..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="min-h-[200px] resize-y"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{jobDescription.length} characters</span>
                      {jobDescription.trim() && (
                        <span className="text-success font-medium">✓ Job description ready</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resume Upload */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <span>Candidate Resumes</span>
                  </CardTitle>
                  <CardDescription>
                    Upload multiple resumes for batch analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploadZone
                    onFileSelect={setResumes}
                    acceptedTypes=".pdf,.docx"
                    maxFiles={1000}
                    title="Drop resume files here"
                    description="PDF or DOCX files (up to 1000 files)"
                    multiple
                  />
                  {resumes.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-success">
                        ✓ {resumes.length} resume(s) uploaded
                      </p>
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {resumes.map((file, index) => (
                          <div key={index} className="text-xs text-muted-foreground bg-muted p-2 rounded">
                            {file.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Analysis Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleAnalyze}
                disabled={!jobDescription.trim() || resumes.length === 0 || isAnalyzing}
                size="lg"
                className="px-8 py-3 text-lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" />
                    Analyzing Resumes...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Analyze {resumes.length} Resume{resumes.length !== 1 ? 's' : ''}
                  </>
                )}
              </Button>
            </div>

            {isAnalyzing && (
              <Card className="card-elevated">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Analysis Progress</span>
                      <span className="text-sm text-muted-foreground">
                        Analyzing {resumes.length} resume{resumes.length !== 1 ? 's' : ''}...
                      </span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      AI is analyzing each resume individually against job requirements...
                      <br />
                      <span className="text-primary font-medium">
                        Processing {resumes.length} candidates with detailed scoring
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="results">
            <AnalysisResults results={results} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};