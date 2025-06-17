import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Play, Users, Star, Clock, ChefHat } from 'lucide-react';
import { Button } from '../components/ui/Button';

const ThemeTestPage: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c003e' }}>
      <Helmet>
        <title>Dreamcatcher Theme Test - Chefito</title>
      </Helmet>

      {/* Header with navigation */}
      <header className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChefHat className="w-8 h-8" style={{ color: '#ffc100' }} />
              <span className="text-2xl font-display font-bold text-white">Chefito</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">Recipes</a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">Categories</a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">About</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Dreamcatcher Theme Test
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Testing the beautiful dreamcatcher color palette with deep violet, bright yellow, and fuchsia accents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              style={{ 
                backgroundColor: '#e7308a',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff7733';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#e7308a';
              }}
            >
              Start Cooking
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 text-white border-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-xl transition-all duration-300"
            >
              Explore Recipes
            </Button>
          </div>
        </div>
      </section>

      {/* How Chefito Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              How Chefito Works
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Experience the magic of cooking with our dreamcatcher-inspired interface
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Find Recipes Card */}
            <div 
              className="p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: '#ffc100' }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#00784f' }}>
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4 text-center" style={{ color: '#2c003e' }}>
                Find Recipes
              </h3>
              <p className="text-center leading-relaxed" style={{ color: '#2c003e' }}>
                Discover thousands of delicious recipes tailored to your taste preferences and dietary needs.
              </p>
              <div className="mt-6 text-center">
                <Button
                  variant="primary"
                  className="text-white font-medium px-6 py-2 rounded-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: '#e7308a',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff7733';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#e7308a';
                  }}
                >
                  Browse Recipes
                </Button>
              </div>
            </div>

            {/* Cooking Mode Card */}
            <div 
              className="p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: '#ffc100' }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#00784f' }}>
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4 text-center" style={{ color: '#2c003e' }}>
                Cooking Mode
              </h3>
              <p className="text-center leading-relaxed" style={{ color: '#2c003e' }}>
                Follow step-by-step voice instructions with hands-free cooking assistance powered by AI.
              </p>
              <div className="mt-6 text-center">
                <Button
                  variant="primary"
                  className="text-white font-medium px-6 py-2 rounded-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: '#e7308a',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff7733';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#e7308a';
                  }}
                >
                  Try Cooking Mode
                </Button>
              </div>
            </div>

            {/* Share & Connect Card */}
            <div 
              className="p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: '#ffc100' }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#00784f' }}>
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4 text-center" style={{ color: '#2c003e' }}>
                Share & Connect
              </h3>
              <p className="text-center leading-relaxed" style={{ color: '#2c003e' }}>
                Connect with fellow food lovers, share your creations, and discover new culinary adventures.
              </p>
              <div className="mt-6 text-center">
                <Button
                  variant="primary"
                  className="text-white font-medium px-6 py-2 rounded-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: '#e7308a',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff7733';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#e7308a';
                  }}
                >
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipe Preview */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Featured Recipe
            </h2>
          </div>
          
          <div 
            className="p-8 rounded-2xl shadow-xl"
            style={{ backgroundColor: '#ffc100' }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: '#00784f' }}
                  >
                    Featured
                  </span>
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: '#e7308a' }}
                  >
                    Easy
                  </span>
                </div>
                <h3 className="text-3xl font-display font-bold mb-4" style={{ color: '#2c003e' }}>
                  Dreamcatcher Pasta
                </h3>
                <p className="text-lg mb-6" style={{ color: '#2c003e' }}>
                  A magical blend of colors and flavors that will transport you to a world of culinary dreams.
                </p>
                <div className="flex items-center gap-6 mb-6" style={{ color: '#2c003e' }}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" style={{ color: '#00784f' }} />
                    <span>30 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" style={{ color: '#00784f' }} />
                    <span>4 servings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" style={{ color: '#e7308a' }} />
                    <span>4.8</span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
                  style={{ 
                    backgroundColor: '#e7308a',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff7733';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#e7308a';
                  }}
                >
                  Cook This Recipe
                </Button>
              </div>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg" 
                  alt="Dreamcatcher Pasta"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-purple-700">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-300">
            © 2024 Chefito - Dreamcatcher Theme Test
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ThemeTestPage;