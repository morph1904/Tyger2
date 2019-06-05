import _isArray from 'lodash/isArray'
import {NAMESPACE, MUTATIONS, ACTIONS, JWT_KEY, STATE} from '~/store/auth';

//based on symfony role_hierarchy
const ROLE_HIERARCHY = {
    ROLE_WORKER: 'ROLE_USER',
    ROLE_SUPERVISOR: 'ROLE_WORKER',
    ROLE_ADMIN: ['ROLE_WORKER'],
    ROLE_SUPER_ADMIN: ['ROLE_ADMIN', 'ROLE_ALLOWED_TO_SWITCH']
}

function hasRoleRoleRecursive(roleToFind, inRole) {
    for (const staticRole in ROLE_HIERARCHY) {
        if (inRole === staticRole) {
            if (_isArray(ROLE_HIERARCHY[staticRole])) {
                for (const inheritedRole of ROLE_HIERARCHY[staticRole]) {
                    if (inheritedRole === roleToFind || hasRoleRoleRecursive(roleToFind, inheritedRole)) {
                        return true;
                    }
                }
            } else {
                if (ROLE_HIERARCHY[staticRole] === roleToFind || hasRoleRoleRecursive(roleToFind, ROLE_HIERARCHY[staticRole])) {
                    return true;
                }
            }
        }
    }
    return false;
}

class Auth {
    constructor($store, router) {
        this.$store = $store;
        this.router = router;
        this.watch()
    }

    watch() {
        this.$store.watch(state => state[NAMESPACE][STATE.TOKEN], () => {
            if (this.isRouteAnonymous(this.router.currentRoute)) {
                return;
            }
            if (!this.isLoggedIn && !this.isAllowedToAccessRoute(this.router.currentRoute)) {
                //logout action on non private route
                this.router.push('/')
                return
            }
            //refresh routes with user access
            this.router.go()
        })
    }

    isRouteAnonymous(route) {
        let permissions = this.getRoutePermissions(route)
        return permissions.length === 0
    }

    getRoutePermissions(route) {
        return [].concat(...route.matched.filter(function (r) {
            return r.components.default.options.hasOwnProperty('AUTH_ROLE')
        }).map((r) => {
            return r.components.default.options.AUTH_ROLE
        }))
    }

    isAllowedToAccessRoute(route) {
        const neededRoles = this.getRoutePermissions(route)
        if (neededRoles.length === 0) {
            return true;
        }
        for (const role of neededRoles) {
            if (this.hasRole(role)) {
                return true;
            }
        }
        return false;
    }

    get isLoggedIn() {
        return this.$store.state[NAMESPACE][STATE.TOKEN] !== null
    }

    get user() {
        return this.$store.state[NAMESPACE][STATE.USER]
    }

    login(username, password) {
        this.$store.dispatch(`${NAMESPACE}/${ACTIONS.LOGIN}`, {username, password})
    }

    logout() {
        this.$store.dispatch(`${NAMESPACE}/${ACTIONS.LOGOUT}`)
    }

    hasRole(role) {
        if (!this.isLoggedIn) {
            return false;
        }
        for (const userRole of this.user.roles) {
            if (userRole === role) {
                return true;
            }
        }

        for (const userRole of this.user.roles) {
            if (hasRoleRoleRecursive(role, userRole)) {
                return true;
            }
        }
        return false;
    }
}

export default ({app, store, req, router}, inject) => {
    if (!process.browser) {
        //read jwt token on server side from session
        if (req.session !== undefined && req.session[JWT_KEY] !== undefined) {
            store.commit(`${NAMESPACE}/${MUTATIONS.SET_USER}`, req.session[JWT_KEY])
        }
    }
    const $auth = new Auth(store, app.router)
    inject('auth', $auth)
}
