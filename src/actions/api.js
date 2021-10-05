import axios from "axios";

const baseURL = "http://localhost:3000/";

// export default {
//     ownedProperty(url = baseURL + "property/") {
//         return {
//             fetchAll: () => axios.get(url),
//             update: (id, updatedProperty) =>
//                 axios.put(url + id, updatedProperty),
//         };
//     },
//     wallet(url = baseURL + "wallet/") {
//         return {
//             fetch: () => axios.get(url),
//         };
//     },
// };
export default {
    ownedProperty: ((url = baseURL + "property/") => {
        return {
            fetchAll: () => console.log(url),
            update: (id, updatedProperty) =>
                console.log(url + id, updatedProperty),
        };
    })(),
    wallet: ((url = baseURL + "wallet/") => {
        return {
            fetch: () => console.log(url),
        };
    })(),
};
