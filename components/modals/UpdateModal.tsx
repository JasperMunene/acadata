import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";

type UpdateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  school: School;
};

type School = {
  school_id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  type: 'Public' | 'Private';
};

export const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onClose, school }) => {
  const { toast } = useToast();
  const [name, setName] = useState(school.name);
  const [address, setAddress] = useState(school.address);
  const [phone, setPhone] = useState(school.phone);
  const [email, setEmail] = useState(school.email);
  const [city, setCity] = useState(school.city);
  const [type, setType] = useState<School['type']>(school.type);

  useEffect(() => {
    if (school) {
      setName(school.name);
      setAddress(school.address);
      setPhone(school.phone);
      setEmail(school.email);
      setCity(school.city);
      setType(school.type);
    }
  }, [school]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const { data, error } = await supabase
        .from('schools')
        .update({ name, address, phone, email, city, type })
        .eq('school_id', school.school_id);

      if (error) {
        console.error('Error updating school:', error);
        toast({
          title: "Error updating school",
          description: error.message,
          className: 'bg-gray-100'
        });
      } else {
        console.log('School updated successfully:', data);
        toast({
          title: "School updated successfully",
          className: 'bg-gray-100'
        });
        onClose();
      }
    } catch (error) {
      console.error('Unexpected error updating school:', error);
      toast({
        title: "Unexpected error updating school",
        className: 'bg-gray-100'
      });
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='p-6'>
        <h2 className='text-lg font-semibold mb-4'>Edit School</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label htmlFor='address' className='block text-sm font-medium text-gray-700'>
              Address
            </label>
            <input
              type='text'
              id='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
              Phone
            </label>
            <input
              type='tel'
              id='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
              City
            </label>
            <input
              type='text'
              id='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Type
            </label>
            <div className='mt-1'>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  name='type'
                  value='Public'
                  checked={type === 'Public'}
                  onChange={(e) => setType(e.target.value as 'Public')}
                  className='form-radio'
                />
                <span className='ml-2'>Public</span>
              </label>
              <label className='inline-flex items-center ml-6'>
                <input
                  type='radio'
                  name='type'
                  value='Private'
                  checked={type === 'Private'}
                  onChange={(e) => setType(e.target.value as 'Private')}
                  className='form-radio'
                />
                <span className='ml-2'>Private</span>
              </label>
            </div>
          </div>
          <div className='flex items-center justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='mr-4 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
