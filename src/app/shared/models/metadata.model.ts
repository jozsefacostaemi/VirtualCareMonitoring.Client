export interface MetadataResponse<T> {
    success: boolean;
    message: string;
    data: T;
}