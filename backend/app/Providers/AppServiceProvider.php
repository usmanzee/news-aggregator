<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\NewsService;
use App\Services\GuardianNewsService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->singleton(
            abstract: NewsService ::class,
            concrete: fn () => new NewsService(
                baseUrl: strval(config('services.newsapi.url')),
                apiKey: strval(config('services.newsapi.key')),
            ),
        );
        $this->app->singleton(
            abstract: GuardianNewsService ::class,
            concrete: fn () => new GuardianNewsService(
                baseUrl: strval(config('services.guardianapi.url')),
                apiKey: strval(config('services.guardianapi.key')),
            ),
        );
    }
}
