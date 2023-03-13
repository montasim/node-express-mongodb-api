let users = [
  {
    id: 'd9838a50-64f2-4666-9619-5673d48e296e',
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
  },
  {
    id: '7eb7a167-9734-4651-9794-83c2b85164ed',
    firstName: 'Jane',
    lastName: 'Doe',
    age: 24,
  },
];

export default function pagination(req, res, next) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < users.length) {
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

  results.results = users.slice(startIndex, endIndex);

  res.paginatedResults = results;
  next();
}
