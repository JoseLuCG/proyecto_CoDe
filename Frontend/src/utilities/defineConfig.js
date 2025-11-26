import "dotenv/config"

const ARCH_HOST_IP = "http://192.168.1.132:3000";
const WINDOWS_HOST_IP = "http://192.168.1.130:3000";

let IpAddresshostOS;

if (process.env.HOST_OS == "arch") {
    IpAddresshostOS = ARCH_HOST_IP;
} else {
    IpAddresshostOS = WINDOWS_HOST_IP;
}

const apiRoutes = {
    addUser : "/addUser",

}

export {
    IpAddresshostOS,
    apiRoutes
}