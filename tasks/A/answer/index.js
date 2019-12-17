module.exports = function promisify(api) {  
  const mem = new Map();

  const promisedCallback = function(...args) {
    return new Promise((resolve, reject) => {
      const callback = (error, data) => error ? reject(error) : resolve(data);
      this(callback, ...args);
    });
  }

  const handler = {
    get(target, prop) {
      const child = target[prop];
      let result;

      if (mem.has(child)) {
        return mem.get(child);
      }
  
      if (typeof child === 'function') {
        result = promisedCallback.bind(child);
      } else if (typeof child === 'object' && child !== null) {
        result = new Proxy(child, handler);
      } else {
        return child;
      }

      mem.set(child, result);
      return result;
    }
  }

  return new Proxy(api, handler);
};