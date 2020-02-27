import queryString from "query-string";

// Custom components
import CustomExpansionPanel from "./components/CustomExpansionPanel";
import HtmlTooltip from "./components/HtmlTooltip";
import LabBadge from "./components/LabBadge";

/*
    Type: Function
    Functionality :
    Params: locationLabs, classes
    Return: Layout 
    */
export const getDateFormat = dateString => {
    if (!getDateFormat || !Date.parse(dateString)) return "-";
    else return Date.parse(dateString).toString("MM-d-yyyy");
};

/* 
  Type: Function 
  Functionality : 
  Params: locationLabs, classes
  Return: Layout 
*/
export const getUrlParameters = (location, param) => {
    try {
        const values = queryString.parse(location.search);
        return Object.keys(values).indexOf(param) !== -1 ? values[param] : null;
    } catch (error) {
        console.log("No such parameter in Url ", param, error);
    }
};

/*
    Type: Member function
    Params: lab, 
    Return: Lab Instance Name from lab params 
    */
export const getLabInstanceName = lab => {
    let { params } = lab;
    if (typeof params === "string") params = JSON.parse(params);
    return params.instance_name ? params.instance_name : "< Name >";
};

/*
    Type: Member function
    Params: string, limit 
    Return: String with only characters mentioned in limit params
    */
export const displayLimitedCharacters = (inputString, limit = 30) => {
    return inputString && inputString.length > limit ? `${inputString.substr(0, limit)}...` : inputString;
};

/*
    Type: Member function
    Params: None 
    Return: Returns os system of users
    */
export const getUrl = (PROTOCOL, IP, PORT) => {
    let protocol = PROTOCOL.toLowerCase(), urlDisplayed = '', urlCopied = '';

    if (protocol === "http" || protocol === "https") {
        urlDisplayed = parseInt(PORT) === 443
            ? `${IP}`
            : `${IP}:${PORT}`;
        urlCopied = parseInt(PORT) === 443
            ? `https://${IP}`
            : `${protocol}://${IP}:${PORT}`;
    }
    else {
        urlDisplayed = `${IP}:${PORT}`;
        urlCopied = `${IP}:${PORT}`;
    }
    return { urlDisplayed, urlCopied };
};

/*
    Type: Member function
    Params: None 
    Return: Returns os system of users
    */
export const getUsersOperatingSystem = () => {
    var osName = "Unknown";
    if (navigator.appVersion.indexOf("Win") !== -1)
        osName = "Windows OS";
    if (navigator.appVersion.indexOf("Mac") !== -1)
        osName = "Mac OS";
    if (navigator.appVersion.indexOf("X11") !== -1)
        osName = "UNIX OS";
    if (navigator.appVersion.indexOf("Linux") !== -1)
        osName = "Linux OS";
    return osName;
};

/*
    Type: Member function
    Params: None 
    Return: Returns os system of users
    */
export const getBrowser = () => {
    // var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera 15+, the true version is after "OPR/" 
    if ((verOffset = nAgt.indexOf("OPR/")) !== -1) {
        browserName = "opera";
        fullVersion = nAgt.substring(verOffset + 4);
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset = nAgt.indexOf("Opera")) !== -1) {
        browserName = "opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) !== -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) !== -1) {
        browserName = "internet-explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) !== -1) {
        browserName = "chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) !== -1) {
        browserName = "safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) !== -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) !== -1) {
        browserName = "firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
        (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() === browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) !== -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) !== -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    return browserName;
};


/*
    Type: Member function
    Params: None 
    Return: Returns os system of users
    */
export const getProtocolCommands = (PROTOCOL, IP, PORT, USER, system) => {
    const os = getUsersOperatingSystem(), commands = [], protocol = PROTOCOL.toLowerCase();
    if ((os === "Windows OS" && system === 'current') || (os !== "Windows OS" && system === 'other')) {
        if (protocol === "ssh") {
            commands.push(['ssh', `ssh -p ${PORT} ${USER}@${IP}`]);
            commands.push(['putty', `putty -ssh ${USER}@${IP} ${PORT}`]);
        }
        else if (protocol === "rdp") {
            commands.push(['rdp', `mstsc -v ${IP}:${PORT}`]);
        }
        else if (protocol === "vnc") {
            commands.push(['vnc', `${IP}:${PORT}`]);
        } else {
            commands.push([protocol, `${IP}:${PORT}`]);
        }
    } else {
        if (protocol === "ssh") {
            commands.push(['ssh', `ssh -p ${PORT} ${USER}@${IP}`]);
        }
        else if (protocol === "rdp") {
            commands.push(['rdp', `open rdp://“full address=s:${IP}:${PORT}&username=s:${USER}”`]);
        }
        else if (protocol === "vnc") {
            commands.push(['vnc', `open vnc://${IP}:${PORT}`]);
        } else {
            commands.push([protocol, `${IP}:${PORT}`]);
        }
    }
    return commands;
};

/*
    Type: Member function
    Params: None 
    Return: Returns os system of users
    */
export const getProtocolIcons = (PROTOCOL, IP, PORT, USER, os) => {
    const commands = {}, protocol = PROTOCOL.toLowerCase();

    if (os === "Windows OS") {
        if (protocol === "ssh") {
            commands.copyText = `putty -ssh ${USER}@${IP} ${PORT}`;
        }
        else if (protocol === "rdp") {
            commands.copyText = `mstsc -v ${IP}:${PORT}`;
        }
        else if (protocol === "vnc") {
            commands.copyText = `${IP}:${PORT}`;
        } else {
            commands.copyText =  `${IP}:${PORT}`;
        }
    } else {
        if (protocol === "ssh") {
            commands.copyText = `ssh -p ${PORT} ${USER}@${IP}`;
        }
        else if (protocol === "rdp") {
            commands.copyText = `open rdp://"full address=s:${IP}:${PORT}&username=s:${USER}"`;
        }
        else if (protocol === "vnc") {
            commands.copyText = `open vnc://${IP}:${PORT}`;
        } else {
            commands.copyText =  `${IP}:${PORT}`;
        }
    }
    return commands;
};


// Components
export { HtmlTooltip, CustomExpansionPanel, LabBadge };
