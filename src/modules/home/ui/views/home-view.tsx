"use client";



import { useRouter } from "next/navigation";
import { CalendarCheck2, Video, Bot, ArrowRight, ChevronRight, Users, BrainCircuit, Clock, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export const HomeView = () => {
  const router = useRouter();

  
  const features = [
    { 
      icon: <BrainCircuit className="h-8 w-8 text-purple-500" />, 
      title: "AI-Powered Meetings", 
      description: "Transform your meetings with intelligent AI assistants that provide real-time support and insights."
    },
    { 
      icon: <Clock className="h-8 w-8 text-blue-500" />, 
      title: "Save Time", 
      description: "Reduce meeting time by up to 40% with automated note-taking and action item tracking."
    },
    { 
      icon: <FileText className="h-8 w-8 text-green-500" />, 
      title: "Smart Summaries", 
      description: "Get comprehensive meeting summaries and action items delivered directly to your inbox."
    },
    { 
      icon: <Shield className="h-8 w-8 text-red-500" />, 
      title: "Secure & Private", 
      description: "Enterprise-grade security ensures your meeting data remains private and protected."
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/5 mask-linear-gradient-to-b from-transparent to-blue-900"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Transform Your Meetings with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI Assistants</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Meet smarter, not longer. Our AI agents take notes, provide insights, and help you make decisions faster.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  onClick={() => router.push('/dashboard/meetings/new')}
                >
                  Schedule Meeting <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  onClick={() => router.push('/dashboard/agents')}
                >
                  Explore AI Agents
                </Button>
              </motion.div>
            </div>
            <motion.div 
              className="relative w-full md:w-1/2 aspect-video rounded-lg overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg p-1">
                <div className="bg-gray-900 rounded-lg h-full flex items-center justify-center p-8">
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 rounded-full border-4 border-purple-500 flex items-center justify-center bg-gray-800">
                      <Bot className="w-12 h-12 text-purple-400" />
                    </div>
                    <div className="relative">
                      <div className="absolute -top-8 -left-6 w-40 h-6 bg-blue-500/20 rounded-full blur-lg"></div>
                      <div className="space-y-2">
                        <div className="h-2 w-40 bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-2 w-60 bg-gray-700 rounded animate-pulse delay-75"></div>
                        <div className="h-2 w-32 bg-gray-700 rounded animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Designed to enhance your meetings and boost productivity
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-400">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to upgrade your meetings?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of teams that are saving time and making better decisions with MeetAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => router.push('/dashboard')}
            >
              Get Started <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent hover:bg-white/10 text-white border-white"
              onClick={() => router.push('/dashboard/agents')}
            >
              View Demos
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6">
                <CalendarCheck2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Schedule a Meeting</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create a meeting and select the AI agents that will assist during the call.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-6">
                <Video className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Join the Call</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start your video call with participants and AI assistants ready to help.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Insights & Summaries</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive detailed meeting summaries, action items, and insights automatically.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}