import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import ChatBot from "@/components/ChatBot";
import QuoteForm from "@/components/QuoteForm";

const services = [
  {
    id: 1,
    title: "INTERLOCKING",
    subtitle: "铺砖",
    description: "专业的铺砖服务，采用高质量材料和精湛工艺，为您的庭院和车道创造美观耐用的表面。",
    image: "https://images.unsplash.com/photo-1585399781879-915461982ecb?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "POWERWASHING",
    subtitle: "高压清洗",
    description: "高效清除砖缝中的杂草和污垢，使用专业设备和环保清洁剂，恢复您的户外空间的光彩。",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "RELEVELLING",
    subtitle: "车道修复",
    description: "修复和重新平整下沉或损坏的车道，确保安全和美观，延长使用寿命。",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    title: "POLYMER SAND",
    subtitle: "胶沙更换",
    description: "使用高质量聚合物砂填充砖缝，防止杂草生长，增强排水性能，延长铺砖寿命。",
    image: "https://images.unsplash.com/photo-1585399781879-915461982ecb?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    title: "PAVER SEALING",
    subtitle: "铺路石密封",
    description: "专业的铺路石密封处理，保护您的投资，防止褪色和污渍，保持长期美观。",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop"
  },
  {
    id: 6,
    title: "YARD WORKS",
    subtitle: "庭院工作",
    description: "全面的庭院维护和改造服务，包括景观设计、种植和硬景观建设。",
    image: "https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=600&h=400&fit=crop"
  }
];

const testimonials = [
  {
    name: "John Smith",
    text: "Excellent work! The team was professional and the results exceeded our expectations.",
    rating: 5
  },
  {
    name: "Sarah Johnson",
    text: "Very satisfied with the quality of work. They completed the project on time and within budget.",
    rating: 5
  },
  {
    name: "Michael Chen",
    text: "Great attention to detail. Our backyard looks amazing now!",
    rating: 5
  }
];

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">L</div>
              <span className="text-xl font-bold text-gray-800">Premium Landscaping</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-green-600 transition">Services</a>
              <a href="#about" className="text-gray-600 hover:text-green-600 transition">About</a>
              <a href="#testimonials" className="text-gray-600 hover:text-green-600 transition">Testimonials</a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 transition">Contact</a>
              <a href="tel:+14165551234" className="flex items-center space-x-1 text-green-600 font-semibold">
                <Phone size={18} />
                <span>(416) 806-1168</span>
              </a>
              <Button onClick={() => setIsQuoteFormOpen(true)} className="bg-green-600 hover:bg-green-700">Get Quote</Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#services" className="block text-gray-600 hover:text-green-600 py-2">Services</a>
              <a href="#about" className="block text-gray-600 hover:text-green-600 py-2">About</a>
              <a href="#testimonials" className="block text-gray-600 hover:text-green-600 py-2">Testimonials</a>
              <a href="#contact" className="block text-gray-600 hover:text-green-600 py-2">Contact</a>
              <a href="tel:+14165551234" className="block text-green-600 font-semibold py-2">(416) 555-1234</a>
              <Button onClick={() => setIsQuoteFormOpen(true)} className="w-full bg-green-600 hover:bg-green-700">Get Quote</Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 md:h-screen bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1585399781879-915461982ecb?w=1200&h=800&fit=crop)',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Premium Landscaping Services</h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl">Transform Your Outdoor Space with Professional Expertise</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => setIsQuoteFormOpen(true)} size="lg" className="bg-green-600 hover:bg-green-700 text-white">Get Free Quote</Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800">View Gallery</Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive landscaping solutions for your home</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105">
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-green-600 font-semibold mb-3">{service.subtitle}</p>
                  <p className="text-gray-600">{service.description}</p>
                  <Button onClick={() => setIsQuoteFormOpen(true)} className="mt-4 w-full bg-green-600 hover:bg-green-700">Learn More</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=600&h=400&fit=crop" alt="About Us" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">15+ Years Experience</h3>
                    <p className="text-gray-600">Trusted by thousands of homeowners in the area</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Professional Team</h3>
                    <p className="text-gray-600">Certified and trained landscaping specialists</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Quality Materials</h3>
                    <p className="text-gray-600">We use only premium materials for lasting results</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Free Estimates</h3>
                    <p className="text-gray-600">No obligation quotes for all your projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Trusted by homeowners across the region</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Get Your Free Quote Today</h2>
              <p className="text-lg mb-8">Contact us for a free estimate on your landscaping project. Our team is ready to help transform your outdoor space.</p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone size={24} />
                  <div>
                    <p className="font-semibold">(416) 555-1234</p>
                    <p className="text-green-100">Call us anytime</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail size={24} />
                  <div>
                    <p className="font-semibold">info@premiumlandscaping.ca</p>
                    <p className="text-green-100">Email us your project details</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin size={24} />
                  <div>
                    <p className="font-semibold">Toronto, GTA</p>
                    <p className="text-green-100">Serving the greater Toronto area</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white" />
              <textarea placeholder="Tell us about your project" rows={4} className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"></textarea>
              <Button onClick={() => setIsQuoteFormOpen(true)} className="w-full bg-white text-green-600 hover:bg-gray-100 font-semibold">Send Quote Request</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Quote Form Modal */}
      <QuoteForm isOpen={isQuoteFormOpen} onClose={() => setIsQuoteFormOpen(false)} />

      {/* ChatBot */}
      <ChatBot />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Premium Landscaping</h3>
              <p className="text-gray-400">Your trusted partner for professional landscaping services.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Interlocking</a></li>
                <li><a href="#" className="hover:text-white transition">Powerwashing</a></li>
                <li><a href="#" className="hover:text-white transition">Paver Sealing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Gallery</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition"><Facebook size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><Instagram size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><Linkedin size={20} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">&copy; 2024 Premium Landscaping Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
