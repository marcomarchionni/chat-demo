export const handleError = (error: unknown) => {
    let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      console.error(errorMessage);
}