import API from "./api";

export const fetchAllPublicConnects = async () => {
  const res = await API.get("/connects/public");
  return res.data;
};

export const fetchMyConnects = async (token) => {
  const res = await API.get("/connects/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const addConnectsFn = async (token, connectData) => {
  const res = await API.post("/connects", connectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
