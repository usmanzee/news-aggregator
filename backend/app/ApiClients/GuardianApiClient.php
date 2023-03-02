<?php

namespace App\ApiClients;
use App\Services\NewsService;
use Illuminate\Http\Client\Response;
use App\Services\GuardianNewsService;

class GuardianApiClient {
    public function __construct(private GuardianNewsService $service) {}
    public function guardianNewsList(string $url): Response {
        return $this->service->get(
            request: $this->service->buildRequest(),
            url: $url
        );
    }
}