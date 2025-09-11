function stripURL(urlStr) {
  const url = new URL(urlStr);

  return `${url.protocol}//${url.host}${url.pathname}`;
}

export {stripURL};