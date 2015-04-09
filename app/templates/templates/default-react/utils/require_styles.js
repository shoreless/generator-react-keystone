// This is necessary to prevent the server from trying to include stylesheets
// that is imported by the react components
const INCLUDE_STYLES = process.env.INCLUDE_STYLES === 'true';

module.export = INCLUDE_STYLES;