import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";

type UpdateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  school?: School;
  subject?: Subject;
  type: 'school' | 'subject';
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

type Subject = {
  subject_id: string;
  name: string;
};

export const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onClose, school, subject, type }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    type: 'Public'
  });

  useEffect(() => {
    if (type === 'school' && school) {
      setFormData({
        name: school.name,
        address: school.address,
        phone: school.phone,
        email: school.email,
        city: school.city,
        type: school.type
      });
    } else if (type === 'subject' && subject) {
      setFormData({
        name: subject.name,
        address: '',
        phone: '',
        email: '',
        city: '',
        type: 'Public'
      });
    }
  }, [school, subject, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      let data, error;
      if (type === 'school' && school) {
        ({ data, error } = await supabase
          .from('schools')
          .update({ ...formData })
          .eq('school_id', school.school_id));
      } else if (type === 'subject' && subject) {
        ({ data, error } = await supabase
          .from('subjects')
          .update({ name: formData.name })
          .eq('subject_id', subject.subject_id));
      }

      if (error) {
        console.error(`Error updating ${type}:`, error);
        toast({
          title: `Error updating ${type}`,
          description: error.message,
          className: 'bg-gray-100'
        });
      } else {
        console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully:`, data);
        toast({
          title: `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`,
          className: 'bg-gray-100'
        });
        onClose();
      }
    } catch (error) {
      console.error(`Unexpected error updating ${type}:`, error);
      toast({
        title: `Unexpected error updating ${type}`,
        className: 'bg-gray-100'
      });
    }
  }

  const renderFormFields = () => {
    if (type === 'school') {
      return (
        <>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
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
              name='address'
              value={formData.address}
              onChange={handleChange}
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
              name='phone'
              value={formData.phone}
              onChange={handleChange}
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
              name='email'
              value={formData.email}
              onChange={handleChange}
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
              name='city'
              value={formData.city}
              onChange={handleChange}
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
                  checked={formData.type === 'Public'}
                  onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as 'Public' }))}
                  className='form-radio'
                />
                <span className='ml-2'>Public</span>
              </label>
              <label className='inline-flex items-center ml-6'>
                <input
                  type='radio'
                  name='type'
                  value='Private'
                  checked={formData.type === 'Private'}
                  onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as 'Private' }))}
                  className='form-radio'
                />
                <span className='ml-2'>Private</span>
              </label>
            </div>
          </div>
        </>
      );
    } else if (type === 'subject') {
      return (
        <div>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            required
          />
        </div>
      );
    }
    return null;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='p-6'>
        <h2 className='text-lg font-semibold mb-4'>Edit {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {renderFormFields()}
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
