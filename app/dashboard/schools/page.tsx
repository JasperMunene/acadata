'use client';

import React, { useEffect, useState } from 'react';
import { Plus, ChevronDown, Filter, Ellipsis } from 'lucide-react';
import { CreateModal } from '@/components/modals/CreateModal';
import { UpdateModal } from '@/components/modals/UpdateModal';
import { DeleteModal } from '@/components/modals/DeleteModal';
import Searchbar from '@/components/Searchbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

const Page: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [modalType, setModalType] = useState<ModalType>(MODAL_TYPES.NONE);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const itemsPerPage = 10;

  useEffect(() => {
    getSchools();
  }, [fetchTrigger, currentPage, filterType, searchTerm]);

  const openModal = (type: ModalType = MODAL_TYPES.NONE, school: School | null = null) => {
    setModalType(type);
    if (type === MODAL_TYPES.CREATE) {
      setCreateModalOpen(true);
    } else if (type === MODAL_TYPES.UPDATE && school) {
      setSelectedSchool(school);
      setUpdateModalOpen(true);
    } else if (type === MODAL_TYPES.DELETE && school) {
      setSelectedSchool(school);
      setDeleteModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalType(MODAL_TYPES.NONE);
    setCreateModalOpen(false);
    setUpdateModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedSchool(null);
    setFetchTrigger(prev => !prev);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  async function getSchools() {
    let query = supabase
      .from('schools')
      .select('*', { count: 'exact' })
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (filterType) {
      query = query.eq('type', filterType);
    }

    if (searchTerm) {
      query = query.ilike('name', `%${searchTerm}%`);
    }

    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching schools:', error);
    } else {
      setSchools(data || []);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
    }
  }

  return (
    <>
      <section className='p-6 lg:p-10'>
        <div className="bg-white relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <Searchbar onSearch={handleSearch} />
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                onClick={() => openModal(MODAL_TYPES.CREATE)}
                className='flex items-center justify-center text-white bg-[#1d4ed8] hover:bg-[#3A5AFF]/90 focus:ring-4 focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-4 py-2 focus:outline-none'
              >
                <Plus size={20} className="mr-2" />
                Add School  
              </button>
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div
                      className='w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200'
                    >
                      <Filter size={15} className="mr-2" />
                      Filter
                      <ChevronDown className="ml-2" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='py-1 text-sm text-gray-500 bg-gray-100'>
                    <DropdownMenuItem onClick={() => setFilterType(null)}>Clear Filters</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterType('Public')}>Public Schools</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType('Private')}>Private Schools</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                        <DropdownMenuTrigger asChild>
                          <div className='inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none'>
                            <Ellipsis />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='py-1 text-sm text-blue-500 bg-gray-100'>
                          <DropdownMenuItem>
                            <button
                              onClick={() => openModal(MODAL_TYPES.UPDATE, school)}
                              className='block py-2 px-4 text-gray-700 font-semibold cursor-pointer'
                            >
                              Edit
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <button
                              onClick={() => openModal(MODAL_TYPES.DELETE, school)}
                              className='block py-2 px-4 text-gray-700 font-semibold cursor-pointer'
                            >
                              Delete
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <CreateModal isOpen={isCreateModalOpen} onClose={closeModal} type='school' />
        <DeleteModal isOpen={isDeleteModalOpen} onClose={closeModal} school={selectedSchool} type='school' />
        {selectedSchool && (
          <UpdateModal
            isOpen={isUpdateModalOpen}
            onClose={closeModal}
            school={selectedSchool}
            type='school'
          />
        )}
        <Footer
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </section>
      <footer className="mt-12 text-center text-gray-600">
        <p>&copy; 2024 AcaData. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Page;
