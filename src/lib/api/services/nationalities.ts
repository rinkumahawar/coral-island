import { HttpClient } from '../http-client';
import { API_CONFIG } from '../config';
import { ApiResponse } from '../types';

export interface Nationality {
  id: number;
  name: string;
}

export interface NationalitiesResponse {
  success: boolean;
  message: string;
  data: Nationality[];
}

export class NationalitiesService {
  public static async getNationalities(): Promise<Nationality[]> {
    const response = await HttpClient.get<ApiResponse<Nationality[]>>(
      API_CONFIG.endpoints.nationalities
    );
    return response.data.data;
  }
} 