class GenericError extends Error {
  constructor(public data: { error: Error }, public statusCode: number) {
    super(data.error.message);
  }
}

export default GenericError;
