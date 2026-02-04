(function(){
    const BASE = 'http://localhost:3000';

    // ----- Fetch API implementation (async/await) -----
    const fetchApi = {
        async ping(){
            try{
                const res = await fetch(BASE + '/jogos');
                return res.ok;
            }catch(e){
                return false;
            }
        },
        async getJogos(){
            const res = await fetch(BASE + '/jogos');
            if (!res.ok) throw new Error('GET /jogos failed: ' + res.status);
            return await res.json();
        },
        async getJogo(id){
            const res = await fetch(BASE + '/jogos/' + encodeURIComponent(id));
            if (!res.ok) throw new Error('GET /jogos/' + id + ' failed: ' + res.status);
            return await res.json();
        },
        async createJogo(jogo){
            const res = await fetch(BASE + '/jogos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jogo)
            });
            if (!res.ok) throw new Error('POST /jogos failed: ' + res.status);
            return await res.json();
        },
        async updateJogo(id, jogo){
            const res = await fetch(BASE + '/jogos/' + encodeURIComponent(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jogo)
            });
            if (!res.ok) throw new Error('PUT /jogos/' + id + ' failed: ' + res.status);
            return await res.json();
        },
        async deleteJogo(id){
            const res = await fetch(BASE + '/jogos/' + encodeURIComponent(id), {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('DELETE /jogos/' + id + ' failed: ' + res.status);
            return true;
        }
    };

    // ----- axios implementation (if axios is loaded in the page) -----
    const axiosApi = (typeof axios !== 'undefined') ? {
        async getJogos(){
            return axios.get(BASE + '/jogos').then(r => r.data);
        },
        async getJogo(id){
            return axios.get(BASE + '/jogos/' + id).then(r => r.data);
        },
        async createJogo(jogo){
            return axios.post(BASE + '/jogos', jogo).then(r => r.data);
        },
        async updateJogo(id, jogo){
            return axios.put(BASE + '/jogos/' + id, jogo).then(r => r.data);
        },
        async deleteJogo(id){
            return axios.delete(BASE + '/jogos/' + id).then(() => true);
        }
    } : null;

    // Expose to window for easy use in pages
    window.apiFetch = fetchApi;
    window.apiAxios = axiosApi;

    // For module environments, also export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { fetchApi, axiosApi };
    }
})();
