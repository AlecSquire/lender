
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import React from 'react'
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { useForm } from 'react-hook-form'

const array = [{
  firstName: 'alec',
    lastName: 'john',
   age: 16,
},
{
    firstName: 'aled',
    lastName: 'johnhan',
   age:36,
},
{
    firstName: 'alex',
    lastName: 'johnnes',
   age: 26,
}
]

const mapNames = array.map((person) => {
    console.log(person.age)
})

export default function Form() {
        const { register, handleSubmit } = useForm();
        const onSubmit = data => console.log(data);

        // const handleSubmit = async (onSubmit) => {

        // }
    return (<>
        <AuthenticatedLayout>
       <Head title="Form" />
                 <div className="container mt-5  text-black bg-slate-200">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Lender</h2>



        <form onSubmit={handleSubmit(onSubmit)}>
             <div className="form-check">
                        <input
                          {...register('transaction_type')}
                          type='radio'
                          name='transaction_type'
                          value='lender'
                          id='lending'
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor='lending'>Lender</label>
                      </div>
                      <div className="form-check">
                        <input
                          {...register('transaction_type')}
                          type='radio'
                          name='transaction_type'
                          value='borrower'
                          id='borrowing'
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor='borrowing'>Borrower</label>
                      </div>
             <label> User Selector
                {/* <input {...register('name')} type='dropdown'/> */}
                <input {...register('name')} />
            </label>
             <label> Item Name:
                <input {...register('item')} />
            </label>
                <label> Contact Info:
                    <input {...register('description')} placeholder='Great condition' />
                </label>
             <label> Phone Number
                <input {...register('phone')} type='tel'/>
            </label>
            <label>
                <input {...register('email')} type='email'/>
            </label>
      <button> Submit </button>
        </form>
 </div>
 </div>
 </div>
 </div>
 </div>


        <Footer/>
        </AuthenticatedLayout>
                </>
    );
}
