module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({"public": "/"});

  // Watch for changes
  eleventyConfig.addWatchTarget("src/_data/");

  // Filter: sort projects, destacados first
  eleventyConfig.addFilter("destacados", function(proyectos) {
    if (!proyectos) return [];
    return proyectos.filter(p => p.destacado);
  });

  eleventyConfig.addFilter("todos", function(proyectos) {
    if (!proyectos) return [];
    return proyectos;
  });

  // Dump filter for debugging
  eleventyConfig.addFilter("dump", function(obj) {
    return JSON.stringify(obj, null, 2);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
