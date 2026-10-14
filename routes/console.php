<?php

use App\Jobs\SendOverdueItemReminders;
use Illuminate\Support\Facades\Schedule;

Schedule::job(new SendOverdueItemReminders)->dailyAt('09:00');
