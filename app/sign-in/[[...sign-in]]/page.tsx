// Import necessary Clerk components
import { SignIn } from "@clerk/nextjs";
import React from 'react';

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" afterSignInUrl="/dashboard" appearance={customStyles} />
    </div>
  );
}
