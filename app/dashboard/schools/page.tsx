'use client'
import Searchbar from '@/components/Searchbar';
import { CreateModal } from '@/components/modals/CreateModal';
import React, { useEffect, useState } from 'react';
import { Plus, ChevronDown, Filter, Ellipsis } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MODAL_TYPES = {
  NONE: 'NONE',
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
} as const;

type ModalType = typeof MODAL_TYPES[keyof typeof MODAL_TYPES];

type School = {
  school_id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  type: 'Public' | 'Private';
};

interface Item {
  id: number;
  name: string;
}

const Page = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [modalType, setModalType] = useState<ModalType>(MODAL_TYPES.NONE);
 

  useEffect(() => {
    getSchools();
  }, []);
  const data: Item[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];


  const openModal = (type: ModalType | null = null) => {
    
   
  };

  const closeModal = () => {
    setModalType(MODAL_TYPES.NONE);
    
  };

  async function getSchools() {
    const { data, error } = await supabase.from('schools').select();
    if (error) {
      console.error('Error fetching schools:', error);
    } else {
      setSchools(data || []);
    }
  }

  return (
    <section className='p-6 lg:p-10'>
      <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <Searchbar />
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button onClick={() => openModal(MODAL_TYPES.CREATE)} className='flex items-center justify-center text-white bg-[#1d4ed8] hover:bg-[#3A5AFF]/90 focus:ring-4 focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-4 py-2 focus:outline-none'>
              <Plus size={20} className="mr-2" />
              Add School
            </button>
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button className='w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200' type="button">
                <ChevronDown className="mr-2" />
                Actions
              </button>
              <button className='w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200' type="button">
                <Filter size={15} className="mr-2" />
                Filter
                <ChevronDown className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope='col' className='px-4 py-3'>School Name</th>
                <th scope='col' className='px-4 py-3 md:hidden lg:block'>Phone</th>
                <th scope='col' className='px-4 py-3'>Email</th>
                <th scope='col' className='px-4 py-3'>City</th>
                <th scope='col' className='px-4 py-3'>Type</th>
                <th scope='col' className='px-4 py-3'>
                  <span className='sr-only'>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.school_id} className='border-b'>
                  <th scope='row' className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap'>{school.name}</th>
                  <td className='px-4 py-3 md:hidden lg:block'>{school.phone}</td>
                  <td className='px-4 py-3'>{school.email}</td>
                  <td className='px-4 py-3'>{school.city}</td>
                  <td className='px-4 py-3'>{school.type}</td>
                  <td className='px-4 py-3 flex items-center justify-end'>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none'><Ellipsis /></DropdownMenuTrigger>
                      <DropdownMenuContent className='py-1 text-sm text-gray-700'>
                        <DropdownMenuItem className='block py-2 px-4 hover:bg-gray-100'>Show</DropdownMenuItem>
                        <DropdownMenuItem className='block py-2 px-4 hover:bg-gray-100'>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Page;
