// const isPro = Object.is(process.env.NODE_ENV, 'development')
const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    // baseUrl: isPro ? 'http://218.98.100.2:8602/bms-sys' : 'api/'
    // baseUrl: isPro ? 'http://218.98.100.2:8602/bms-sys' : 'http://localhost:80/bms-sys'
    baseUrl:window.location.origin + '/bms-sys'
}
