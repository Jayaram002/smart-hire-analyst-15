import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  TrendingUp, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Filter,
  Search,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisData {
  id: string;
  candidateName: string;
  fileName: string;
  score: number;
  verdict: "High" | "Medium" | "Low";
  analysisTime: string;
  missingSkills: string[];
  matchedSkills: string[];
  recommendations: string[];
  experience: string;
  education: string;
}

interface AnalysisResultsProps {
  results: AnalysisData[];
}

export const AnalysisResults = ({ results }: AnalysisResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "destructive";
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "High":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "Medium":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "Low":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Sort results by score in descending order
  const sortedResults = [...results].sort((a, b) => b.score - a.score);

  const stats = {
    total: results.length,
    high: results.filter(r => r.verdict === "High").length,
    medium: results.filter(r => r.verdict === "Medium").length,
    low: results.filter(r => r.verdict === "Low").length,
    avgScore: results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length) : 0
  };

  if (results.length === 0) {
    return (
      <Card className="card-elevated">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">No Results Yet</h3>
              <p className="text-sm text-muted-foreground">
                Upload job description and resumes to start analysis
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="card-elevated">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Analyzed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">{stats.high}</p>
                <p className="text-xs text-muted-foreground">High Match</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">{stats.medium}</p>
                <p className="text-xs text-muted-foreground">Medium Match</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-destructive">{stats.low}</p>
                <p className="text-xs text-muted-foreground">Low Match</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{stats.avgScore}%</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Results
        </Button>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {sortedResults.map((result, index) => (
          <Card key={result.id} className="card-elevated">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{result.candidateName}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>Analyzed: {formatDate(result.analysisTime)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-3 w-3" />
                        <span className="font-mono text-xs">{result.fileName}</span>
                      </div>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={result.verdict === "High" ? "default" : result.verdict === "Medium" ? "secondary" : "destructive"}
                    className="flex items-center space-x-1"
                  >
                    {getVerdictIcon(result.verdict)}
                    <span>{result.verdict} Fit</span>
                  </Badge>
                  <div className="text-right">
                    <p className={cn(
                      "text-2xl font-bold",
                      getScoreColor(result.score) === "success" && "text-success",
                      getScoreColor(result.score) === "warning" && "text-warning",
                      getScoreColor(result.score) === "destructive" && "text-destructive"
                    )}>
                      {result.score}%
                    </p>
                    <p className="text-xs text-muted-foreground">Relevance</p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Relevance Score</span>
                  <span className="font-medium">{result.score}%</span>
                </div>
                <Progress 
                  value={result.score} 
                  className={cn(
                    "h-2",
                    getScoreColor(result.score) === "success" && "[&>div]:bg-success",
                    getScoreColor(result.score) === "warning" && "[&>div]:bg-warning",
                    getScoreColor(result.score) === "destructive" && "[&>div]:bg-destructive"
                  )}
                />
              </div>

              <Separator />

              {/* Candidate Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Experience</h4>
                  <p className="text-sm text-muted-foreground">{result.experience}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Education</h4>
                  <p className="text-sm text-muted-foreground">{result.education}</p>
                </div>
              </div>

              <Separator />

              {/* Skills Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Matched Skills */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-success flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Matched Skills ({result.matchedSkills.length})</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedSkills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-success-light text-success">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-destructive flex items-center space-x-2">
                    <XCircle className="h-4 w-4" />
                    <span>Missing Skills ({result.missingSkills.length})</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="border-destructive text-destructive">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-primary flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4" />
                      <span>Recommendations</span>
                    </h4>
                    <ScrollArea className="h-20">
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};