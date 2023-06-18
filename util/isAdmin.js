export default (req, res, next) => {
    
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        return res.status(401).json({message: 'Not authorized as admin'})
    }
}