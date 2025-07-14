import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Handshake, 
  Pause, 
  Users, 
  TrendingDown, 
  Plug, 
  GitBranch, 
  Shield, 
  ClipboardCheck,
  Play,
  Menu,
  X,
  ExternalLink
} from "lucide-react";
import logoPath from "@assets/QuickApprove Colored Vector_1752504540767.png";
import mainDemoVideo from "@assets/QuickApprove Demo_1752505809574.mov";
import analysisVideo from "@assets/Analysis Video_1752505821368.mp4";
import autonomousVideo from "@assets/autonomous_1752505821368.mov";
import superSmartVideo from "@assets/supersmart2_1752505821369.mp4";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const signupMutation = useMutation({
    mutationFn: async (data: { email: string; name?: string; company?: string }) => {
      return await apiRequest("POST", "/api/signup", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been added to our pre-launch waitlist.",
      });
      setEmail("");
      setName("");
      setCompany("");
      queryClient.invalidateQueries({ queryKey: ["/api/signups"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      signupMutation.mutate({ 
        email, 
        name: name || undefined, 
        company: company || undefined 
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img 
                  src={logoPath} 
                  alt="QuickApprove Logo" 
                  className="h-8 w-8 mr-2"
                />
                <span className="text-xl font-bold text-brand-navy">QuickApprove</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button 
                  onClick={() => scrollToSection("features")}
                  className="text-brand-gray hover:text-brand-navy transition-colors duration-200"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-brand-gray hover:text-brand-navy transition-colors duration-200"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection("about")}
                  className="text-brand-gray hover:text-brand-navy transition-colors duration-200"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="text-brand-gray hover:text-brand-navy transition-colors duration-200"
                >
                  Contact
                </button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <Button 
                onClick={() => scrollToSection("signup")}
                className="bg-brand-navy text-white hover:bg-opacity-90 transition-all duration-200 font-medium"
              >
                Get Pre-Launch Access
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-brand-gray hover:text-brand-navy"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection("features")}
                  className="text-brand-gray hover:text-brand-navy transition-colors duration-200 text-left"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-brand-gray hover:text-brand-navy transition-colors duration-200 text-left"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection("about")}
                  className="text-brand-gray hover:text-brand-navy transition-colors duration-200 text-left"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="text-brand-gray hover:text-brand-navy transition-colors duration-200 text-left"
                >
                  Contact
                </button>
                <Button 
                  onClick={() => scrollToSection("signup")}
                  className="bg-brand-navy text-white hover:bg-opacity-90 transition-all duration-200 font-medium w-full"
                >
                  Get Pre-Launch Access
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-brand-light min-h-screen flex items-center pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="lg:pr-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-brand-navy mb-6 leading-tight">
                Hands off buyer-vendor approvals at the speed of AI
              </h1>
              <p className="text-xl text-brand-gray mb-8 leading-relaxed">
                Stop wasting weeks on approval workflows. QuickApprove automates your entire vendor management process with AI-powered agents that work 24/7.
              </p>
              <div className="mb-8">
                <Button 
                  onClick={() => scrollToSection("signup")}
                  className="bg-brand-navy text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all duration-200 font-semibold text-lg shadow-lg"
                >
                  Get Exclusive Pre-Launch Access
                </Button>
              </div>
              <div className="flex items-center text-brand-gray">
                <span className="mr-2">📅</span>
                <span className="text-lg font-semibold">MVP launching Summer 2025</span>
              </div>
            </div>

            {/* Right Column - Demo Video */}
            <div className="relative">
              <Card className="bg-white shadow-2xl">
                <CardContent className="p-4">
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden" style={{aspectRatio: "16/9"}}>
                    <video 
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                    >
                      <source src={mainDemoVideo} type="video/quicktime" />
                      <source src={mainDemoVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-brand-gray text-sm">See QuickApprove in action</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Narrative */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
              Do you want to see something that scares PMs?
            </h2>
            <p className="text-xl text-brand-gray">Sound familiar?</p>
          </div>

          {/* Problem Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-brand-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Handshake className="text-brand-navy text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-brand-navy mb-2">Initial Agreement</h3>
              <p className="text-brand-gray">Consensus is reached in meetings. Everyone agrees on the plan—until it's time to act.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Pause className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-brand-navy mb-2">Sudden Stall</h3>
              <p className="text-brand-gray">Approvals stall. Weeks pass in limbo as decisions await sign-off.</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-brand-navy mb-2">Chase Mode</h3>
              <p className="text-brand-gray">Teams burn time in follow-ups, repeat discussions, and redundant documentation reviews.</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-brand-navy mb-2">Lost Value</h3>
              <p className="text-brand-gray">Delays compound. Projects miss critical windows. Execution suffers along with stakeholder confidence.</p>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-red-50 border-l-4 border-red-500">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">60</div>
                <div className="text-lg font-semibold text-red-700">Days wasted</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-l-4 border-orange-500">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">25%</div>
                <div className="text-lg font-semibold text-orange-700">Budget burned</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 border-l-4 border-gray-500">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-gray-600 mb-2">0</div>
                <div className="text-lg font-semibold text-gray-700">Happy stakeholders</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* QuickApprove VMaaS */}
      <section id="features" className="py-20 bg-gradient-to-br from-brand-light to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
              QuickApprove - VMaaS with AI agents
            </h2>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto">
              Transform your vendor management with intelligent automation that works around the clock
            </p>
          </div>

          {/* Feature Videos Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* SOW Creation */}
            <Card className="bg-white shadow-lg overflow-hidden">
              <div className="relative bg-gray-100" style={{aspectRatio: "16/9"}}>
                <video 
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                >
                  <source src={analysisVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-brand-navy mb-2">SOW Creation & Automatic Engagement</h3>
                <p className="text-brand-gray">AI-assisted writing and smart follow-ups by integrating with existing systems for faster approvals</p>
              </CardContent>
            </Card>

            {/* Super Smart Q&A */}
            <Card className="bg-white shadow-lg overflow-hidden">
              <div className="relative bg-gray-100" style={{aspectRatio: "16/9"}}>
                <video 
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                >
                  <source src={superSmartVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-brand-navy mb-2">Super Smart Q&A</h3>
                <p className="text-brand-gray">Built-in SME of your projects to answer questions instantaneously</p>
              </CardContent>
            </Card>

            {/* Autonomous Do-er */}
            <Card className="bg-white shadow-lg overflow-hidden">
              <div className="relative bg-gray-100" style={{aspectRatio: "16/9"}}>
                <video 
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                >
                  <source src={autonomousVideo} type="video/quicktime" />
                  <source src={autonomousVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-brand-navy mb-2">Autonomous Do-er</h3>
                <p className="text-brand-gray">Give your agents layman term descriptions of what needs to get done and watch them work - like your favorite assistant, without ever taking a coffee break</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Built for How You Work */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
              Built for How You Work
            </h2>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto">
              Seamlessly integrate with your existing tools and workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Card className="bg-brand-light p-6 mb-4">
                <CardContent className="p-0">
                  <Plug className="text-brand-navy text-3xl mb-2 mx-auto" />
                  <h3 className="text-lg font-semibold text-brand-navy">Easy Integration</h3>
                </CardContent>
              </Card>
              <p className="text-brand-gray">Plug-and-play with Office 365, GSuite, SAP, and DocuSign</p>
            </div>
            <div className="text-center">
              <Card className="bg-brand-light p-6 mb-4">
                <CardContent className="p-0">
                  <GitBranch className="text-brand-navy text-3xl mb-2 mx-auto" />
                  <h3 className="text-lg font-semibold text-brand-navy">Managed Version Control</h3>
                </CardContent>
              </Card>
              <p className="text-brand-gray">Keep everyone on the same page automatically</p>
            </div>
            <div className="text-center">
              <Card className="bg-brand-light p-6 mb-4">
                <CardContent className="p-0">
                  <Shield className="text-brand-navy text-3xl mb-2 mx-auto" />
                  <h3 className="text-lg font-semibold text-brand-navy">Smart Project Checks</h3>
                </CardContent>
              </Card>
              <p className="text-brand-gray">Catch errors before they slow you down</p>
            </div>
            <div className="text-center">
              <Card className="bg-brand-light p-6 mb-4">
                <CardContent className="p-0">
                  <ClipboardCheck className="text-brand-navy text-3xl mb-2 mx-auto" />
                  <h3 className="text-lg font-semibold text-brand-navy">Automated Compliance</h3>
                </CardContent>
              </Card>
              <p className="text-brand-gray">Legal peace of mind without manual review</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section id="about" className="py-20 bg-gradient-to-br from-brand-light to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
              How QuickApprove Drives Value
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-navy mb-4">$200B+</div>
              <h3 className="text-xl font-semibold text-brand-navy mb-2">Annual Spend</h3>
              <p className="text-brand-gray">Spent on vendor services in mid-to-enterprise organizations</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-navy mb-4">Weeks</div>
              <h3 className="text-xl font-semibold text-brand-navy mb-2">Time Lost</h3>
              <p className="text-brand-gray">Approvals cost teams weeks per project</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-navy mb-4">↑</div>
              <h3 className="text-xl font-semibold text-brand-navy mb-2">Growing Demand</h3>
              <p className="text-brand-gray">Increasing need for workflow automation and AI tools</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button 
              onClick={() => scrollToSection("signup")}
              className="bg-brand-navy text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all duration-200 font-semibold text-lg shadow-lg"
            >
              Get Exclusive Pre-Launch Access
            </Button>
          </div>
        </div>
      </section>

      {/* Pre-Launch Signup */}
      <section id="signup" className="py-20 bg-brand-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Get Exclusive Pre-Launch Access
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Be among the first to experience the future of vendor management. MVP launching Summer 2025.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Input
                type="email"
                placeholder="Email address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-0 text-brand-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
              />
              <Input
                type="text"
                placeholder="Full name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-0 text-brand-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <Input
                type="text"
                placeholder="Company (optional)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-0 text-brand-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <Button
                type="submit"
                disabled={signupMutation.isPending}
                className="bg-brand-blue text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 font-semibold whitespace-nowrap disabled:opacity-50"
              >
                {signupMutation.isPending ? "Joining..." : "Join Waitlist"}
              </Button>
            </div>
          </form>
          

          
          <p className="text-blue-200 text-sm mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>

      {/* Demo Booking Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-brand-navy mb-4">
            Ready to See QuickApprove in Action?
          </h3>
          <p className="text-brand-gray mb-6">
            Schedule a personalized demo with our founders to see how QuickApprove can transform your vendor management process.
          </p>
          <Button
            onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSdYAyxBUr-XmkwGf-1U_lDICLiVah9ccSeaVHY_YrVDNYwf_Q/viewform", "_blank")}
            className="bg-brand-navy text-white border-2 border-brand-navy px-8 py-3 rounded-lg hover:bg-white hover:text-brand-navy transition-all duration-200 font-semibold"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Book a Demo with a Founder
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <img 
                  src={logoPath} 
                  alt="QuickApprove Logo" 
                  className="h-8 w-8 mr-2"
                />
                <span className="text-xl font-bold">QuickApprove</span>
              </div>
              <p className="text-gray-400 mb-4">
                Hands off buyer-vendor approvals at the speed of AI. Transform your vendor management with intelligent automation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => scrollToSection("features")}
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("how-it-works")}
                    className="hover:text-white transition-colors"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">Security</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => scrollToSection("about")}
                    className="hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 QuickApprove. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
