const useApiFetchHook = (baseUrl) =>{
    const request = async (url,options = {}) => {
        try {
            const response = await fetch(url,{
                headers:{'Content-Type':'application/json'},
                ...options,
            })

            if(!response.ok){
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            return await response.json();
        }catch(error){
            console.error('API Error:', error);
            return error;
        }
    }

    const  get = () => request(baseUrl);
    const post = (payload) => request(baseUrl,{
        method:'POST',
        body:JSON.stringify(payload),
    })
    const patch = (id,payload) => request(`${baseUrl}/${id}`,{
        method:'PATCH',
        body:JSON.stringify(payload),
    })
    const put = (id,payload) => request(`${baseUrl}/${id}`,{
        method:'PUT',
        body:JSON.stringify(payload),
    })
    const remove = (id) => request(`${baseUrl}/${id}`,{
        method:'DELETE'
    })
    return {get,post,patch,put,remove}
}

export default useApiFetchHook