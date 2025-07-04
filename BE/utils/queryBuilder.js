function buildConnectQuery(queryParams, userId = null, onlyPrivate = false) {
  const query = {};

  if (userId) query.user = userId;
  if (onlyPrivate) query.isPrivate = true;
  if (queryParams.isPrivate === "false") query.isPrivate = false;

  if (queryParams.city)
    query.city = { $regex: queryParams.city, $options: "i" };
  if (queryParams.company)
    query.company = { $regex: queryParams.company, $options: "i" };
  if (queryParams.name)
    query.name = { $regex: queryParams.name, $options: "i" };
  if (queryParams.jobProfile)
    query.jobProfile = { $regex: queryParams.jobProfile, $options: "i" };

  return query;
}



module.exports = buildConnectQuery;
