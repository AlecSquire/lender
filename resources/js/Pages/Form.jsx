
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import React from 'react'
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { useForm } from 'react-hook-form'




export default function Form() {
        const { register, handleSubmit } = useForm();
        const onSubmit = data => console.log(data);
    return (<>
        <AuthenticatedLayout>
            <div className="min-h-screen bg-black text-white flex flex-col">
       <Head title="Form" />

        <form onSubmit={handleSubmit(onSubmit)}>
             <label> Transaction Type:
                <input {...register('name')} />
            </label>
             <label> User Selector
                <input {...register('name')} />
            </label>
             <label> Item Type:
                <input {...register('name')} />
            </label>
             <label> name
                <input {...register('name')} />
            </label>
      <input type='submit'/>
        </form>


        <Footer/>
</div>
        </AuthenticatedLayout>
                </>
    );
}
