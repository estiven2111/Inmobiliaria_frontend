import simpleRestProvider from 'ra-data-simple-rest';

const apiUrl = 'http://localhost:3002';
const baseDataProvider = simpleRestProvider(apiUrl);

export const customDataProvider = {
    ...baseDataProvider,

    getList: async (resource, params) => {
        if (resource === "formulario") {
            const response = await baseDataProvider.getList('formulario/tomador/dashboard', params);
          
            if (response && response.data && Array.isArray(response.data.data) && typeof response.total === 'number') {
                return {
                    data: response.data.data, 
                    total: response.total
                };
            } else {
                console.error("Server response format is not correct for 'getList':", response);
                throw new Error("Invalid response format from API for 'getList'.");
            }
        }
        return baseDataProvider.getList(resource, params);
    },
    

    // getOne: async (resource, params) => {
    //     if (resource === "formulario") {
    //         const response = await baseDataProvider.getOne(`formulario/tomador/dashboard?id_form=${params.id}`, params);

    //         if (response && response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
    //             return { data: response.data.data[0] };
    //         } else {
    //             console.error("Server response format is not correct for 'getOne':", response);
    //             throw new Error("Invalid response format from API for 'getOne'.");
    //         }
    //     }
    //     return baseDataProvider.getOne(resource, params);
    // },

    update: async (resource, params) => {
        if (resource === "formulario") {
            const {id, data} = params;
            const response = await fetch(`${apiUrl}/${resource}/validation-tomador/dashboard?id_form=${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const responseData = await response.json();

            // Assuming the server returns the updated record, otherwise adjust this
            return { data: responseData };
        }
        return baseDataProvider.update(resource, params);
    },

  
}

export default customDataProvider;
