export function request(params){
  const { url='', method='post', } = params;
  return fetch(url,{ method, }).then(res=> res.json())
}