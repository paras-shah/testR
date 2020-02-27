export const COPY_SITE = {
    NAME: "Cloud Fabrik",
    COPYRIGHT: "© Rubrik Inc.",
    EVENTS: "Events"

};

export const COPY_SIDEBAR = {
    LOGIN: { COPY: "Login", HINT: `Login to ${COPY_SITE.NAME}` },
    LABS: { COPY: "Labs", HINT: "Available Labs for this virtual data units" },
    MY_LABS: { COPY: "My Labs", HINT: "Labs created by you" },
    MY_LAB_DETAILS: { COPY: "My Lab Details", HINT: "Lab details" }
};

export const COPY_LOGIN = {
    NAME: "Login",
    USERNAME: "Username",
    PASSWORD: "Password",
    EVENT_CODE: "Event Code",
    EMAIL: "Email",
    SEND_MAGIC_LINK: "Send magic link",
    WELCOME_TO: "Welcome to",
    SIGN_UP: "Sign Up"
};

export const COPY_HEADER = {
    SEARCH: "Search for any lab",
    WELCOME: "Welcome",
    SIGN_OUT: "Sign Out",
    GET_HELP: "Get Help"
};

export const COPY_ERROR_MESSAGE = {
    LOGIN: "Something is wrong with your username or password."
};

export const COPY_FORM = {
    SELECT_VERSION: "Select any version",
    SELECT_VDU: "Select Virtual Data Unit "
};

const COPY_LAB_TEMPLATE = {
    LAB_PLAY_TITLE: "Click to spin an instance",
    CREATE_LAB_MODEL_TITLE: "Create a lab",
    CREATE_LAB: "Start Deploying",
    LAB_DETAIL: "View Details",
    NO_LABS: "No labs found or change your search criteria.",
    NO_VDUS: "No virtual data units found. Please refresh.",
    DETAILED_DESCRIPTION: "Details",
    CONFIG_OPTIONS: "Configuration Options"
};

const COPY_MY_LAB_TEMPLATE = {
    LAB_LAUNCH_TITLE: "Lab console",
    NO_LABS:
        "You have not created any labs for this virtual data unit or change your search criteria.",
    NO_LAB: "No lab found.",
    NO_VDUS: "No virtual data units found. Please refresh",
    CONFIRM_DESTROY: "Are you sure that you want to destroy this lab?",
    CONFIRM_DESTROY_HELPTEXT: "You can’t undo this action.",
    LAB: "Lab",
    STATUS: "Status",
    LAUNCH: "Launch",
    ALL_ENDPOINTS: "All Endpoints",
    SERVICE: "Service",
    LOGIN: "Login (Click to copy)",
    DETAIL: "Detail"
};

const COPY_COMMON = {
    NO_RESULT: "No result found.",
    NO_RESULT_DETAIL:
        "Please check the text entered or try with different keywords.",
    SHOW_MORE: "Show lab details",
    SHOW_LESS: "show less lab details",
    SHOW_DETAILS: "Show Details",
    CREATE_LAB: "Create a lab",
    name: "Name",
    LOADING: "Loading...",
    DASHBOARD: "Dashboard",
    BACK_TO: "Back To labs"
};

const COPY_BADGE = {
    leastCreationTime: "Least Creation Time",
    mostDeployed: "Most Deployed",
    highestRunTime: "Highest Run Time"
};

const COPY_SPECS = {
    cpu: "CPU",
    name: "Name",
    memory: "Memory",
    disk: "Disk",
    vm: "VMs",
    created: "Created",
    start_date: "Start Date",
    end_date: "End Date",
    time_remaining: "Time Remaining",
};

export { COPY_COMMON, COPY_LAB_TEMPLATE, COPY_MY_LAB_TEMPLATE, COPY_BADGE, COPY_SPECS};
