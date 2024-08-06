import Modal from "./Modal";
import { Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";

type DeleteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    school: School | null;
    
}

type School = {
    school_id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    city: string;
    type: 'Public' | 'Private';
  };

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, school, }) => {
    const { toast } = useToast();

    const handleDelete = async () => {
        if (school) {
            try {
            const { error } = await supabase
                .from('schools')
                .delete()
                .eq('school_id', school.school_id);
            
            if (error) {
                console.error('Error deleting school:', error);
                toast({
                    title: "Error deleting school",
                    description: error.message,
                  });
            } else {
                console.log('School deleted successfully');
                toast({
                title: "School deleted successfully",
                });
                onClose();
            }
        } catch (error) {
            console.error('Error deleting school:', error);
            toast({
                title: "Error deleting school",
                className: 'bg-gray-100'
              });
            onClose();
        }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="relative p-4 text-center bg-white sm:p-5 mt-5">
                <div className="flex items-center justify-center">
                <Trash2 size={40} />
                </div>
                
                <p className="mb-4 text-gray-500 py-3">Are you sure you want to delete this school?</p>
                <div className="flex justify-center items-center space-x-4">
                    <button 
                        onClick={onClose}
                        type="button" 
                        className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10">
                        No, cancel
                    </button>
                    <button 
                        onClick={handleDelete}
                        type="button" 
                        className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300">
                        Yes, I'm sure
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export { DeleteModal }
