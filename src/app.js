import './main.scss';
import './scripts';

/**
 *
 * Require all scss files
 */
function requireAll(r) {
  console.log(r);
  r.keys().forEach(r);
}
requireAll(require.context("./pages", true, /\.pug$/));
requireAll(require.context("./styles", true, /\.scss$/));
// requireAll(require.context("./scripts", true, /\.js$/));
requireAll(require.context("./assets", true, /\.*$/));
requireAll(require.context("./fonts", true, /\.*$/));
