/**
 * Verify if the route is in the correct format
 * @param {string} route - The route to verify
 * @returns {number} - 0: Invalid format, 1: OpenAPI format, 2: Valid but not OpenAPI specific
 */
export function verifyRouteFormat(route) {
  if (!route || typeof route !== 'string') return 0

  // Ensure leading slash is allowed
  if (!route.startsWith('/')) {
    route = '/' + route
  }

  // Try parsing with URL object for quick validation
  try {
    new URL(`http://dummy${route}`)
  } catch (error) {
    return 0 // Invalid route
  }

  // Disallow double slashes (except after 'http://dummy')
  if (/\/\/+/g.test(route.replace(/^\/\//, '/'))) {
    return 0
  }

  // OpenAPI Path Parameter Syntax Check
  const openApiParamRegex = /\{[a-zA-Z0-9_]+(=[a-zA-Z]+)?\}/g
  const hasOpenApiParams = openApiParamRegex.test(route)

  // Allow query parameters with types (?param=string, ?age=number, etc.)
  const queryParamRegex =
    /\?[a-zA-Z0-9_]+=(string|number|boolean|bigint)(?:&[a-zA-Z0-9_]+=(string|number|boolean|bigint))*$/
  const hasQueryParams = queryParamRegex.test(route)

  // Recognize standard OpenAPI paths without params (e.g., "/users")
  const standardPathRegex = /^\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*$/
  const isStandardPath = standardPathRegex.test(route)

  if (hasOpenApiParams || hasQueryParams || isStandardPath) return 1 // OpenAPI-valid

  return 2 // Valid but not OpenAPI-specific
}
