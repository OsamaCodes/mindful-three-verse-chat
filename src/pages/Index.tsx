
import React from 'react';
import { Button } from "@/components/ui/button";
import ThreeBrainWave from '@/components/ThreeBrainWave';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import ChatDemoWindow from '@/components/ChatDemoWindow';
import FAQ from '@/components/FAQ';
import { Brain, Shield, MessageSquareText, Clock, HeartHandshake, PanelRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 hero-gradient relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mindful-900 mb-6 leading-tight">
              Mental Wellness Support, 
              <span className="text-soothing-600"> Always Available</span>
            </h1>
            <p className="text-xl text-mindful-700 mb-8 max-w-xl">
              A supportive AI companion trained on specialized mental health data to provide evidence-based coping strategies and emotional support when you need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary" asChild>
                <Link to="/chat">
                  Start Chatting Now
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Link>
              </Button>
              <Button variant="outline" className="btn-secondary">
                Learn More
              </Button>
            </div>
            <div className="mt-8 p-4 rounded-lg bg-white/80 backdrop-blur-sm border border-mindful-100 inline-block">
              <p className="text-sm text-mindful-600 flex items-center">
                <Shield className="h-4 w-4 text-calm-500 mr-2" />
                Not a replacement for professional care - a supplementary resource
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 h-[400px] lg:h-[600px] relative mt-12 lg:mt-0">
            <div className="absolute inset-0 z-0">
              <ThreeBrainWave className="w-full h-full" />
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-0"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mx-auto">How MindfulAI Can Help</h2>
            <p className="text-mindful-600 max-w-2xl mx-auto mt-4">
              Our AI chatbot combines cutting-edge technology with evidence-based mental health practices to provide reliable support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Evidence-Based Techniques" 
              description="Access coping strategies rooted in Cognitive Behavioral Therapy (CBT), mindfulness, and other proven approaches."
              icon={Brain}
              iconColor="text-soothing-600"
              className="animate-fade-in"
            />
            <FeatureCard 
              title="Private & Secure" 
              description="Your conversations are encrypted and private. We prioritize your data security and confidentiality."
              icon={Shield}
              iconColor="text-mindful-500"
              className="animate-fade-in [animation-delay:200ms]"
            />
            <FeatureCard 
              title="Personalized Support" 
              description="Receive tailored responses based on your unique situation, needs, and preferred coping strategies."
              icon={MessageSquareText}
              iconColor="text-calm-500"
              className="animate-fade-in [animation-delay:400ms]"
            />
            <FeatureCard 
              title="24/7 Availability" 
              description="Get support at any time, day or night, whenever you need someone to talk to or strategies to cope."
              icon={Clock}
              iconColor="text-soothing-500"
              className="animate-fade-in [animation-delay:600ms]"
            />
            <FeatureCard 
              title="Complementary Care" 
              description="Works alongside traditional therapy to reinforce techniques and provide support between sessions."
              icon={HeartHandshake}
              iconColor="text-calm-600"
              className="animate-fade-in [animation-delay:800ms]"
            />
            <FeatureCard 
              title="Guided Exercises" 
              description="Follow step-by-step breathing exercises, grounding techniques, and mindfulness practices."
              icon={PanelRight}
              iconColor="text-mindful-600"
              className="animate-fade-in [animation-delay:1000ms]"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-mindful-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mx-auto">Experience The Chatbot</h2>
            <p className="text-mindful-600 max-w-2xl mx-auto mt-4">
              See how MindfulAI works with this interactive demo showcasing a sample conversation.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-semibold mb-4 text-mindful-800">How MindfulAI Works</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="bg-soothing-100 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-soothing-700 font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-mindful-800">Start a Conversation</h4>
                    <p className="text-mindful-600 mt-1">Share how you're feeling or what's on your mind. The AI is designed to be a judgement-free listener.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-soothing-100 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-soothing-700 font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-mindful-800">Receive Evidence-Based Support</h4>
                    <p className="text-mindful-600 mt-1">The AI analyzes your concerns and offers relevant strategies based on proven therapeutic approaches.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-soothing-100 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-soothing-700 font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-mindful-800">Try Guided Exercises</h4>
                    <p className="text-mindful-600 mt-1">Follow step-by-step mindfulness, breathing, or grounding exercises tailored to your needs.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-soothing-100 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-soothing-700 font-medium">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-mindful-800">Track Your Progress</h4>
                    <p className="text-mindful-600 mt-1">Optional mood tracking helps you visualize your emotional patterns and see improvement over time.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-white p-4 rounded-xl shadow-xl">
                <ChatDemoWindow />
                <p className="text-center text-sm text-mindful-500 mt-4 italic">
                  Click the send button to advance the demo conversation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mx-auto">User Stories</h2>
            <p className="text-mindful-600 max-w-2xl mx-auto mt-4">
              See how MindfulAI has helped others on their mental wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="MindfulAI has been there for me during late nights when anxiety hits and I can't reach my therapist. The guided breathing exercises have been particularly helpful."
              name="Alex J."
              role="Using MindfulAI for 3 months"
            />
            <TestimonialCard 
              quote="As someone who struggles with social anxiety, having a non-judgmental AI to practice conversations with has improved my confidence tremendously."
              name="Maya T."
              role="Using MindfulAI for 6 months"
            />
            <TestimonialCard 
              quote="I use the techniques I learn from MindfulAI in between my therapy sessions. My therapist has noticed the improvement in how I manage stress."
              name="Chris L."
              role="Using MindfulAI for 2 months"
            />
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="py-20 bg-mindful-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title mx-auto">Privacy & Ethics</h2>
              <p className="text-mindful-600 max-w-2xl mx-auto mt-4">
                We prioritize your privacy and well-being in everything we do.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="prose max-w-none text-mindful-700">
                <p className="mb-4">
                  MindfulAI was designed with strong ethical principles and a commitment to user privacy:
                </p>
                
                <h3 className="text-xl font-semibold text-mindful-800 mt-6 mb-3">Data Protection</h3>
                <p>
                  All conversations are encrypted end-to-end. We use industry-standard security measures to protect your data, and you can delete your conversation history at any time.
                </p>
                
                <h3 className="text-xl font-semibold text-mindful-800 mt-6 mb-3">Clear Limitations</h3>
                <p>
                  We are transparent about what MindfulAI can and cannot help with. In crisis situations, we direct users to appropriate emergency resources and professional help.
                </p>
                
                <h3 className="text-xl font-semibold text-mindful-800 mt-6 mb-3">Professional Oversight</h3>
                <p>
                  Our AI has been developed with guidance from mental health professionals to ensure the advice given is helpful and accurate.
                </p>
                
                <h3 className="text-xl font-semibold text-mindful-800 mt-6 mb-3">Continuous Improvement</h3>
                <p>
                  We regularly update our model based on the latest research and best practices in mental health care, ensuring you receive the most effective support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mx-auto">Frequently Asked Questions</h2>
            <p className="text-mindful-600 max-w-2xl mx-auto mt-4">
              Find answers to common questions about MindfulAI.
            </p>
          </div>
          
          <FAQ />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-mindful-600 to-soothing-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Wellness Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Take the first step towards better mental well-being with a supportive AI companion available whenever you need it.
          </p>
          <Button className="bg-white text-soothing-600 hover:bg-white/90 py-3 px-8 rounded-full font-medium text-lg transition-all duration-300" asChild>
            <Link to="/chat">
              Start Chatting Now
            </Link>
          </Button>
          <p className="mt-6 text-white/70 text-sm">
            Remember: MindfulAI is a supplement to, not a replacement for, professional mental health care.
          </p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-mindful-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-soothing-400" />
                <span className="font-bold text-lg">MindfulAI</span>
              </div>
              <p className="text-mindful-300 max-w-xs">
                A supportive AI companion for mental wellness and emotional support.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-white">Company</h3>
                <ul className="space-y-2 text-mindful-300">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-white">Resources</h3>
                <ul className="space-y-2 text-mindful-300">
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Mental Health Tips</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Crisis Support</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-white">Legal</h3>
                <ul className="space-y-2 text-mindful-300">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-mindful-700 mt-12 pt-6 text-center text-mindful-400">
            <p>&copy; {new Date().getFullYear()} MindfulAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
