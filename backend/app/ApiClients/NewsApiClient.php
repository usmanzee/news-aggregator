<?php

namespace App\ApiClients;
use App\Services\NewsService;
use Illuminate\Http\Client\Response;

class NewsApiClient {
    public function __construct(private NewsService $service) {}
    public function newsList(string $url): Response {
        return $this->service->get(
            request: $this->service->buildRequest(),
            url: $url
        );
    }
}