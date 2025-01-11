<?php



use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $payments = Payment::all();

        return Inertia::render('Dashboard', [
            'payments' => $payments
        ]);
    }
}
