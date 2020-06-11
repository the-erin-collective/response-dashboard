import http from "../http-common";
                                                                                             
const apiRoute = `/api/panic_request`;

const findAll = () => {
  return http.get(apiRoute);
};

const findOne = (id) => {
    return http.get(apiRoute+ `${id}`);
  };

const findAllUnresponded = () => {
  return http.get(apiRoute + `/active`);
};

const create = (data) => {
  return http.post(apiRoute, data);
};

const update = (id, data) => {
  return http.put(apiRoute + `${id}`, data);
};

const remove = (id) => {
  return http.delete(apiRoute + `${id}`);
};

const findAllByName = (name) => {
  return http.get(apiRoute + `/requester?name=${name}`);
};

export default {
  findAll,
  findOne,
  findAllUnresponded,
  create,
  update,
  remove,
  findAllByName
};