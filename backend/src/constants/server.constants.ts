enum RES_MSG {
    dbErr = "Oops! Something went wrong while communicating with database. Plz try later 🗄️.",
    unknownErr = "Oops! Something went wrong plz try later.",
    controllerErr = "Oops! Something went wrong while listening to your request on server. Plz try later 🎮.",
    validationErr = "Invalid payload.",
    bodyParsingErr = "Body parsing error, invalid json body.",
    unauthorizedErr = "Unauthorized, please sign in to continue.",
    fieldExist = "Field already exist.",
    bodyNotFound = "req.body not found for exception handling.",
    notFoundOrInactive = "Not found or inactive."
}

export enum RES_TYPE {
    success = "success",
    created = "created",
    noContent = "no content",

    badRequest = "bad request",
    unauthorized = "unauthorized",
    forbidden = "forbidden",
    notFound = "not found",
    methodNotAllowed = "method not alowed",
    requestTimeout = "request timeout",
    conflict = "conflict",

    internalServerError = "internal server error",
    badGateway = "bad gateway",
    serviceUnavailable = "service uavailable",
}
enum RES_STATUS {
    // success                  -> 200 succesffully executed.
    // created                  -> 201 resource created (e.g. insert, add).
    // bad-request              -> 400 a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
    // unauthorized             -> 401 need to authenticate.
    // forbidden                -> 403 not allowed.
    // not-found                -> 404 wrong url -> the endpoint is valid but the resource itself does not exist.
    // method-not-allowed       -> 405 using get required post.
    // request-timeout          -> 408 timeout limmit reached maybe sloe internet.
    // conflict         -> 409 The request could not be completed because it conflicts with the current state of the resource.
    // internal-server-error    -> 500 server error (something wrong withe code).
    // bad-gateway              -> 502 an another api server was using stop responding or giving error.
    // service-unavailable      -> 503 can not process the request right now due to any reason.

    success = 200,
    created = 201,
    noContent = 204,

    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    methodNotAllowed = 405,
    requestTimeout = 408,
    conflict = 409,

    internalServerError = 500,
    badGateway = 502,
    serviceUnavailable = 503,
}
export enum MYSQL_ERR_CODES {
    DUP_ENTRY = 'ER_DUP_ENTRY',       // 1062
    BAD_NULL_ERROR = 'ER_BAD_NULL_ERROR', // 1048
    FOREIGN_KEY_FAILS = 'ER_NO_REFERENCED_ROW_2', // 1452
}

export { RES_MSG, RES_STATUS }