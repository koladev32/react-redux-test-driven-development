import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const userId = 1;

const getUserResponse = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz"
};

const getUserUpdateResponse = {
  id: 1,
  name: "John Graham",
  username: "Bret",
  email: "Sincere@april.biz"
};

const getCreateUserResponse = {
  id: 3,
  name: "Clementine Bauch",
  username: "Samantha",
  email: "Nathan@yesenia.net"
};

const getUserListResponse = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz"
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "ervin@april.biz"
  },
];

const mockNetWorkResponse = () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`/user/?id=${userId}`).reply(200, [getUserResponse]);
  mock.onGet(`/user/`).reply(200, getUserListResponse);
  mock.onPost(`/user/`).reply(200, getCreateUserResponse);
  mock.onPut(`/user/${userId}`).reply(200, getUserUpdateResponse);
  mock.onDelete(`/user/${userId}`).reply(200);
};

export {
  mockNetWorkResponse,
  getUserResponse,
  getUserUpdateResponse,
  getCreateUserResponse,
  getUserListResponse,
  userId,
};