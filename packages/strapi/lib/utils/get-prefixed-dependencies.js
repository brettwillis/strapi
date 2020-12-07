module.exports = (prefix, pkgJSON) => {
  // If in development mode then also look inside "devDependencies"
  // otherwise only look inside production "dependencies"
  const dependencies = Object.assign(
    {},
    (process.env.NODE_ENV === 'development') 
      ? pkgJSON.devDependencies 
      : undefined,
    pkgJSON.dependencies,
  );

  return Object.keys(dependencies)
    .filter(d => d.startsWith(prefix) && d.length > prefix.length)
    .map(pkgName => pkgName.substring(prefix.length + 1));
};
