import http from "../http-common";
                                                                                             
const apiRoute = `/`;

const findAll = () => {
  return http.get(apiRoute,);
};

const findOne = (id) => {
    return http.get(apiRoute+ `/request/${id}`);
  };

const findAllUnresponded = () => {
  return http.get(apiRoute + `/active`);
};

const create = (data) => {
  return http.post(apiRoute, data);
};

const update = (id, data) => {
  return http.put(apiRoute + `/request/${id}`, data);
};

const remove = (id) => {
  return http.delete(apiRoute + `/request/${id}`);
};

const searchbyname = (name) => {
  return http.get(apiRoute + `/searchbyname`);
//  if(name !== null && name !== "")
   // return http.get(`http://localhost:8080/api/searchbyname?name=${name}`);
 //   return http.get(apiRoute + `/searchbyname?name=${name}`);
 // return Promise.resolve([]);
};

export default {
  findAll,
  findOne,
  findAllUnresponded,
  create,
  update,
  remove,
  searchbyname
};