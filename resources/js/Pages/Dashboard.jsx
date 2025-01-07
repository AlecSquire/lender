
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';



export default function Dashboard() {
    return (

        <AuthenticatedLayout
            header={


            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-semibold text-blue-400">Lender</span>
            </div>


            }
        >
            <Head title="Form" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-black shadow-sm sm:rounded-lg">

                      <h1>This is your dashboard</h1>


                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    );
}
