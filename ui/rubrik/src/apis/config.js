import { COPY_SIDEBAR } from "../copy/common";

// Pages
export const WEBPAGE_URL = {
    HOMEPAGE: "/app/dashboard",
    LOGIN: "/login",
    LABS: "/app/labtemplates",
    MY_LABS: "/app/mylabs",
    MY_LAB_DETAILS: "/app/mylabconsole",
};

export const WEBPAGE_LABEL = {
    LOGIN: COPY_SIDEBAR.LOGIN.COPY,
    LABS: COPY_SIDEBAR.LABS.COPY,
    MY_LABS: COPY_SIDEBAR.MY_LABS.COPY,
    MY_LAB_DETAILS: COPY_SIDEBAR.MY_LAB_DETAILS.COPY
};

export const WEBPAGE_HINT = {
    LABS: COPY_SIDEBAR.LABS.HINT,
    MY_LABS: COPY_SIDEBAR.MY_LABS.HINT
};

export const PAGE_LANDING_URL = WEBPAGE_URL.LABS;

export const LAB_REFRESH_INTERVAL = 1000 * 10;
export const CONSOLE_REFRESH_INTERVAL = 1000 * 10;
export const JWT_API_CALL_INTERVAL = 1000 * 10;

// APIs
 export const VISION_CORE_URL = `https://vision.rcf.rubrik.com/api`;

export const JWT_AUTH_HEADER_PREFIX = "BEARER";

export const API_URL = {
    USER: `/django.contrib.auth/user/`,
    LAB_TEMPLATE: `/rubrik.vision.core/labtemplate/`,
    LAB_INSTANCE: `/rubrik.vision.core/lab_template_instance/`,
    LAB_TEMPLATE_BY_VDU: `/rubrik.vision.core/lab_template_by_vdu/`,
    LAB_VDU: `/rubrik.vision.core/virtualdatacenterunit/`,
    EVENT_REGISTRATION_API: "/rubrik.vision.core/eventregistration/",
    PERFORM_LAB_ACTIONS:"/rubrik.vision.core/perform_lab_actions/",

    LAB_INSTANCE_DETAIL: `/rubrik.vision.core/labinstancedetail/`,
    DELETE_LAB_INSTANCE: `/rubrik.vision.core/destroy_lab_template_instance`,

    LOGIN_API: "/token-auth/",
    MAGIC_LINK_API: "/generate-magic-link/",
    TOKEN_REFRESH: "/token-refresh/",
    GET_HELP: "/get_help/",
    TOKEN_AUTHENTICATION_API: "/core/current-user/",

    SEARCH_PARAM: "search"
};

export const LAB_STATUS = {
    INITIAL: "Initial",
    QUEUED: "Queued",
    PROCESSING: "Processing",
    READY: "Ready",
    PENDING_RELEASE: "Pending Release",
    DESTROY: "Destroy",
    PROCESSINGFAILED: "Processing Failed" 
};

export const FONT_AWESOME = {
    LAB: "fa fa-cubes",
    MY_LAB: "fa fa-network-wired"
};

// Cookies, local-storage
export const LOCAL_STORAGE = {
    SESSION: "session",
    SELECTED_VDU: "vdu_id",
    REDIRECT_URL: "redirect_URL",
    USERNAME: "username"
};

// Cookies, local-storage
export const ACTION_TYPE = {
    LAB: "Lab",
    RESOURCE: "Reource",
};

// Cookies, local-storage
export const RESPONSE = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401
};

// REGEX 
export const REGEX = {
    EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
}
