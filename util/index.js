export const respHelper = (rc, data) => {
  const resp = {
    responseCode: rc,
    message: 'Success',
    data: data
  }

  return resp
}