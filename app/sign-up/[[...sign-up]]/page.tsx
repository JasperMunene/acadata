// Import necessary Clerk components
import { SignUp } from "@clerk/nextjs";

// Custom styles for the SignIn component
const customStyles = {
  elements: {
    formButtonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded',
    card: 'shadow-lg p-5 rounded-lg',
    headerTitle: 'text-3xl font-bold text-center',
    headerSubtitle: 'text-md text-gray-600 text-center mb-5',
    formFieldInput: 'border border-gray-300 rounded p-2 w-full',
    formFieldLabel: 'font-semibold text-gray-700 mb-1',
    footerActionLink: 'text-blue-500 hover:text-blue-600 font-semibold',
  },
  variables: {
    colorPrimary: '#3b82f6', // Customize primary color
    colorBackground: '#f9fafb', // Customize background color
  }
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" afterSignUpUrl="/dashboard" appearance={customStyles} />
    </div>
  );
}
