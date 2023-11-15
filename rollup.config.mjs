// This file is managed by dropfort/dropfort_module_build.
// Delete this file and run `composer scaffold` to regenerate it.

/* eslint-disable import/no-extraneous-dependencies */

import fs from "fs";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import cleanup from "rollup-plugin-cleanup";

// Get the current working directory.
const workingDir = process.cwd();

// Sets of source and destination paths to automatically compile.
const pathSets = [
  {
    src: `${workingDir}/js`,
    dest: `${workingDir}/dist/js`,
  },
];

// An array of file object to process through rollup.
// The format of each file object is:
// {
//   src: "path/to/source/directory",
//   dest: "path/to/destination/directory",
//   file: "filename",
// }
const files = [];

// Default terser options.
const defaultTerserOptions = {
  mangle: {
    // We specifically do not want Drupal to be mangled because Drupal's translation
    // system _relies_ on "Drupal.t()" being named "Drupal.t()".
    reserved: ["Drupal"],
  },
};

// Output formats.
const formats = ["iife"];

// Process each path set to get the files in the source directory.
pathSets.forEach(pathSet => {
  // Get all the javascript files in the src directory.
  pathSet.files = fs.readdirSync(pathSet.src).filter(file => {
    return file.endsWith(".js");
  });
});

// Loop through each path set and create a file object for each file.
pathSets.forEach(pathSet => {
  pathSet.files.forEach(file => {
    files.push({
      src: pathSet.src,
      dest: pathSet.dest,
      file,
    });
  });
});

export default args => {
  const sourcemap = args.sourcemap || false;

  return [
    // Loop through each file in files and create a config set for it.
    ...files.map(({ src, dest, file }) => {
      // If a file in paths.files has a .js extension, remove it.
      const fileName = file.replace(".js", "");

      return {
        input: `${src}/${file}`,
        plugins: [
          babel({ babelHelpers: "inline" }),
          cleanup(),
          terser(defaultTerserOptions),
        ],
        // Create an array of output formats for each file based on the formats.
        // Each output file's name will match the format.
        output: formats.map(format => {
          return {
            file: `${dest}/${fileName}.${format}.js`,
            format,
            sourcemap,
          };
        }),
      };
    }),
    // Add custom config sets here.
  ];
};
