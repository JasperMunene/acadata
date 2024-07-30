// CreateModal.tsx
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plus, X } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(5, 'Name must be at least 5 characters').max(50, 'Name cannot exceed 50 characters').trim(),
    address: z.string().min(3, 'Address must be at least 3 characters').max(10, 'Address cannot exceed 10 characters').trim(),
    city: z.string().min(2, 'City must be at least 2 characters'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number cannot exceed 15 digits'),
    email: z.string().email('Invalid email format'),
    type: z.enum(['private', 'public'], { invalid_type_error: 'Invalid type' })
});

export function CreateModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: 'AcaData School',
            address: '123 Main St',
            city: 'Nairobi',
            phone: '1234567890',
            email: 'acadata@example.com',
            type: 'private',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        onClose();
    }

    return (
        <>
            {isOpen && (
                <div
                    id="defaultModal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden"
                >
                    <div className="relative w-full max-w-2xl p-4 h-full md:h-auto">
                        {/* Modal content */}
                        <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                            {/* Modal header */}
                            <div className="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Add School
                                </h3>
                                <button
                                    type="button"
                                    className="p-1.5 ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900"
                                    onClick={onClose}
                                >
                                    <X />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            {...form.register('name')}
                                            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                                            placeholder="Type name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            {...form.register('address')}
                                            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                                            placeholder="Type address"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            {...form.register('city')}
                                            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                                            placeholder="Type city"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            {...form.register('phone')}
                                            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                                            placeholder="Type phone"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            {...form.register('email')}
                                            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                                            placeholder="Type email"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900">Type</label>
                                        <select
                                            id="type"
                                            {...form.register('type')}
                                            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                                            required
                                        >
                                            <option value="private">Private</option>
                                            <option value="public">Public</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-primary-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-primary-300 hover:bg-primary-800"
                                >
                                   <Plus />
                                    Add new school
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
