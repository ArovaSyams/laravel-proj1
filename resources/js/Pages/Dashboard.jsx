import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react'
import axios from 'axios';
import { useForm } from '@inertiajs/react'

export default function Dashboard({ certificates, identities, auth }) {
    
    // const [name, setName] = useState('');
    // const [qualification, setQualification] = useState('');
    // const [gender, setGender] = useState('');
    // const [certificate, setCertificate] = useState('');
    const { data, setData, post, progress } = useForm({
        name: '',
        qualification: '',
        gender: '',
        certificate: []
      });

    console.log(data.certificate);
    const handleSubmit = () => {
        // e.preventDefault();

        post('/identity');
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-10">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-3">
                                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder='Michael'
                                            // onChange={(e) => setName(e.target.value)}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-3">
                                    <label htmlFor="qualification" className="block text-sm font-medium leading-6 text-gray-900">
                                        Qualificaiton
                                    </label>
                                    <div className="mt-2">
                                        <select
                                        // onChange={(e) => setQualification(e.target.value)}
                                        onChange={(e) => setData('qualification', e.target.value)}
                                        id="qualification"
                                        name="qualification"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                                        >
                                        <option value="">Select qualification</option>
                                        <option value="Website design">Website design</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Data Analyst">Data Analyst</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>

                                <fieldset className='mt-5'>
                                <legend className="text-sm font-medium leading-6 text-gray-900">Gender</legend>
                                <div className="mt-3 space-y-3">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="male"
                                            name="gender"
                                            type="radio"
                                            // onChange={() => setGender('Male')}
                                            onChange={(e) => setData('gender', 'Male')}
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        <label htmlFor="male" className="block text-sm font-medium leading-6 text-gray-900">
                                            Male
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="female"
                                            name="gender"
                                            type="radio"
                                            // onChange={(e) => setGender('Female')}
                                            onChange={(e) => setData('gender', 'Female')}
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="female" className="block text-sm font-medium leading-6 text-gray-900">
                                            Female
                                        </label>
                                    </div>
                                </div>
                                </fieldset>

                                <div className='mt-5'>
                                    <input type="file" multiple onChange={(e) => setData('certificate', e.target.files)} className="bg-white" />

                                </div>
                                {/* <div>
                                {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                                )}

                                </div> */}

                                <button type="submit" className="px-5 py-[5px] rounded-lg mt-5  bg-green-700 text-white ">Submit</button>
                            </form>
                        </div>

                    </div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-10">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-10">
                        <h1 className="font-semibold text-lg ">Identity Data</h1>

                        <table className="w-full  table-fixed">
                        <thead>
                            <tr>
                                <th className="text-left border-b border-gray-300 p-2">Name</th>
                                <th className="text-left border-b border-gray-300 p-2">Qualification</th>
                                <th className="text-left border-b border-gray-300 p-2">Gender</th>
                                <th className="text-left border-b border-gray-300 p-2">Certificate</th>
                                <th className="text-left border-b border-gray-300 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {identities.map((identity) => (
                                <tr key={identity.id}>
                                    <td className="border-b border-gray-300 p-2">{identity.name}</td>
                                    <td className="border-b border-gray-300 p-2">{identity.qualification}</td>
                                    <td className="border-b border-gray-300 p-2">{identity.gender}</td>
                                    <td className="border-b border-gray-300 p-2 flex flex-1 flex-wrap flex-row overflow-auto">
                                        {certificates.map((certif) => (
                                            <div className="">
                                            {identity.uniq_id === certif.identity_id  && (
                                                <img src={`/storage/${certif.certificate}`} alt="" width={100}  />
                                            )}
                                            </div>
                                        ))}
                                        
                                   
                                    </td>
                                    <td className="border-b border-gray-300 p-2">
                                        <p>
                                        <Link href={`edit-identity/${identity.uniq_id}`} className="text-yellow-500">Edit</Link>
                                        <Link as='button' href={`identity/${identity.uniq_id}`} method='delete' className="ml-3 text-red-500">Delete</Link>
                                        </p>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
