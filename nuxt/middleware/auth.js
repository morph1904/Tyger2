function throwError(i18n, error) {
    error({
        'statusCode': 401,
        'message': i18n.t('error.401'),
    })
}
export default function ({route, app, error}) {
    if (app.$auth.isAllowedToAccessRoute(route)) {
        return;
    }
    throwError(app.i18n, error)
}
