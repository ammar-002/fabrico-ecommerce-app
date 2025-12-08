import { XCircle, Home, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CancelPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Cancelled
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your order has been cancelled. No charges have been made to your account.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            If you experienced any issues during checkout or have questions, please don't hesitate to contact us.
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-5 h-5" />
            Return to Home
          </button>
          
          <button 
            onClick={() =>  navigate("/contact-us")}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 flex items-center justify-center gap-2 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}