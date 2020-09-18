import marked from "marked";

/**
 * This is its own function because marked is ... not great.
 * It generates somewhat BS markup, but even so it's probably
 * the best markdown converter currently easily available.
 */
export default function convert(data) {
  return (
    marked(data, {
      gfm: true,
      headerIds: false,
      mangle: false,
    })
      // sigh...
      .replace(/&amp;/g, "&")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      // templating introduces some funk
      .replace(/<p>{{/g, `{{`)
      .replace(/}}<\/p>/g, `}}`)
      // also <sup> and <sub> in code does fun things
      .replace(/&lt;sub&gt;/g, `<sub>`)
      .replace(/&lt;\/sub&gt;/g, `</sub>`)
      .replace(/&lt;sup&gt;/g, `<sup>`)
      .replace(/&lt;\/sup&gt;/g, `</sup>`)
  );
}
