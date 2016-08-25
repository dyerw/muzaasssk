
export default {
  fetchStream: () => {
    return fetch("http://private-1f595-tapewurms.apiary-mock.com/reviews?limit=20&filter=top");
  }
}
