<?php

namespace App\Http\Middleware;

use Closure;
use Facade\FlareClient\View;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::check()){
            $user = Auth::user();
            if ($user->admin) {
                return $next($request);
            }
            return redirect('/user/non-admin');
        } else {
            return redirect('/login');
        }
    }
}
