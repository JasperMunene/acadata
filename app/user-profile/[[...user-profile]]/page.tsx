import { UserProfile } from "@clerk/nextjs";

const customStyles = {
  elements: {
    formButtonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full',
    card: 'shadow-lg p-5 rounded-lg bg-white',
    headerTitle: 'text-2xl font-bold text-center',
    headerSubtitle: 'text-sm text-gray-600 text-center mb-5',
    formFieldInput: 'border border-gray-300 rounded p-2 w-full',
    formFieldLabel: 'font-semibold text-gray-700 mb-1',
    footerActionLink: 'text-blue-500 hover:text-blue-600 font-semibold',
  },
  variables: {
    colorPrimary: '#3b82f6', // Customize primary color
    colorBackground: '#f9fafb', // Customize background color
  }
};

const UserProfilePage = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <UserProfile path="/user-profile" appearance={customStyles} />
  </div>
);

export default UserProfilePage;
