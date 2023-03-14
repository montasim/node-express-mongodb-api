export default async function pagination(req, res, next) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const projects = await req.db.collection('projects').find().toArray();
  const results = {};

  if (endIndex < projects.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.results = projects.slice(startIndex, endIndex);

  res.paginatedResults = results;
  next();
}
