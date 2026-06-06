import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PieChart, Download, Mail, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HeroPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <PieChart className="w-6 h-6 text-blue-500" />,
      title: "Visual Analytics",
      description: "Understand your spending habits instantly with dynamic donut charts and categorizations."
    },
    {
      icon: <Download className="w-6 h-6 text-blue-500" />,
      title: "Excel Exports",
      description: "Download your complete income and expense history into formatted Excel sheets with one click."
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-500" />,
      title: "Automated Reports",
      description: "Receive daily email summaries and automated reminders so you never forget to log a transaction."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      title: "Secure & Private",
      description: "Your financial data is encrypted and tied securely to your personal profile."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans pt-16">
      <Header />

      {/* Hero Section */}
      <main className="grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
            Your Personal Finance Companion
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl">
            Take control of your money with <span className="text-blue-600">MoneyMate</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10">
            Track your daily expenses, monitor your income, and generate beautiful reports. Stop wondering where your money goes and start directing it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/signup')}
              className="flex items-center justify-center gap-2 hover:shadow-blue-400/60 duration-500 cursor-pointer bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Start Tracking for Free <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center cursor-pointer justify-center gap-2 bg-white text-slate-700 border border-slate-300 text-lg font-semibold px-8 py-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to manage your finances</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Built from the ground up to make expense tracking frictionless and insightful.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center shadow-sm border border-slate-200 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HeroPage;