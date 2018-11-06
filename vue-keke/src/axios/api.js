import { get, post } from './axiosConfig'

// export const apiAddress = p => post('api/v1/users/my_address/address_edit_before', p);
export const apiAddress = p => get('api/v1/users/my_address/address_edit_before', p);