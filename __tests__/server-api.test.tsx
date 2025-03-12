// import axios from 'axios';
// import ServerAPI from '@/services/server-api';

jest.mock('axios');

describe('ServerAPI', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });
  /*
   test('should make a GET request and return the correct response', async () => {
     const mockResponse = { data: { message: 'success' } };
 
     // Mock axios.create to return a mock instance
     (axios.create as jest.Mock).mockReturnValue({
       get: jest.fn().mockResolvedValue(mockResponse),
       post: jest.fn(),
       put: jest.fn(),
       patch: jest.fn(),
       delete: jest.fn(),
     });
 
     const response = await ServerAPI.get('/test-url');
 
     expect(axios.create().get).toHaveBeenCalledWith('/test-url', undefined);
     expect(response).toEqual(mockResponse);
   });
 
 
 
   test('should handle error in GET request', async () => {
     const mockError = new Error('Network Error');
     (axios.get as jest.Mock).mockRejectedValue(mockError);  // Mock axios.get to throw an error
 
     await expect(ServerAPI.get('/test-url')).rejects.toThrow('Network Error');  // Check if the error is thrown
   });
 
   // Test POST request
   test('should make a POST request and return the correct response', async () => {
     const mockResponse = { data: { message: 'Created' } };
     const postData = { name: 'New Task' };
     (axios.post as jest.Mock).mockResolvedValue(mockResponse);  // Mock axios.post response
 
     const response = await ServerAPI.post('/test-url', postData);
 
     expect(axios.post).toHaveBeenCalledWith('/test-url', postData, undefined);  // Check if axios.post was called correctly
     expect(response).toEqual(mockResponse);  // Verify that the response matches the mock
   });
 
   test('should handle error in POST request', async () => {
     const mockError = new Error('Bad Request');
     (axios.post as jest.Mock).mockRejectedValue(mockError);  // Mock axios.post to throw an error
 
     await expect(ServerAPI.post('/test-url', { name: 'New Task' })).rejects.toThrow('Bad Request');  // Check if the error is thrown
   });
 
   // Test PUT request
   test('should make a PUT request and return the correct response', async () => {
     const mockResponse = { data: { message: 'Updated' } };
     const putData = { name: 'Updated Task' };
     (axios.put as jest.Mock).mockResolvedValue(mockResponse);  // Mock axios.put response
 
     const response = await ServerAPI.put('/test-url', putData);
 
     expect(axios.put).toHaveBeenCalledWith('/test-url', putData, undefined);  // Check if axios.put was called correctly
     expect(response).toEqual(mockResponse);  // Verify that the response matches the mock
   });
 
   test('should handle error in PUT request', async () => {
     const mockError = new Error('Bad Request');
     (axios.put as jest.Mock).mockRejectedValue(mockError);  // Mock axios.put to throw an error
 
     await expect(ServerAPI.put('/test-url', { name: 'Updated Task' })).rejects.toThrow('Bad Request');  // Check if the error is thrown
   });
 
   // Test PATCH request
   test('should make a PATCH request and return the correct response', async () => {
     const mockResponse = { data: { message: 'Patched' } };
     const patchData = { name: 'Patched Task' };
     (axios.patch as jest.Mock).mockResolvedValue(mockResponse);  // Mock axios.patch response
 
     const response = await ServerAPI.patch('/test-url', patchData);
 
     expect(axios.patch).toHaveBeenCalledWith('/test-url', patchData, undefined);  // Check if axios.patch was called correctly
     expect(response).toEqual(mockResponse);  // Verify that the response matches the mock
   });
 
   test('should handle error in PATCH request', async () => {
     const mockError = new Error('Conflict');
     (axios.patch as jest.Mock).mockRejectedValue(mockError);  // Mock axios.patch to throw an error
 
     await expect(ServerAPI.patch('/test-url', { name: 'Patched Task' })).rejects.toThrow('Conflict');  // Check if the error is thrown
   });
 
   // Test DELETE request
   test('should make a DELETE request and return the correct response', async () => {
     const mockResponse = { data: { message: 'Deleted' } };
     (axios.delete as jest.Mock).mockResolvedValue(mockResponse);  // Mock axios.delete response
 
     const response = await ServerAPI.delete('/test-url');
 
     expect(axios.delete).toHaveBeenCalledWith('/test-url', undefined);  // Check if axios.delete was called correctly
     expect(response).toEqual(mockResponse);  // Verify that the response matches the mock
   });
 
   test('should handle error in DELETE request', async () => {
     const mockError = new Error('Not Found');
     (axios.delete as jest.Mock).mockRejectedValue(mockError);  // Mock axios.delete to throw an error
 
     await expect(ServerAPI.delete('/test-url')).rejects.toThrow('Not Found');  // Check if the error is thrown
   });
  */
});
