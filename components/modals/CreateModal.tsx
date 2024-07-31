import React, { useState } from 'react';
import Modal from './Modal';
import { Plus } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast"

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  
};

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    type: 'Public'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('schools').insert([formData]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      clearForm();
      onClose(); // Automatically close the modal after submission
    }
  };

  const clearForm = () => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      city: '',
      type: 'Public'
    });
  }
  const { toast } = useToast()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative p-6 bg-white rounded-lg mt-3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">School Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="AcaData School"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            />
          </div>
          <div className="space-y-4 md:flex md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="+25474567890"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="contact@acadataschool.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              />
            </div>
          </div>
          <div className="space-y-4 md:flex md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="123 Main St"
                value={formData.address}
                onChange={handleChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              />
            </div>
          </div>
          <div className='pb-1'>
            <p className="text-sm text-gray-700 mt-2 pt-2 pb-2 lg:text-base">Type</p>
            <div className='flex flex-col gap-2'>
              <label htmlFor="private" className='flex items-center border border-gray-600 rounded-lg p-3 shadow-sm bg-white radio-label hover:border-[#3A5AFF] hover:border-[1.5px] cursor-pointer'>
                <input 
                  type="radio"
                  id="private"
                  name='type'
                  value='Private'
                  className='custom-radio'
                  onChange={handleChange}
                  checked={formData.type === 'Private'}
                  required
                />
                <span className="text-gray-700 pl-3 font-bold">Private</span>
              </label>
              <label htmlFor="public" className='flex items-center border border-gray-600 rounded-lg p-3 shadow-sm bg-white radio-label hover:border-[#3A5AFF] hover:border-[1.5px] cursor-pointer'>
                <input 
                  type="radio"
                  id="public"
                  name='type'
                  value='Public'
                  className='custom-radio'
                  onChange={handleChange}
                  checked={formData.type === 'Public'}
                  required
                />
                <span className="text-gray-700 pl-3 font-bold">Public</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg px-4 py-2 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
              onClick={() => {
                toast({
                  description: "School added successfully",
                })
              }}
            >
              <Plus className="mr-2" />
              Add
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export { CreateModal };
