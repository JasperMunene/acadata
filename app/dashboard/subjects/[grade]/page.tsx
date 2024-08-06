'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Searchbar from '@/components/Searchbar';
import { Plus, Ellipsis } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateModal } from '@/components/modals/CreateModal';
import { DeleteModal } from '@/components/modals/DeleteModal';

const MODAL_TYPES = {
  NONE: 'NONE',
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
} as const;

type ModalType = typeof MODAL_TYPES[keyof typeof MODAL_TYPES];

interface Subject {
  subject_id: string;
  name: string;
}

const AddSubject: React.FC = () => {
  const { grade } = useParams();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState<ModalType>(MODAL_TYPES.NONE);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [classId, setClassId] = useState<number>();
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    getSubjects();
  }, [grade, fetchTrigger]);

  const getSubjects = async () => {
    const gradeNumber = Number(grade);
    if (isNaN(gradeNumber)) {
      console.error('Invalid grade:', grade);
      return;
    }

    const classId = await getClassIdByGrade(gradeNumber);
    if (!classId) {
      console.error('Class ID not found for grade:', gradeNumber);
      setLoading(false);
      return;
    }

    setClassId(classId.class_id);

    const { data, error } = await supabase
      .from('subjects')
      .select('subject_id, name')
      .eq('class_id', classId.class_id);

    if (error) {
      console.error('Error fetching subjects:', error);
    } else {
      setSubjects(data);
    }
    setLoading(false);
  };

  const getClassIdByGrade = async (grade: number) => {
    const { data, error } = await supabase
      .from('classes')
      .select('class_id')
      .eq('grade', grade)
      .single();

    if (error) {
      console.error('Error fetching class ID:', error);
      return null;
    }
    return data;
  };

  const handleSearch = (searchTerm: string) => {
    const filteredSubjects = subjects.filter(subject =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSubjects(filteredSubjects);
  };

  const openModal = (type: ModalType = MODAL_TYPES.NONE, subject: Subject | null = null) => {
    setModalType(type);
    if (type === MODAL_TYPES.CREATE) {
      setCreateModalOpen(true);
    } else if (type === MODAL_TYPES.UPDATE && subject) {
      setSelectedSubject(subject);
      setUpdateModalOpen(true);
    } else if (type === MODAL_TYPES.DELETE && subject) {
      setSelectedSubject(subject);
      setDeleteModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalType(MODAL_TYPES.NONE);
    setCreateModalOpen(false);
    setUpdateModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedSubject(null);
    setFetchTrigger(prev => !prev);
  };

  const handleSubjectAdded = (newSubject: Subject) => {
    setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        Add Subjects for Grade {grade}
      </h1>
      <section className="p-6 lg:p-10 bg-white rounded-lg shadow-lg">
        <div className="relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <Searchbar onSearch={handleSearch} />
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                onClick={() => openModal(MODAL_TYPES.CREATE)}
                className="flex items-center justify-center text-white bg-[#1d4ed8] hover:bg-[#3A5AFF]/90 focus:ring-4 focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
              >
                <Plus size={20} className="mr-2" />
                Add Subject
              </button>
            </div>
          </div>
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3">Subject Name</th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-4 py-3">Loading...</td>
                  </tr>
                ) : subjects.length > 0 ? (
                  subjects.map((subject, index) => (
                    <tr key={index} className="bg-white border-b">
                      <td className="px-4 py-3">{subject.name}</td>
                      <td className="px-4 py-3 flex items-center justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none">
                              <Ellipsis />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="py-1 text-sm text-blue-500 bg-gray-100">
                            <DropdownMenuItem>
                              <button
                                onClick={() => openModal(MODAL_TYPES.UPDATE, subject)}
                                className="block py-2 px-4 text-gray-700 font-semibold cursor-pointer"
                              >
                                Edit
                              </button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <button
                                onClick={() => openModal(MODAL_TYPES.DELETE, subject)}
                                className="block py-2 px-4 text-gray-700 font-semibold cursor-pointer"
                              >
                                Delete
                              </button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-3">No subjects found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <CreateModal isOpen={isCreateModalOpen} onClose={closeModal} type="subject" classId={classId} />
      <DeleteModal isOpen={isDeleteModalOpen} onClose={closeModal} subject={selectedSubject} type="subject" />
    </div>
  );
};

export default AddSubject;
