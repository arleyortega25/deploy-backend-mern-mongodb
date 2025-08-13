export const ValidarDatos = (Schema) => async (req, res, next) => {
  try {
    await Schema.parse(req.body);
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.errors.map((e) => e.message) });
  }
};
