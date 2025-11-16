import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { sendQuoteRequest } from "@/lib/quoteEmailService";

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

const services = [
  { value: "interlocking", label: "Interlocking (铺砖)" },
  { value: "powerwashing", label: "Powerwashing (高压清洗)" },
  { value: "relevelling", label: "Relevelling (车道修复)" },
  { value: "polymersand", label: "Polymer Sand (胶沙更换)" },
  { value: "sealing", label: "Paver Sealing (铺路石密封)" },
  { value: "yardworks", label: "Yard Works (庭院工作)" }
];

export default function QuoteForm({ isOpen, onClose }: QuoteFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    service: "interlocking",
    message: ""
  });

  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setStatus({ type: "error", message: "Please enter your name" });
      return false;
    }
    if (!formData.phone.trim()) {
      setStatus({ type: "error", message: "Please enter your phone number" });
      return false;
    }
    if (!formData.email.trim()) {
      setStatus({ type: "error", message: "Please enter your email" });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address" });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({ type: "error", message: "Please describe your project" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus({ type: "loading" });

    try {
      const result = await sendQuoteRequest(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: result.message
        });

        setTimeout(() => {
          setFormData({
            name: "",
            phone: "",
            email: "",
            service: "interlocking",
            message: ""
          });
          onClose();
          setStatus({ type: "idle" });
        }, 2000);
      } else {
        setStatus({
          type: "error",
          message: result.message
        });
      }
    } catch (error) {
      console.error("Error sending quote:", error);
      setStatus({
        type: "error",
        message: "Failed to send quote request. Please try again or call us directly at (416) 555-1234."
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-green-600 text-white p-6 flex justify-between items-center sticky top-0">
          <h2 className="text-2xl font-bold">Get Your Free Quote</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-green-700 p-1 rounded transition"
            aria-label="Close form"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {status.type === "success" ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle size={64} className="text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600">{status.message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {status.type === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{status.message}</p>
                </div>
              )}

              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  disabled={status.type === "loading"}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(416) 555-1234"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  disabled={status.type === "loading"}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  disabled={status.type === "loading"}
                />
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Interested In *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  disabled={status.type === "loading"}
                >
                  {services.map(service => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your project, location, timeline, budget, etc."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                  disabled={status.type === "loading"}
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={status.type === "loading"}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {status.type === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    "Send Quote Request"
                  )}
                </Button>
              </div>

              {/* Info Text */}
              <p className="text-xs text-gray-500 text-center pt-2">
                We typically respond within 24 hours
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
