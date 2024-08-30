const getData = async (resource, query) => {
    try {
        const response = await fetch(`/api/${resource}${query}`, {
            method: 'GET',
            cache: 'no-store'
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export default getData