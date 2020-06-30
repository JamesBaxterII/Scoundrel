requirejs.config({
    basePath: "/js"
  });
  
  // Tell RequireJS to load your main module (and its dependencies)
  require(["app"]);