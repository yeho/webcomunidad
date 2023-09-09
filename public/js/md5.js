export async function md5 ({ message }) {
  const dataArr = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(message))))
  return dataArr.map((x) => x.toString(16).padStart(2, '0')).join('')
}
