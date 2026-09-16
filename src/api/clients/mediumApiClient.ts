import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Interface representing Medium Article data returned by API proxy.
 */
export interface MediumArticle {
  title: string;
  url?: string;
  link?: string;
  publishedAt?: string;
  pubDate?: string;
  author?: string;
  categories?: string[];
  readingTime?: string;
  description?: string;
}

/**
 * Interface representing Medium API Proxy response payload.
 */
export interface MediumApiResponse {
  status?: string;
  count?: number;
  featuredBlog?: MediumArticle;
  blogs?: MediumArticle[];
  items?: MediumArticle[];
}

/**
 * API Client encapsulating SUT `/api/medium` endpoint calls.
 */
export class MediumApiClient {
  constructor(private readonly request: APIRequestContext) {}

  /**
   * Sends GET request to `/api/medium` endpoint.
   */
  async getArticles(): Promise<APIResponse> {
    return this.request.get('/api/medium');
  }

  /**
   * Sends unsupported method request to `/api/medium` for negative testing.
   */
  async sendUnsupportedMethod(method: 'post' | 'delete' | 'put'): Promise<APIResponse> {
    return this.request[method]('/api/medium');
  }
}
