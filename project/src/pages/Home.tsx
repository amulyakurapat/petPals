import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, PawPrint, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          type: 'newsletter',
          email,
        }),
      });

      if (!response.ok) throw new Error('Failed to subscribe');

      toast.success('Thank you for subscribing! Please check your email.');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Give Them a Forever Home</h1>
            <p className="text-xl mb-8">Every pet deserves a loving family. Be the reason for their happiness.</p>
            <div className="space-x-4">
              <Link to="/adopt" className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700">
                Adopt Now
              </Link>
              <Link to="/rehome" className="bg-white text-purple-600 px-6 py-3 rounded-md hover:bg-gray-100">
                Rehome a Pet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Find Your Perfect Match</h3>
              <p className="text-gray-600">Browse through our collection of lovely pets waiting for their forever homes.</p>
            </div>
            <div className="text-center">
              <PawPrint className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Help a Pet in Need</h3>
              <p className="text-gray-600">Found a stray? Help them find a loving home through our platform.</p>
            </div>
            <div className="text-center">
              <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-600">Subscribe to our newsletter for the latest updates on available pets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-purple-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-gray-600 mb-8">Subscribe to receive updates about new pets and adoption stories.</p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 text-white px-6 py-2 rounded-r-md hover:bg-purple-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;