import { Header } from '../components/Header';
import { Check, Zap, Star } from 'lucide-react';

export const FitPass = () => {
  const plan = {
    name: 'FitPass',
    icon: Zap,
    price: '$15',
    period: 'month',
    description: 'One pass, unlimited gyms, anytime, anywhere.',
    features: [
      'Unlimited gym visits',
      'Premium gym amenities',
      'Priority support',
      'Guest pass (2 per month)',
      'Workout tracking',
    ],
    color: 'border-orange-500 ring-2 ring-orange-100',
    buttonColor: 'bg-orange-500 text-white hover:bg-orange-600',
    popular: true,
  };

  const testimonials = [
    {
      name: 'Sarah Johnson',
      feedback: 'FitPass has completely transformed my fitness routine. I can work out anywhere, anytime!',
      rating: 5,
    },
    {
      name: 'Mike Brown',
      feedback: 'The guest passes are a game-changer. I can bring my friends along for workouts!',
      rating: 4.5,
    },
    {
      name: 'Emily Davis',
      feedback: 'The best subscription for travelers who want to stay fit on the go!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <Header
        isLoggedIn={false} // Update this based on your app's state
        user={null} // Update this based on your app's state
        onAuthClick={() => console.log('Sign In clicked')}
        onLogout={() => console.log('Logout clicked')}
      />

      {/* FitPass Section */}
      <section id="fitpass" className="py-20 bg-gray-800 relative">
        {/* Background Images */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-3 gap-0 h-full">
            <img
              src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="w-full h-full object-cover"
            />
            <img
              src="https://images.pexels.com/photos/2247179/pexels-photo-2247179.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="w-full h-full object-cover"
            />
            <img
              src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">FitPass Subscription</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Unlock unlimited access to gyms and premium amenities with FitPass.
            </p>
          </div>

          <div className="flex justify-center max-w-3xl mx-auto">
            <div
              className={`bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 ${plan.color} p-8 relative transform lg:scale-105 transition-transform hover:scale-110`}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-6">
                <div className="inline-flex p-3 rounded-lg mb-4 bg-orange-500 bg-opacity-20">
                  <plan.icon className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => console.log('Subscribe clicked')}
                className={`w-full py-4 rounded-lg font-semibold transition-colors ${plan.buttonColor}`}
              >
                Get FitPass
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-4">
              All plans include a 7-day free trial. Cancel anytime.
            </p>
            
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <Star className="h-6 w-6 text-yellow-400 mr-2" />
                  <span className="text-yellow-400 font-bold">{testimonial.rating} Stars</span>
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.feedback}"</p>
                <p className="text-gray-400 text-sm">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-white mb-8">
            Join thousands of fitness enthusiasts who are already using FitPass to stay active and healthy.
          </p>
          <button
            onClick={() => console.log('Get FitPass clicked')}
            className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Get FitPass Now
          </button>
        </div>
      </section>
    </div>
  );
};