

module.exports = function date(req, res, next) {
    
    if (req.url === '/') {
        let date = new Date();
        date = date.toUTCString();
        console.log(`${req.method} ${req.url} was accessed at ${date}`);
    }
    next();
}