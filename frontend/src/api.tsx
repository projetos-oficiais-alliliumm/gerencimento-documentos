export default function Api (){
    const api = (url: string) => `http://localhost:5000${url}`

    return {api}
}