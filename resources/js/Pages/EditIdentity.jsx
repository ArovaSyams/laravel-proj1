import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import { Link } from 'react-router-dom';

const EditIdentity = ({ certificates, identity, auth }) => {
  const [name, setName] = useState(identity.name);
  const [qualification, setQualification] = useState(identity.qualification);
  const [gender, setGender] = useState(identity.gender);
  console.log(identity.uniq_id, name, qualification, gender);

  const handleEdit = () => {
      // e.preventdefault();
    const data = {
      name, qualification, gender
    }
    router.put(`/identity/${identity.id}`, data);
  }

  const { data, setData, post, progress } = useForm({
    id: null,
    certificate: []
  })
  console.log(data.id, data.certificate);

  const handleCreateImage = () => {
    post(`/add-certificate`);
  }

  const handleEditImage = () => {
    post('/certificate')
  }

  const handleDeleteImage = (id) => {
    router.delete(`/certificate/${id}`);
  }

  return (
    <AuthenticatedLayout
    user={auth.user}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-10">

            <h1 className="font-semibold text-xl">Edit {identity.name}'s data</h1>
            <hr />

            <div className="mt-5">
            <form onSubmit={handleEdit}>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setQualification(e.target.value)}
                        id="qualification"
                        name="qualification"
                        autoComplete="country-name"
                        value={qualification}
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
                            checked={gender === 'Male' && true}
                            onChange={() => setGender('Male')}
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
                            checked={gender === 'Female' && true}
                            onChange={(e) => setGender('Female')}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="female" className="block text-sm font-medium leading-6 text-gray-900">
                            Female
                        </label>
                    </div>
                </div>
                </fieldset>


                <button type="submit" className="px-5 py-[5px] rounded-lg mt-5  bg-blue-700 text-white ">Edit data</button>
            </form>
            </div>

          </div>
        </div>
      </div>

      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-10">
            <h1 className="font-semibold text-xl">Edit Certificate</h1>   
            <hr />  
            
            <div className="mt-5">
              {/* <form onSubmit={handleEditImage}> */}
                  {certificates.map((certif) => (
                    <div className="mb-6 " key={certif.id}>
                      <img src={`/storage/${certif.certificate}`} alt="" width={100}  />
                      <div className='mt-3'>
                        <input type="file" className="bg-white" onChange={(e) => {
                          setData('certificate', e.target.files[0])
                        }} onClick={(e) => setData('id', certif.id)}/>

                        {/* <input type="hidden" onChange={(e) => setData('id', )} /> */}

                      </div>
                      <div className="flex flex-row gap-3">
                        <button type="submit" onClick={handleEditImage}  className="px-5 py-[5px] rounded-lg mt-2 bg-blue-700 text-white ">Edit</button>
                        <button type="submit" onClick={() => handleDeleteImage(certif.id)}  className="px-5 py-[5px] rounded-lg mt-2 bg-red-700 text-white ">Delete</button>
                        {/* <Link  method="delete" href={`/certificate/${certif.id}`} className="px-5 py-[5px] rounded-lg mt-2 bg-red-700 text-white ">Delete</Link> */}

                      </div>
                    </div>
                  ))}
                  {/* </form> */}

            </div>

            <div className='mt-5 '>
              <hr className='mb-3'/>
              <input type="file" onChange={(e) => setData('certificate', e.target.files[0])} onClick={(e) => setData('id', identity.uniq_id)} className="bg-white" />
              <br />
              <button type="submit" onClick={handleCreateImage}  className="px-5 py-[5px] rounded-lg mt-2 bg-green-700 text-white ">Add</button>
            </div>

          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

export default EditIdentity