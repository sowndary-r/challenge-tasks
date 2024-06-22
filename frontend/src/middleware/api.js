import axios from 'axios'
export const getAllChallengers = async () => {
    return await axios.get('http://localhost:4000/api/v1/users');
};

export const uploadChallenges = async (payload) => {
   return  axios.post('http://localhost:4000/api/v1/challenges', payload);
};

export const addChallengers = async(names) =>{
    return await axios.post('http://localhost:4000/api/v1/users', {
          challengers: names.map((n) => n.name),
        });
}

export const getAllChallenges = async(date) =>{
    return await axios.get(`http://localhost:4000/api/v1/challenges/?date=${date}`);
}
